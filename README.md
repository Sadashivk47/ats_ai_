# ATS-AI 🚀

**ATS-AI** is a cutting-edge, AI-powered resume analysis tool designed to help job seekers "beat the bot." By leveraging the power of Google's Gemini AI, it provides deep semantic analysis, ATS compatibility scoring, and personalized recommendations to optimize your resume for specific job descriptions.

![ATS-AI Landing Page](https://drive.google.com/uc?export=view&id=1KoWgfY3yB5W_ZKfSCT4nl9dGglNAxcHI)

## ✨ Features

- **AI Resume Analysis**: Deep semantic matching using Google Gemini 3 Flash.
- **ATS Scoring**: Get a realistic score of how well your resume matches a job description.
- **Keyword Optimization**: Identify missing critical keywords and skills.
- **Support the Project**: Integrated Razorpay donation system ("Buy me a Chai").
- **Contact System**: Built-in contact form with SQLite persistence.
- **Modern UI**: Crafted with React, Tailwind CSS, and smooth animations via Motion.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Motion.
- **Backend**: Node.js, Express.
- **AI**: Google Gemini API (`@google/genai`).
- **Database**: SQLite (`better-sqlite3`) for contact storage.
- **Payments**: Razorpay Integration.
- **Deployment**: Optimized for Render and Vercel.

## 🚀 Getting Started Locally

### Prerequisites

- Node.js (v20 or higher recommended)
- npm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sadashivk47/ATS-AI.git
   cd ATS-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   RAZORPAY_WEBHOOK_SECRET=your_optional_webhook_secret
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## 🌐 Deployment

### Deploying to Render
1. Connect your GitHub repo to Render.
2. Select **Web Service**.
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Add your Environment Variables in the Render dashboard.

### Deploying to Vercel
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Vercel will automatically detect the `vercel.json` configuration.
4. Add your Environment Variables in the Vercel dashboard.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Sadashiv**
- GitHub: [@Sadashivk47](https://github.com/Sadashivk47/)
- *Crafting Intelligent Tools with LLMs*

## 📄 License

This project is open-source. Please check the repository for license details.

---
*Designed and developed with AI by Sadashiv*
