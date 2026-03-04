import express from "express";
import { createServer as createViteServer } from "vite";
import Razorpay from "razorpay";
import Database from "better-sqlite3";
import crypto from "crypto";

// Initialize SQLite database
let db: any;
try {
  // On Vercel, we must use /tmp for any file writes, but it's ephemeral
  const dbPath = process.env.VERCEL ? "/tmp/ats_ai.db" : "ats_ai.db";
  db = new Database(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      subject TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
} catch (err) {
  console.error("Failed to initialize SQLite database.", err);
  db = { prepare: () => ({ run: () => {} }) };
}

let razorpayInstance: Razorpay | null = null;

function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!razorpayInstance && keyId && keySecret) {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpayInstance;
}

const app = express();
app.use(express.json());

async function setupServer() {
  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

// ... (rest of the routes)

  // Contact form submission
  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      const stmt = db.prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
      stmt.run(name, email, subject, message);
      res.json({ success: true });
    } catch (error) {
      console.error("Contact error:", error);
      res.status(500).json({ error: "Failed to save message" });
    }
  });

  app.post("/api/donate/order", async (req, res) => {
    try {
      const { amount } = req.body;
      const razorpay = getRazorpay();
      
      const options = {
        amount: Math.round(amount * 100), // amount in the smallest currency unit (paise for INR)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error: any) {
      console.error("Razorpay Order Error:", error);
      res.status(500).json({ error: error.message || "Failed to create Razorpay order" });
    }
  });

  app.post("/api/donate/verify", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const keySecret = process.env.RAZORPAY_KEY_SECRET || "6569xei4e1i6VKaCuAus3T0T";
      
      const hmac = crypto.createHmac("sha256", keySecret);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generatedSignature = hmac.digest("hex");

      if (generatedSignature === razorpay_signature) {
        res.json({ success: true });
      } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
      }
    } catch (error: any) {
      console.error("Verification Error:", error);
      res.status(500).json({ error: "Verification failed" });
    }
  });

  app.post("/api/donate/webhook", async (req, res) => {
    try {
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "your_webhook_secret";
      const signature = req.headers["x-razorpay-signature"] as string;
      
      const hmac = crypto.createHmac("sha256", secret);
      hmac.update(JSON.stringify(req.body));
      const generatedSignature = hmac.digest("hex");

      if (generatedSignature === signature) {
        const event = req.body.event;
        console.log("Razorpay Webhook Event:", event);
        // Handle events like payment.captured
        res.json({ status: "ok" });
      } else {
        res.status(400).send("Invalid signature");
      }
    } catch (error) {
      console.error("Webhook Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    const PORT = 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }
}

setupServer();

export default app;
