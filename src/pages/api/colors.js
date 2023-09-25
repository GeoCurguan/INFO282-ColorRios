import bd_rios from "@/pages/api/BD-RIOS.json";

export default function handler(req, res) {
  res.status(200).json(bd_rios);
}
