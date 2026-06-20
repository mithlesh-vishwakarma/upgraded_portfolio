let API_URL = import.meta.env.VITE_API_URL || "https://api.ordinarycoder.com/api";

// Normalize API_URL: remove trailing slashes, and ensure it ends with /api
API_URL = API_URL.replace(/\/+$/, "");
if (!API_URL.endsWith("/api")) {
  API_URL = API_URL + "/api";
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
}
