// /api/weather.js
export default async function handler(req, res) {
  const key = process.env.OPENWEATHER_KEY;
  const { lat, lon } = req.query;

  if (!key) {
    return res.status(500).json({ error: "Missing OPENWEATHER_KEY" });
  }

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing coordinates" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=ja`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.cod !== 200) {
      throw new Error(`Weather fetch failed: ${data.message}`);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
