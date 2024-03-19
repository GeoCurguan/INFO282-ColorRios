export default async function handler(req, res) {
  // --- Validaciones ---
  // Debe ser método POST, debe tener body y debe tener username, colors y descargado
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (!req.body) {
    res.status(400).json({ message: "No body provided" });
    return;
  }

  const { nombre_palette, nombre_propietario, colors, descargado } = req.body;
  if (
    nombre_palette === undefined ||
    nombre_propietario === undefined ||
    colors === undefined ||
    descargado === undefined
  ) {
    res.status(422).json({ message: "Invalid body" });
    return;
  }

  const messageBody = {
    nombre_palette,
    nombre_propietario,
    colors,
    descargado,
  };

  // --- Realizar petición al Backend ---
  try {
    const token = req.headers.authorization.split(" ")[1];
    const response = await fetch(`${process.env.BACKEND_IP}/api/insert_palette`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messageBody),
    });

    // --- Responder al cliente ---
    if (response.ok) {
      const data = await response.json();
      res.status(201).json(data);
    } else {
      res.status(response.status).json({ message: response.statusText });
    }
  } catch {
    res.status(500).json({ message: "Algo inesperado ocurrió." });
  }
}
