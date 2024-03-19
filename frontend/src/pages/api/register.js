export default async function handler(req, res) {
  // --- Validaciones ---
  // Debe ser método POST, debe tener body y debe tener username, password, job y regions
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (!req.body) {
    res.status(400).json({ message: "No body provided" });
    return;
  }

  const { username, password, job, region, commune, gender, image } = req.body;
  if (!username || !password || !job || !region || !commune || !gender || !image) {
    res.status(422).json({ message: "Invalid body" });
    return;
  }

  const messageBody = {
    username,
    job,
    password,
    image,
    region,
    commune,
    gender,
  };

  // --- Realizar petición al Backend ---
  try {
    const response = await fetch(`${process.env.BACKEND_IP}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });
    console.log("Response", response);
    if (response.ok) {
      const data = await response.json();
      console.log("Data", data);
      res.status(201).json(data);
    }

    if (response.status !== 500) {
      res.status(response.status).json({ message: response.statusText });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Algo inesperado ocurrió." });
  }
}
