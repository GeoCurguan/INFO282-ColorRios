import React from "react";
import { BarChart, Card, Title, Subtitle } from "@tremor/react";

const transformarDatosParaGrafico = (dataColors, dates) => {
    if (
        !dataColors ||
        !dataColors.colors ||
        !Array.isArray(dataColors.colors)
    ) {
        return [];
    }

    const datosTransformados = {};

    const mesActual = new Date().getMonth() + 1; //(se suma 1 porque los meses empiezan desde 0)

    dataColors.colors.forEach((color) => {
        const comuna = color.commune;
        const idColor = color.id;

        const fechaColor = dates.colors.find(
            (date) => date.idColor === idColor
        )?.fecha;

        if (fechaColor) {
            const mesFechaColor = new Date(fechaColor.date).getMonth() + 1;

            const key = `${comuna}`;

            if (!datosTransformados[key]) {
                datosTransformados[key] = {
                    comuna: comuna,
                    "Mes Anterior": 0,
                    "Mes Actual": 0,
                };
            }

            if (mesFechaColor === mesActual) {
                datosTransformados[key]["Mes Actual"]++;
            } else {
                datosTransformados[key]["Mes Anterior"]++;
            }
        }
    });

    const datosArray = Object.values(datosTransformados).map((item) => ({
        comuna: item.comuna,
        "Mes Anterior": item["Mes Anterior"],
        "Mes Actual": item["Mes Actual"],
    }));

    console.log(datosArray);

    return datosArray;
};

const valueFormatter = function (number) {
    return new Intl.NumberFormat("es").format(number).toString();
};

const GraficoColoresMeses = ({ dataColors, dates }) => {
    const datosGrafico = transformarDatosParaGrafico(dataColors, dates);

    return (
        <Card>
            <Title>Colores rescatados</Title>
            <Subtitle>Mes anterior vs actual</Subtitle>
            <BarChart
                className="h-72 mt-4"
                data={datosGrafico}
                index="comuna"
                categories={["Mes Anterior", "Mes Actual"]}
                colors={["slate", "pink"]}
                valueFormatter={valueFormatter}
            />
        </Card>
    );
};

export default GraficoColoresMeses;
