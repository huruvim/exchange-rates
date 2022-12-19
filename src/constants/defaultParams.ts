const secretApiKey = import.meta.env.VITE_API_KEY;

export const defaultParams = {
  api_key: secretApiKey,
  base: 'USD'
}
