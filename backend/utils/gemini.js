import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEvaluation = async ({ question, answer, maxMarks }) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an expert teacher evaluating student answers.

Question:
${question}

Student Answer:
${answer}

Max Marks: ${maxMarks}

Return response in STRICT JSON format:
{
  "marks": number,
  "feedback": string,
  "strengths": string,
  "weaknesses": string
}

Be strict but fair.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.log("Gemini Error:", error.message);
    throw new Error("AI Evaluation Failed");
  }
};

export const evaluateAnswerWithGemini = async (question, answer) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are an expert teacher.

Question: ${question}

Student Answer: ${answer}

Give:
1. Score out of 10
2. Short feedback
                `,
              },
            ],
          },
        ],
      }
    );

    const result =
      response.data.candidates[0].content.parts[0].text;

    return result;
  } catch (err) {
    console.log("Gemini Error:", err.response?.data || err.message);
    return "AI evaluation failed";
  }
};