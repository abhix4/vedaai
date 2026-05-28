

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080"

export async function apiFetch(
  path: string,
  options?: RequestInit
) {
  const res = await fetch(
    `${API_URL}${path}`,
    {
      ...options,

      credentials: "include",

      headers: {
        "Content-Type": "application/json",

        ...options?.headers,
      },
    }
  )

  let data

  try {
    data = await res.json()
  } catch {
    data = null
  }

  if (!res.ok) {
    throw new Error(
      data?.error ||
        "Something went wrong"
    )
  }

  return data
}