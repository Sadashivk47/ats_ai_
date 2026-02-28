import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export interface AnalysisResult {
  jobRolePrediction: {
    role: string;
    specialty: string;
    confidence: number;
  };
  atsMatchScore: number;
  semanticMatchScore: number;
  semanticAnalysis: string;
  matchedSkills: string[];
  missingKeywords: string[];
  recommendation: string;
}

export async function analyzeResume(resumeText: string, jobDescription: string): Promise<AnalysisResult> {
  const ai = getAI();
  if (!ai) {
    throw new Error("Gemini API key is missing. Please add it to your .env file.");
  }
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Analyze the following resume against the job description.
    
    Resume:
    ${resumeText}
    
    Job Description:
    ${jobDescription}
    
    Provide a detailed analysis in JSON format with the following structure:
    {
      "jobRolePrediction": {
        "role": "string",
        "specialty": "string",
        "confidence": number (0-100)
      },
      "atsMatchScore": number (0-100),
      "semanticMatchScore": number (0-100),
      "semanticAnalysis": "string (brief explanation)",
      "matchedSkills": ["string"],
      "missingKeywords": ["string"],
      "recommendation": "string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            jobRolePrediction: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING },
                specialty: { type: Type.STRING },
                confidence: { type: Type.NUMBER }
              },
              required: ["role", "specialty", "confidence"]
            },
            atsMatchScore: { type: Type.NUMBER },
            semanticMatchScore: { type: Type.NUMBER },
            semanticAnalysis: { type: Type.STRING },
            matchedSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            missingKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendation: { type: Type.STRING }
          },
          required: ["jobRolePrediction", "atsMatchScore", "semanticMatchScore", "semanticAnalysis", "matchedSkills", "missingKeywords", "recommendation"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No response from AI model");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw error;
  }
}
