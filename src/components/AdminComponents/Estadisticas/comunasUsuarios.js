import React from "react";
import { BarChart, Card, Subtitle, Title, Grid } from "@tremor/react";

const getCommuneCount = (dataUsers) => {
    const communeCount = {};

    dataUsers.forEach((user) => {
        if (user.region && user.region === "Los Ríos") {
            const commune = user.commune ? user.commune : "Sin especificar";

            if (communeCount.hasOwnProperty(commune)) {
                communeCount[commune] += 1;
            } else {
                communeCount[commune] = 1;
            }
        }
    });

    const allComunas = [
        "La Unión",
        "Río Bueno",
        "Lago Ranco",
        "Valdivia",
        "Panguipulli",
        "Futrono",
        "Corral",
        "Paillaco",
        "Máfil",
        "Lanco",
        "Mariquina",
        "Los Lagos",
    ];
    allComunas.forEach((comuna) => {
        if (!communeCount.hasOwnProperty(comuna)) {
            communeCount[comuna] = 0;
        }
    });

    return Object.entries(communeCount).map(([name, Usuarios]) => ({
        name,
        Usuarios,
    }));
};

const ComunasUsuarios = ({ dataUsers }) => {
    const communeData = getCommuneCount(dataUsers);

    return (
        <Grid numItems={1} className="gap-3">
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
                    data={communeData}
                    index="name"
                    categories={["Usuarios"]}
                    colors={["blue"]}
                    yAxisWidth={48}
                />
            </Card>
        </Grid>
    );
};

export default ComunasUsuarios;
