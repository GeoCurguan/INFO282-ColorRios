export default async function handler(req, res) {
  // --- Validaciones ---
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  // --- Realizar petición al Backend ---
  try {
    // --- Extraer token de la petición ---
    // Read /:{id}
    const id = req.query.id;
    console.log(id);
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    const response = await fetch(`${process.env.BACKEND_IP}/api/getUser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
