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

    const { username, password, job, region } = req.body;
    if (!username || !password || !job || !region) {
        res.status(422).json({ message: "Invalid body" });
        return;
    }

    const messageBody = {
        username,
        job,
        password,
        image: "",
        region,
        gender: "",
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

        if (response.ok) {
            const data = await response.json();
            console.log("data", data);
            res.status(201).json(data);
        }

        if (response.status !== 500) {
            res.status(response.status).json({ message: response.statusText });
        }
    } catch {
        res.status(500).json({ message: "Algo inesperado ocurrió." });
    }

    // --- Responder al cliente ---
}
