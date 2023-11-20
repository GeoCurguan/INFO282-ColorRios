import React from "react";
import { BarChart, Card, Subtitle, Title } from "@tremor/react";

const chartdata = [
    {
        estacion: "Verano ☀️",
        Verano: 200,
    },
    {
        estacion: "Otoño🍁",
        Otoño: 300,
    },
    {
        estacion: "Invierno ❄️",
        Invierno: 550,
    },
    {
        estacion: "Primavera 🌸",
        Primavera: 100,
    },
];

const valueFormatter = (number) =>
    `${new Intl.NumberFormat("us").format(number).toString()}`;

const GraficoBarra = () => (
    <Card>
        <Title>Colores por estación</Title>
        <BarChart
            className="mt-2"
            data={chartdata}
            index="estacion"
            categories={["Verano", "Otoño", "Invierno", "Primavera"]}
            colors={["amber", "teal", "blue", "rose"]}
            valueFormatter={valueFormatter}
            yAxisWidth={48}
        />
    </Card>
);
export default GraficoBarra;
