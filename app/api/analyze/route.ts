import { generateText, Output } from "ai"
import { bureaucracyResponseSchema } from "@/lib/ai/schemas"
import { BUREAUCRACY_SYSTEM_PROMPT, createUserPrompt } from "@/lib/ai/prompts"
import { getModelId } from "@/lib/ai/providers"

export async function POST(req: Request) {
  try {
    const { question, country, documentContext } = await req.json()

    if (!question || typeof question !== "string") {
      return Response.json({ error: "Question is required" }, { status: 400 })
    }

    const userPrompt = createUserPrompt(question, country, documentContext)

    const { output } = await generateText({
      model: getModelId(),
      system: BUREAUCRACY_SYSTEM_PROMPT,
      output: Output.object({
        schema: bureaucracyResponseSchema,
      }),
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    })

    return Response.json({ response: output })
  } catch (error) {
    console.error("AI analysis error:", error)
    return Response.json(
      { error: "Failed to analyze. Please try again." },
      { status: 500 }
    )
  }
}
