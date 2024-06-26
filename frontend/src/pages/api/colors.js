import bd_rios from "@/pages/api/db/BD-RIOS-2.json";
// import bd_rios from "@/pages/api/1001colores.json";

export default function handler(req, res) {
    // Preparar la respuesta
    const response = bd_rios;
    const values = bd_rios.values;

    // Mapeamos values, si los arreglos [[, ...], ["","",...], ...] dentro tienen menos 27 elementos, los rellenamos con ""
    const valuesFormatted = values.map((value) => {
        if (value.length < 27) {
            const diff = 27 - value.length;
            const emptyArray = Array(diff).fill("");
            return [...value, ...emptyArray];
        }
        return value;
    });

    // Reemplazamos values con valuesFormatted
    response.values = valuesFormatted;

    res.status(200).json(response);
}
