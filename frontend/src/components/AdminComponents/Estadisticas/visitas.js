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

const getGenderCount = (dataUsers) => {
    const genderCount = { Femenino: 0, Masculino: 0, "Sin especificar": 0 };

    dataUsers.forEach((user) => {
        const gender = user.gender || "Sin especificar";
        genderCount[gender] += 1;
    });

    return Object.entries(genderCount).map(([name, value]) => ({
        name,
        value,
    }));
};

const getJobCount = (dataUsers) => {
    const jobCount = {
        Diseñador: 0,
        Artista: 0,
        Profesor: 0,
        Estudiante: 0,
        Otro: 0,
    };

    dataUsers.forEach((user) => {
        const job = user.job ? user.job : "otro";

        if (jobCount.hasOwnProperty(job)) {
            jobCount[job] += 1;
        } else {
            jobCount["Otro"] += 1;
        }
    });

    return Object.entries(jobCount).map(([name, value]) => ({ name, value }));
};

const sortData = (data) =>
    data.sort((a, b) => {
        if (a.value < b.value) return 1;
        if (a.value > b.value) return -1;
        return 0;
    });

const Visitas = ({ dataUsers }) => {
    const genderData = getGenderCount(dataUsers);
    const jobData = getJobCount(dataUsers);

    return (
        <Grid numItems={3} className="gap-3">
            <Card className="mx-auto" decoration="top" decorationColor="purple">
                <Title>Visitas por página</Title>
                <Divider></Divider>
                {/*En construcción, se debería manejar con los logs*/}
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
                    data={sortData(genderData)}
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
                    data={sortData(jobData)}
                    showAnimation={false}
                    className="mt-4"
                />
            </Card>
        </Grid>
    );
};

export default Visitas;
