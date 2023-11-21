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

  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ message: "Invalid body" });
    return;
  }

  const messageBody = {
    username,
    password,
  };

  // --- Realizar petición al Backend ---
  try {
    const response = await fetch(`${process.env.BACKEND_IP}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    // --- Responder al cliente ---
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: response.statusText });
    }
  } catch {
    res.status(500).json({ message: "Algo inesperado ocurrió." });
  }
}
