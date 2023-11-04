import React from "react";
import { Card, DonutChart, Title, Divider } from "@tremor/react";

// Tonos: -Rojos, -Amarillos, -Verdes, -Azules, -Morados, -Rosados,-Naranjos, Faltan: Grises, Blancos, Negros, Cafés.
const colores = [
    {
        tono: "Rojos",
        cantidad: 98,
    },
    {
        tono: "Amarillos",
        cantidad: 12,
    },
    {
        tono: "Verdes",
        cantidad: 55,
    },
    {
        tono: "Azules",
        cantidad: 45,
    },
    {
        tono: "Grises",
        cantidad: 51,
    },
    {
        tono: "Blancos",
        cantidad: 10,
    },
    {
        tono: "Negros",
        cantidad: 20,
    },
    {
        tono: "Morados",
        cantidad: 55,
    },
    {
        tono: "Rosados",
        cantidad: 43,
    },
    {
        tono: "Cafés",
        cantidad: 77,
    },
    {
        tono: "Naranjos",
        cantidad: 34,
    },
];

const GraficoTorta = ({ data }) => {
    const [value, setValue] = React.useState(null);

    //mapeo entre valores HUE y colores
    const hueToColorMap = {
        Y10R: "naranjos",
        Y20R: "naranjos",
        Y30R: "naranjos",
        Y40R: "naranjos",
        Y50R: "naranjos",
        Y60R: "rojos",
        Y70R: "rojos",
        Y80R: "rojos",
        Y90R: "rojos",
        R: "rojos",
        R10B: "rosados",
        R20B: "rosados",
        R30B: "rosados",
        R40B: "morados",
        R50B: "morados",
        R60B: "morados",
        R70B: "morados",
        R80B: "azules",
        R90B: "azules",
        B: "azules",
        B10G: "azules",
        B20G: "azules",
        B30G: "verdes",
        B40G: "verdes",
        B50G: "verdes",
        B60G: "verdes",
        B70G: "verdes",
        B80G: "verdes",
        B90G: "verdes",
        G: "verdes",
        G10Y: "verdes",
        G20Y: "verdes",
        G30Y: "verdes",
        G40Y: "verdes",
        G50Y: "verdes",
        G60Y: "verdes",
        G70Y: "verdes",
        G80Y: "amarillos",
        G90Y: "amarillos",
        Y: "amarillos",
    };

    //objeto para rastrear la cantidad de cada color
    const colorCounts = {};

    //recorrer la data
    data.forEach((item) => {
        const hue = item[7]; //valor de HUE
        const color = hueToColorMap[hue];

        if (color) {
            if (colorCounts[color]) {
                colorCounts[color]++;
            } else {
                colorCounts[color] = 1;
            }
        }
    });

    console.log("contador:", colorCounts);

    return (
        <>
            <Card className="h-full items-center">
                <Title className="text-center">Colores por tonalidad</Title>
                <Divider></Divider>
                <DonutChart
                    className="mt-6"
                    data={colores}
                    category="cantidad"
                    index="tono"
                    colors={[
                        "red",
                        "yellow",
                        "lime",
                        "blue",
                        "slate",
                        "zinc",
                        "stone",
                        "purple",
                        "pink",
                        "amber",
                        "orange",
                    ]}
                    onValueChange={(v) => setValue(v)}
                />
                <div className="mt-4">
                    <Divider></Divider>
                    {value ? (
                        <div className="mt-4 text-lg font-semibold text-center text-gray-600">
                            <div>Tono: {value.tono}</div>
                            <div>Cantidad: {value.cantidad}</div>
                        </div>
                    ) : (
                        <div className="text-lg font-semibold text-center text-gray-500">
                            Selecciona un color...
                        </div>
                    )}
                </div>
            </Card>
        </>
    );
};
export default GraficoTorta;
