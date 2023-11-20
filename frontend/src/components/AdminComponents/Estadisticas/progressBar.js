import React from "react";
import { Card, Flex, ProgressBar, Text, Title } from "@tremor/react";

const Progress = () => (
    <Card className="max-w-auto">
        <Title style={{ fontSize: "30px" }}>Progreso de la meta</Title>
        <Flex>
            <Text className="mt-2">86 Colores Recolectados &bull; 17.2%</Text>
            <Text>Meta 500 Colores</Text>
        </Flex>
        <ProgressBar value={17.2} color="violet" className="mt-3" />
    </Card>
);
export default Progress;
