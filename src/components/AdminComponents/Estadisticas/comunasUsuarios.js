import React from "react";
import { BarChart, Card, Subtitle, Title, Grid } from "@tremor/react";

const chartdata = [
    {
        comuna: "La Unión",
        "Usuarios Registrados": 174,
    },
    {
        comuna: "Río Bueno",
        "Usuarios Registrados": 137,
    },
    {
        comuna: "Lago Ranco",
        "Usuarios Registrados": 74,
    },
    {
        comuna: "Valdivia",
        "Usuarios Registrados": 374,
    },
    {
        comuna: "Panguipulli",
        "Usuarios Registrados": 64,
    },
    {
        comuna: "Futrono",
        "Usuarios Registrados": 168,
    },
    {
        comuna: "Corral",
        "Usuarios Registrados": 5,
    },
    {
        comuna: "Paillaco",
        "Usuarios Registrados": 183,
    },
    {
        comuna: "Máfil",
        "Usuarios Registrados": 99,
    },
    {
        comuna: "Lanco",
        "Usuarios Registrados": 142,
    },
    {
        comuna: "Mariquina",
        "Usuarios Registrados": 6,
    },
    {
        comuna: "Los Lagos",
        "Usuarios Registrados": 30,
    },
];

const ComunasUsuarios = () => {
    return (
        <Grid numItems={1} className="gap-3">
            {" "}
            <Card>
                <Title>
                    Número de usuarios registrados por comuna, Región de Los
                    Ríos
                </Title>
                <Subtitle>
                    Basado en el total del número de usuarios registrados en la
                    plataforma que hayan ingresado su comuna de origen.
                </Subtitle>
                <BarChart
                    className="mt-4"
                    data={chartdata}
                    index="comuna"
                    categories={["Usuarios Registrados"]}
                    colors={["blue"]}
                    yAxisWidth={48}
                />
            </Card>
        </Grid>
    );
};
export default ComunasUsuarios;
