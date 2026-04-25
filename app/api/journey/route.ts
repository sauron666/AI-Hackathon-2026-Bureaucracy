import { generateObject } from 'ai';
import { z } from 'zod';
import { getModelId } from '@/lib/ai/providers';
import { buildJourneySystemPrompt } from '@/lib/prompts';
import { retrieveContext, buildContext, getConfidence } from '@/lib/rag';
import { RelocationJourneySchema, COUNTRY_NAMES } from '@/lib/types';

const journeyRequestSchema = z.object({
  from_country: z.string().trim().min(2).max(100).default('unknown'),
  to_country: z.string().trim().length(2).toUpperCase().default('DE'),
  nationality: z.string().trim().min(2).max(100).optional(),
  purpose: z.string().trim().min(1).max(100).default('work'),
  language: z.string().trim().min(2).max(30).default('en'),
});

export async function POST(req: Request) {
  try {
    const payload = journeyRequestSchema.safeParse(await req.json());
    if (!payload.success) {
      return Response.json(
        {
          error: 'Invalid request payload',
          details: payload.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { from_country, to_country, nationality, purpose, language } =
      payload.data;

    const query = `moving to ${to_country} ${purpose} residence permit registration`;
    const { chunks, sources, distances } = await retrieveContext(
      query,
      to_country,
      8,
    );
    const context = buildContext(chunks, sources);
    const confidence = getConfidence(distances);

    if (confidence < 0.25 || chunks.length === 0) {
      return Response.json({
        title: `Relocation plan for ${COUNTRY_NAMES[to_country] || to_country}`,
        phases: [],
        warnings: [
          `Limited official procedure information is currently available for ${
            COUNTRY_NAMES[to_country] || to_country
          }.`,
          'Verify visa, registration, and permit requirements on official government websites before acting.',
        ],
        estimated_total_cost: null,
      });
    }

    const { object } = await generateObject({
      model: getModelId(),
      schema: RelocationJourneySchema,
      system: buildJourneySystemPrompt(to_country, language),
      prompt: `Relocating from: ${from_country}
Nationality: ${nationality || 'not specified'}
Destination: ${COUNTRY_NAMES[to_country] || to_country}
Purpose: ${purpose}

Context from ${COUNTRY_NAMES[to_country] || to_country} official sources:
${context}`,
    });

    return Response.json(object);
  } catch (error) {
    console.error('Journey route error:', error);
    return Response.json(
      { error: 'Failed to generate relocation journey' },
      { status: 500 },
    );
  }
}
