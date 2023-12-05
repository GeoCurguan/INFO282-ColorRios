import React from "react";
import { Card, DonutChart, Title, Divider } from "@tremor/react";

const GraficoTorta = ({ dataColors }) => {
    const [value, setValue] = React.useState(null);
    //console.log("asdasd2", dataColors.colors);

    const colorCounts = {};

    if (
        !dataColors ||
        !dataColors.colors ||
        !Array.isArray(dataColors.colors)
    ) {
        return (
            <Card className="h-full items-center">
                <Title className="text-center">Colores por tonalidad</Title>
                <Divider></Divider>
                <div className="mt-4 text-lg font-semibold text-center text-gray-500">
                    No hay datos disponibles, contacte al soporte
                </div>
            </Card>
        );
    }

    dataColors.colors.forEach((color) => {
        const tonalidad = color.categoryName;

        if (tonalidad) {
            if (colorCounts[tonalidad]) {
                colorCounts[tonalidad]++;
            } else {
                colorCounts[tonalidad] = 1;
            }
        }
    });

    const colores = Object.entries(colorCounts).map(
        ([tonalidad, cantidad]) => ({
            tono: tonalidad,
            cantidad,
        })
    );

    //asignar automaticamente los tonos del gráfico
    const tonalidadColores = {
        Rojo: "red",
        Amarillo: "yellow",
        Verde: "lime",
        Azul: "blue",
        Morado: "purple",
        Rosado: "pink",
        Naranja: "orange",
        Gris: "gray",
        Blanco: "zinc",
        Negro: "neutral",
        Café: "stone",
    };

    const coloresGrafico = colores.map((item) => ({
        ...item,
        color: tonalidadColores[item.tono],
    }));

    return (
        <>
            <Card className="h-full items-center">
                <Title className="text-center">Colores por tonalidad</Title>
                <Divider></Divider>
                <DonutChart
                    className="mt-6"
                    data={coloresGrafico}
                    category="cantidad"
                    index="tono"
                    colors={coloresGrafico.map((item) => item.color)}
                    onValueChange={(v) => setValue(v)}
                />
                <div className="mt-4">
                    <Divider></Divider>
                    {value ? (
                        <div className="mt-4 text-lg font-semibold text-center text-gray-600 dark:text-dark-tremor-content-emphasis">
                            <div>Tonalidad: {value.tono}</div>
                            <div>
                                Cantidad de colores recolectados:{" "}
                                {value.cantidad}
                            </div>
                        </div>
                    ) : (
                        <div className="text-lg font-semibold text-center text-gray-500 dark:text-dark-tremor-content-emphasis">
                            Selecciona un color...
                        </div>
                    )}
                </div>
            </Card>
        </>
    );
};

export default GraficoTorta;
