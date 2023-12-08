import React from "react";
import { Card, Metric, Text, Flex, Grid, Title } from "@tremor/react";

const Usuarios = ({ dataUsers }) => {
    const usersInLosRios = dataUsers
        ? dataUsers.filter((user) => user.region === "Los Ríos")
        : [];
    const userCount = usersInLosRios.length;

    const userTotal = dataUsers ? dataUsers.length : 0;

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
                    <Metric>{userCount}</Metric>
                    <Text className="truncate">
                        de un total de {userTotal} paletas
                    </Text>
                </Flex>
            </Card>
        </Grid>
    );
};
export default Usuarios;
