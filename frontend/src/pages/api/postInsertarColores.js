export default async function handler(req, res) {
  // --- Validaciones ---
  // Debe ser método POST, debe tener body y debe tener username, colors y descargado
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  // --- Realizar petición al Backend ---
  try {
    // --- Extraer token de la petición ---
    const token = req.headers.authorization.split(" ")[1];
    const response = await fetch(`${process.env.BACKEND_IP}/api/insertar_color`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
