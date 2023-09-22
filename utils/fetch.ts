export const fetcher = async (url: string, method: string, data?: any) => {
  const fetched = await fetch(url, {
    headers: {
      "Content-type": "application/json",
    },
    method,
    body: JSON.stringify(data),
  }).then((res) => res.json());
  return fetched;
};
