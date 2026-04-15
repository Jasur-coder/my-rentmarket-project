const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type PostDataParams = {
  url: string;
  data: unknown;
};

export async function postData({ url, data }: PostDataParams): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
}

export async function getData({ url }: { url: string }): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
}
