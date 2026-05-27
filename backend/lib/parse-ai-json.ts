export function parseAiJson<T>(text: string): T {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("AI returned invalid JSON");
  }
}