import { GoogleGenAI, Type } from "@google/genai";

const interviewReportSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: {
      type: Type.NUMBER,
      description:
        "A score between 0 and 100 indicating how well the candidate matches the job description.",
    },

    technicalQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          intention: { type: Type.STRING },
          answer: { type: Type.STRING },
        },
        required: ["question", "intention", "answer"],
      },
    },

    behavioralQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          intention: { type: Type.STRING },
          answer: { type: Type.STRING },
        },
        required: ["question", "intention", "answer"],
      },
    },

    skillGaps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING },
          severity: {
            type: Type.STRING,
            enum: ["low", "medium", "high"],
          },
        },
        required: ["skill", "severity"],
      },
    },

    preparationPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.NUMBER,
          },
          focus: {
            type: Type.STRING,
          },
          tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
    title:{
      type: Type.STRING,
      description:
        "A tilte based on job Description.",
    },
  },

  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
    "title",
  ],
};

async function generateInterviewReport({
  resume,
  selfdescription,
  jobDescription,
}) {
    
   const ai = new GoogleGenAI({
   apiKey: process.env.GOOGLE_GENAI_API_KEY,
   });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",

      contents: `
        You are an expert technical interviewer.

        Analyze the candidate and generate an interview report.

        Requirements:

        - matchScore must be between 0 and 100.
        - Generate exactly 5 technical questions.
        - Generate exactly 5 behavioral questions.
        - Each question must include:
          - question
          - intention
          - answer
        - Generate 3-5 skill gaps.
        - Generate a 7-day preparation plan.
        - Return ONLY data matching the schema.

        Candidate Resume:
        ${resume}

        Self Description:
        ${selfdescription}

        Job Description:
        ${jobDescription}
        `,

      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: interviewReportSchema,
      },
    });

    const report = JSON.parse(response.text);

    return report;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

export default generateInterviewReport;