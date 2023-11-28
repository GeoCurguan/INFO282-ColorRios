import React from "react";
import { BarChart, Card, Subtitle, Title } from "@tremor/react";

const capitalizeFirstLetter = (str) => {
    if (str && typeof str === "string" && str.length > 0) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
};

const GraficoBarra = ({ dataColors }) => {
    if (!dataColors.colors || !Array.isArray(dataColors.colors)) {
        return null;
    }

    const totalSeasons = {
        Verano: 0,
        Otoño: 0,
        Invierno: 0,
        Primavera: 0,
    };

    dataColors.colors.forEach((color) => {
        const capitalizedSeason = capitalizeFirstLetter(color.season);

        if (capitalizedSeason in totalSeasons) {
            totalSeasons[capitalizedSeason]++;
        }
    });

    const chartData = Object.keys(totalSeasons).map((estacion) => ({
        estacion,
        [estacion]: totalSeasons[estacion],
    }));

    return (
        <Card>
            <Title>Colores por estación</Title>
            <BarChart
                className="mt-2"
                data={chartData}
                index="estacion"
                categories={Object.keys(totalSeasons)}
                colors={["amber", "teal", "blue", "rose"]}
                yAxisWidth={48}
            />
        </Card>
    );
};

export default GraficoBarra;
