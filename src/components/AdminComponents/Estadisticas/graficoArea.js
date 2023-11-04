import React from "react";
import { AreaChart, Card, Title, Subtitle } from "@tremor/react";

const chartdata = [
    {
        comuna: "La Unión",
        "Mes Anterior": 47,
        "Mes Actual": 79,
    },
    {
        comuna: "Río Bueno",
        "Mes Anterior": 40,
        "Mes Actual": 60,
    },
    {
        comuna: "Lago Ranco",
        "Mes Anterior": 28,
        "Mes Actual": 43,
    },
    {
        comuna: "Valdivia",
        "Mes Anterior": 47,
        "Mes Actual": 81,
    },
    {
        comuna: "Panguipulli",
        "Mes Anterior": 32,
        "Mes Actual": 45,
    },
    {
        comuna: "Futrono",
        "Mes Anterior": 36,
        "Mes Actual": 48,
    },
    {
        comuna: "Corral",
        "Mes Anterior": 32,
        "Mes Actual": 44,
    },
    {
        comuna: "Paillaco",
        "Mes Anterior": 37,
        "Mes Actual": 66,
    },
    {
        comuna: "Máfil",
        "Mes Anterior": 11,
        "Mes Actual": 29,
    },
    {
        comuna: "Lanco",
        "Mes Anterior": 15,
        "Mes Actual": 33,
    },
    {
        comuna: "Mariquina",
        "Mes Anterior": 8,
        "Mes Actual": 17,
    },
    {
        comuna: "Los Lagos",
        "Mes Anterior": 19,
        "Mes Actual": 37,
    },
];

const valueFormatter = function (number) {
    return new Intl.NumberFormat("es").format(number).toString();
};

const GraficoArea = () => (
    <Card>
        <Title>Colores rescatados</Title>
        <Subtitle>Mes anterior vs actual Año 2023</Subtitle>
        <AreaChart
            className="h-72 mt-4"
            data={chartdata}
            index="comuna"
            categories={["Mes Anterior", "Mes Actual"]}
            colors={["slate", "pink"]}
            valueFormatter={valueFormatter}
        />
    </Card>
);
export default GraficoArea;
