import React from "react";
import { Card, Metric, Text, Flex, Grid, Title } from "@tremor/react";

const Usuarios = ({ dataUsers, dataPalettes, dataPalettesLR }) => {
    const usersInLosRios = dataUsers
        ? dataUsers.filter((user) => user.region === "Los Ríos")
        : [];
    const userCount = usersInLosRios.length;

    const userTotal = dataUsers ? dataUsers.length : 0;

    const paletteTotal = dataPalettes ? dataPalettes.length : 0;
    console.log("datalr", dataPalettesLR);
    const paletteTotalLR = dataPalettesLR ? dataPalettesLR.length : 0;
    console.log("totalLR", paletteTotalLR);

    return (
        <Grid numItems={2} className="gap-3">
            <Card decoration="top" decorationColor="fuchsia">
                <Title className="dark:text-dark-tremor-content-emphasis">
                    Usuarios Registrados de la Región de Los Ríos
                </Title>
                <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="truncate space-x-3"
                >
                    <Metric>{userCount}</Metric>
                    <Text className="truncate">
                        de un total de {userTotal} usuarios
                    </Text>
                </Flex>
            </Card>
            <Card decoration="top" decorationColor="fuchsia">
                <Title className="dark:text-dark-tremor-content-emphasis">
                    Paletas Guardadas por usuarios de la Región de Los Ríos
                </Title>
                <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="truncate space-x-3"
                >
                    <Metric>{paletteTotalLR}</Metric>
                    <Text className="truncate">
                        de un total de {paletteTotal} paletas
                    </Text>
                </Flex>
            </Card>
        </Grid>
    );
};
export default Usuarios;
