import { ai } from "./lib/gemini";
import { parseAiJson } from "./lib/parse-ai-json";

export async function generateQuestionPaper(dueDate: any, questionType: any, additionalInstruction: any) {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
     config: {
    responseMimeType: "application/json",
  },
    contents: `You are an academic question paper generation engine.

Generate a COMPLETE question paper in STRICT JSON format.

CRITICAL RULES:
- Return ONLY valid JSON
- Do NOT wrap JSON in markdown
- Do NOT return explanations
- Do NOT return escaped JSON strings
- Do NOT return fields like "AiResponse"
- Output must be directly parsable using JSON.parse()

MOST IMPORTANT:
You MUST STRICTLY follow the provided questionType configuration.

The questionType array defines:
- exact question types
- exact number of questions
- exact marks per question

DO NOT generate extra questions.
DO NOT skip any question type.
DO NOT change marks distribution.

Question Type Configuration:
${JSON.stringify(questionType)}

Example Meaning:

[
  {
    "type": "mcq",
    "number": 10,
    "marks": 1
  },
  {
    "type": "short",
    "number": 5,
    "marks": 5
  }
]

This means:
- generate EXACTLY 10 MCQs worth 1 mark each
- generate EXACTLY 5 short questions worth 5 marks each

Generation Rules:
- Automatically create sections A, B, C based on question types
- One section per question type
- Each section MUST contain EXACTLY the configured number of questions
- Each question MUST contain EXACTLY the configured marks

Difficulty Levels:
- easy
- medium
- hard

Question Type Rules:

1. mcq
- include 4 options
- include answer

2. short
- no options

3. long
- no options

Additional Instructions:
${additionalInstruction}

Due Date:
${dueDate}

Expected Output Shape:

{
  "title": "",
  "subject": "",
  "totalMarks": 0,
  "duration": "",
  "sections": [
    {
      "section": "A",
      "type": "mcq",
      "instructions": "",
      "questions": [
        {
          "question": "",
          "difficulty": "easy",
          "marks": 1,
          "type": "mcq",
          "options": [
            "",
            "",
            "",
            ""
          ],
          "answer": ""
        }
      ]
    }
  ]
}

VALIDATION BEFORE RESPONSE:
- Verify section question counts match questionType config
- Verify marks match questionType config
- Verify no missing sections
- Verify no extra questions
- Verify valid JSON`,
  });
  const AiResponse: any = response.text;
  const parsed = parseAiJson(AiResponse)
  return parsed;
}
