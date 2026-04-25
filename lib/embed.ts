import OpenAI from 'openai';

<<<<<<< HEAD
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
=======
// Singleton for OpenAI client
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
>>>>>>> 7d6186e3b5eee7d8cd1720ec2f6ff6e1b9a03e3c
}

/**
 * Generate embedding for a single text with retry logic
 */
<<<<<<< HEAD
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const client = getEmbeddingClient();
  const res = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts.map(t => t.slice(0, 8000)),
  });
  return res.data.map(d => d.embedding);
=======
export async function embedText(
  text: string, 
  retries = 3, 
  delay = 1000
): Promise<number[]> {
  const openai = getOpenAIClient();
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text.slice(0, 8000),
      });
      return res.data[0].embedding;
    } catch (err) {
      lastError = err as Error;
      if (attempt < retries) {
        // Exponential backoff
        await new Promise(r => setTimeout(r, delay * Math.pow(2, attempt)));
      }
    }
  }

  throw lastError || new Error('Failed to embed text after retries');
}

/**
 * Generate embeddings for multiple texts in batch with retry logic
 */
export async function embedBatch(
  texts: string[], 
  retries = 3, 
  delay = 1000
): Promise<number[][]> {
  const openai = getOpenAIClient();
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: texts.map(t => t.slice(0, 8000)),
      });
      return res.data.map(d => d.embedding);
    } catch (err) {
      lastError = err as Error;
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, delay * Math.pow(2, attempt)));
      }
    }
  }

  throw lastError || new Error('Failed to embed batch after retries');
}

/**
 * Check if OpenAI API is reachable
 */
export async function checkOpenAIHealth(): Promise<boolean> {
  try {
    const openai = getOpenAIClient();
    await openai.models.list();
    return true;
  } catch {
    return false;
  }
>>>>>>> 7d6186e3b5eee7d8cd1720ec2f6ff6e1b9a03e3c
}
