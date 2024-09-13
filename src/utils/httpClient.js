const apiKey = import.meta.env.VITE_API_KEY;

export function getCurrencyRate() {
  return fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
    .then(res => res.json())
    .catch((err) => {
      throw new Error(err);
    })
}