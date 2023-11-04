import React from "react";
import {
    Title,
    Text,
    Card,
    Flex,
    Bold,
    BarList,
    Grid,
    Divider,
} from "@tremor/react";

const userVisits = [
    { name: "/home", value: 652 },
    { name: "/puntos3D", value: 84 },
    { name: "/social", value: 542 },
    { name: "/login", value: 234 },
    { name: "/perfil", value: 142 },
];

const genderUsers = [
    { name: "Femenino", value: 754 },
    { name: "Masculino", value: 478 },
    { name: "Sin especificar", value: 233 },
];

const jobUsers = [
    { name: "Diseñador/a", value: 625 },
    { name: "Arquitecto/a", value: 42 },
    { name: "Decorador/a de Interiores", value: 333 },
    { name: "Artista", value: 291 },
    { name: "Fotógrafo/a", value: 165 },
];

const visits = {
    users: userVisits,
    gender: genderUsers,
    job: jobUsers,
};

const sortData = (data) =>
    data.sort((a, b) => {
        if (a.value < b.value) return 1;
        if (a.value > b.value) return -1;
        return 0;
    });

const Visitas = () => {
    return (
        <Grid numItems={3} className="gap-3">
            <Card className="mx-auto" decoration="top" decorationColor="purple">
                <Title>Visitas por página</Title>
                <Divider></Divider>
                <Flex className="mt-6">
                    <Text>
                        <Bold>Sitio</Bold>
                    </Text>
                    <Text>
                        <Bold>Visitas</Bold>
                    </Text>
                </Flex>
                <BarList
                    data={sortData(visits.users)}
                    showAnimation={false}
                    className="mt-4"
                />
            </Card>
            <Card className="mx-auto" decoration="top" decorationColor="amber">
                <Title>Género de los usuarios Registrados</Title>
                <Divider></Divider>
                <Flex className="mt-6">
                    <Text>
                        <Bold>Género</Bold>
                    </Text>
                    <Text>
                        <Bold>Nº Usuarios</Bold>
                    </Text>
                </Flex>
                <BarList
                    data={sortData(visits.gender)}
                    showAnimation={false}
                    className="mt-4"
                />
            </Card>
            <Card className="mx-auto" decoration="top" decorationColor="teal">
                <Title>Top 5 ocupaciones de Usuarios Registrados</Title>
                <Divider></Divider>
                <Flex className="mt-6">
                    <Text>
                        <Bold>Ocupación</Bold>
                    </Text>
                    <Text>
                        <Bold>Nº Usuarios</Bold>
                    </Text>
                </Flex>
                <BarList
                    data={sortData(visits.job)}
                    showAnimation={false}
                    className="mt-4"
                />
            </Card>
        </Grid>
    );
};

export default Visitas;
