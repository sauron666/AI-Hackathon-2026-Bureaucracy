import OpenAI from 'openai';

const EMBEDDING_MODEL =
  process.env.SIRMA_EMBEDDING_MODEL ||
  process.env.OPENAI_EMBEDDING_MODEL ||
  'text-embedding-3-small';

function getEmbeddingClient(): OpenAI {
  const sirmaApiKey = process.env.SIRMA_API_KEY;
  const apiKey = sirmaApiKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing embedding API key. Set SIRMA_API_KEY (preferred) or OPENAI_API_KEY.');
  }

  const sirmaDomain = process.env.SIRMA_AI_DOMAIN?.replace(/\/+$/, '');
  const derivedSirmaBaseUrl = sirmaDomain ? `${sirmaDomain}/client/api/v1` : undefined;
  const baseURL =
    process.env.SIRMA_BASE_URL ||
    derivedSirmaBaseUrl ||
    process.env.OPENAI_BASE_URL;

  const defaultHeaders: Record<string, string> = {};
  if (sirmaApiKey) {
    // Some Sirma deployments expect API keys in custom headers instead of Authorization.
    defaultHeaders['x-api-key'] = sirmaApiKey;
    defaultHeaders['api-key'] = sirmaApiKey;
  }

  return new OpenAI({
    apiKey,
    baseURL: baseURL || undefined,
    defaultHeaders,
  });
}

/**
 * Generate embedding for a single text using OpenAI's text-embedding-3-small model
 */
export async function embedText(text: string): Promise<number[]> {
  const client = getEmbeddingClient();
  const res = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text.slice(0, 8000),
  });
  return res.data[0].embedding;
}

/**
 * Generate embeddings for multiple texts in batch
 */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const client = getEmbeddingClient();
  const res = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts.map(t => t.slice(0, 8000)),
  });
  return res.data.map(d => d.embedding);
}
