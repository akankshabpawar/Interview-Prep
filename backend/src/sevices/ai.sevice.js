
import { GoogleGenAI } from "@google/genai";
import z from 'zod';
import { zodToJsonSchema } from "zod-to-json-schema";


const interviewReportSchema = z.object({
  matchScore: z.number().describe(
    "A score between 0 and 100 indicating how well the candidate's profile matches the job description."
  ),

  technicalQuestions: z.array(
    z.object({
      question: z.string().describe(
        "A technical question that can be asked during the interview."
      ),
      intention: z.string().describe(
        "The interviewer's intention behind asking this question."
      ),
      answer: z.string().describe(
        "How to answer this question, including key points to cover and the recommended approach."
      ),
    })
  ).describe(
    "Technical interview questions along with their intention and suggested answers."
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string().describe(
        "A behavioral question that can be asked during the interview."
      ),
      intention: z.string().describe(
        "The interviewer's intention behind asking this question."
      ),
      answer: z.string().describe(
        "How to answer this question, including key points to cover and the recommended approach."
      ),
    })
  ).describe(
    "Behavioral interview questions along with their intention and suggested answers."
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string().describe(
        "A skill that the candidate is lacking or needs to improve."
      ),
      severity: z.enum(["low", "medium", "high"]).describe(
        "The importance of this skill for the role."
      ),
    })
  ).describe(
    "List of skill gaps in the candidate's profile along with their severity."
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number().describe(
        "Day number in the preparation plan, starting from 1."
      ),
      focus: z.string().describe(
        "The main focus area for the day, such as data structures or system design."
      ),
      tasks: z.array(z.string()).describe(
        "A list of tasks to complete on this day."
      ),
    })
  ).describe(
    "A structured preparation plan to help the candidate prepare effectively for the interview."
  ),
});

async function generateInterviewReport({resume, selfdescription, jobDescription}) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: ` 
        Generate an interview report.

        Requirements:
        - matchScore: single number
        - technicalQuestions: exactly 5 items
        - behavioralQuestions: exactly 5 items
        - skillGaps: maximum 5 items
        - preparationPlan: exactly 7 days

        Resume:
        ${resume}

        Self Description:
        ${selfdescription}

        Job Description:
        ${jobDescription}
        `,

    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
      temperature: 0.2,
    }
  });

    const report = JSON.parse(response.text);
    console.log(report);
}

// export default generateInterviewReport;