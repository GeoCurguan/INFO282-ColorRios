import React from "react";
import { Card, Flex, ProgressBar, Text, Title } from "@tremor/react";

const Progress = ({ dataColors }) => {
    const colorsCount = dataColors.colors ? dataColors.colors.length : 0;
    const colorGoal = 500;
    const percent = (colorsCount / colorGoal) * 100;
    return (
        <Card className="max-w-auto">
            <Title style={{ fontSize: "30px" }}>Progreso de la meta</Title>
            <Flex>
                <Text className="mt-2">
                    {colorsCount} Colores Recolectados &bull;{" "}
                    {Math.round(percent)}%
                </Text>
                <Text>Meta 500 Colores</Text>
            </Flex>
            <ProgressBar value={percent} color="violet" className="mt-3" />
        </Card>
    );
};
export default Progress;
