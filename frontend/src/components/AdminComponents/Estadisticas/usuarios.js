import React from "react";
import {
    Card,
    Metric,
    Text,
    Flex,
    BadgeDelta,
    Grid,
    Title,
} from "@tremor/react";

const colors = {
    increase: "emerald",
    moderateIncrease: "emerald",
    unchanged: "orange",
    moderateDecrease: "rose",
    decrease: "rose",
};

const categories = [
    {
        title: "Usuarios Registrados",
        metric: "77",
        metricPrev: "1.456",
        delta: "34.3%",
        deltaType: "moderateIncrease",
    },
    {
        title: "Paletas Guardadas",
        metric: "45",
        metricPrev: "859",
        delta: "-10.9%",
        deltaType: "moderateDecrease",
    },
];

const Usuarios = () => {
    return (
        <Grid numItems={2} className="gap-3">
            {categories.map((item) => (
                <Card key={item.title}>
                    <Title color="stone">{item.title} </Title>
                    <Flex
                        justifyContent="start"
                        alignItems="baseline"
                        className="truncate space-x-3"
                    >
                        <Metric>{item.metric}</Metric>
                        <Text className="truncate">
                            de un total de {item.metricPrev}
                        </Text>
                    </Flex>
                    <Flex justifyContent="start" className="space-x-2 mt-4">
                        <BadgeDelta deltaType={item.deltaType} />
                        <Flex
                            justifyContent="start"
                            className="space-x-1 truncate"
                        >
                            <Text color={colors[item.deltaType]}>
                                {item.delta}
                            </Text>
                            <Text className="truncate">que el mes pasado</Text>
                        </Flex>
                    </Flex>
                </Card>
            ))}
        </Grid>
    );
};
export default Usuarios;
