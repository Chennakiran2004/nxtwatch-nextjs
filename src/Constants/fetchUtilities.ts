type APIResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const fetchApi = async <T>(
  url: string,
  options: RequestInit
): Promise<APIResponse<T>> => {
  try {
    const response = await fetch(url, options);
    const data = (await response.json()) as T;

    if (response.ok) {
      return { success: true, data };
    }
    return { success: false, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export default fetchApi;
