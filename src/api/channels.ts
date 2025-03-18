
const API_BASE = useRuntimeConfig().public.API_BASE; // Centralize base URL

export const fetchChannels = () => {
  return $fetch(`${API_BASE}/channels`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    }
  );
};

export const fetchChannelById = (id: string) => {
  return $fetch(`${API_BASE}/channels/${id}`);
};

export const createChannel = (data: any) => {
  return $fetch(`${API_BASE}/channels`, {
    method: "POST",
    body: data,
  });
};
