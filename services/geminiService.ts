import { GoogleGenAI, Type } from "@google/genai";
import type { TicketAnalysis, NewTicketData } from "../types";
import { Priority, Sentiment } from "../types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        priority: {
            type: Type.STRING,
            enum: [Priority.Critical, Priority.High, Priority.Medium, Priority.Low],
            description: "The assessed priority level for this ticket."
        },
        sentiment: {
            type: Type.STRING,
            enum: [Sentiment.Positive, Sentiment.Negative, Sentiment.Neutral],
            description: "The customer's sentiment."
        },
        summary: {
            type: Type.STRING,
            description: "A concise, 1-2 sentence summary of the customer's issue."
        },
        suggestedTags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of relevant keywords or tags for categorization."
        },
        suggestedAssignee: {
            type: Type.STRING,
            description: "The recommended team or role to handle this ticket (e.g., 'Tier 1 Support', 'Billing Specialist', 'Senior Technical Team')."
        },
        businessImpact: {
            type: Type.STRING,
            description: "A brief assessment of the potential business impact (e.g., revenue loss, churn risk, sales opportunity)."
        }
    },
    required: ["priority", "sentiment", "summary", "suggestedTags", "suggestedAssignee", "businessImpact"]
};


export const analyzeTicket = async (ticketData: NewTicketData): Promise<TicketAnalysis> => {
    const prompt = `
        You are an expert AI support ticket analyzer. Your task is to assess a new customer support ticket and provide a structured analysis in JSON format.
        Analyze the ticket for urgency, customer sentiment, technical details, and business context.
        
        Ticket Details:
        - Customer Name: "${ticketData.customerName}"
        - Issue Category: "${ticketData.issueType}"
        - Issue Description: "${ticketData.issueDescription}"

        Based on the information, provide your analysis. For priority, use "CRITICAL" for issues like system outages or major security flaws affecting many users. Use "HIGH" for issues severely impacting a single customer's business or indicating churn risk. Use "MEDIUM" for standard issues or feature requests. Use "LOW" for simple 'how-to' questions.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [{ text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        const result: TicketAnalysis = {
            customerName: ticketData.customerName,
            originalQuery: ticketData.issueDescription,
            priority: parsedJson.priority || Priority.Medium,
            sentiment: parsedJson.sentiment || Sentiment.Neutral,
            summary: parsedJson.summary || "No summary provided.",
            suggestedTags: parsedJson.suggestedTags || [],
            suggestedAssignee: parsedJson.suggestedAssignee || "Tier 1 Support",
            businessImpact: parsedJson.businessImpact || "Not assessed."
        };

        return result;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from AI model.");
    }
};
