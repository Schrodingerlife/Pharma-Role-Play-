import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { Message, SessionMetrics, Feedback } from "../types";

// Note: In a real backend implementation, we would keep the API key secure.
// For this client-side demo, we rely on the environment variable injection.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Define the response schema for the roleplay
// We want the model to return the character's response, plus metrics analysis
const roleplaySchema = {
  type: Type.OBJECT,
  properties: {
    characterResponse: {
      type: Type.STRING,
      description: "The verbal response of the doctor character to the sales rep."
    },
    metrics: {
      type: Type.OBJECT,
      properties: {
        tone: { type: Type.NUMBER, description: "Rating of the rep's tone (0-100)" },
        clarity: { type: Type.NUMBER, description: "Rating of the rep's clarity (0-100)" },
        empathy: { type: Type.NUMBER, description: "Rating of the rep's empathy (0-100)" },
        technical: { type: Type.NUMBER, description: "Rating of the rep's technical accuracy (0-100)" }
      },
      required: ["tone", "clarity", "empathy", "technical"]
    },
    feedback: {
      type: Type.OBJECT,
      properties: {
        type: { type: Type.STRING, enum: ["positive", "warning", "constructive"] },
        message: { type: Type.STRING, description: "Brief actionable feedback for the rep." }
      },
      required: ["type", "message"]
    },
    sessionEnded: {
      type: Type.BOOLEAN,
      description: "True if the conversation has naturally concluded."
    }
  },
  required: ["characterResponse", "metrics", "feedback", "sessionEnded"]
};

export const generateRoleplayResponse = async (
  history: Message[],
  systemInstruction: string
): Promise<{ 
  text: string; 
  metrics: SessionMetrics; 
  feedback: Feedback; 
  sessionEnded: boolean 
}> => {
  try {
    const model = "gemini-3-flash-preview";

    // Convert history to format compatible with generateContent if needed, 
    // but for simple turn-based, we can concatenate or just send the last user message with context.
    // Ideally, we use chat.sendMessage, but to enforce JSON schema strictly on every turn for metrics,
    // a single generateContent call with full history context is often more robust for structured data extraction in demos.
    
    const conversationContext = history.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
    
    const prompt = `
      Current conversation history:
      ${conversationContext}

      System Instruction: ${systemInstruction}

      Analyze the LAST USER RESPONSE. Provide the Doctor's response, and evaluate the User (Sales Rep).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: roleplaySchema,
        systemInstruction: "You are a roleplay engine for Pharma Sales training. Output JSON."
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");

    const parsed = JSON.parse(jsonText);

    return {
      text: parsed.characterResponse,
      metrics: parsed.metrics,
      feedback: parsed.feedback,
      sessionEnded: parsed.sessionEnded || false
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "I'm sorry, I didn't quite catch that. Could you repeat?",
      metrics: { tone: 50, clarity: 50, empathy: 50, technical: 50 },
      feedback: { type: 'warning', message: 'Connection issue, please retry.' },
      sessionEnded: false
    };
  }
};
