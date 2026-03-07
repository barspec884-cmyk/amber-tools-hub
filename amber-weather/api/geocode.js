// /api/geocode.js
export default async function handler(req, res) {
  const key = process.env.GOOGLE_GEO_KEY;
  const { place, lat, lon } = req.query;

  if (!key) {
    return res.status(500).json({ error: "Missing GOOGLE_GEO_KEY" });
  }

  try {
    let url = "";
    if (place) {
      url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&language=ja&key=${key}`;
    } else if (lat && lon) {
      url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&language=ja&key=${key}`;
    } else {
      throw new Error("No parameters provided");
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.status !== "OK") {
      throw new Error(`Geocoding failed: ${data.status}`);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
