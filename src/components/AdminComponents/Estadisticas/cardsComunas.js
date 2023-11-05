import React, { useState } from "react";
import {
    Card,
    Grid,
    Title,
    Text,
    Tab,
    TabList,
    TabGroup,
    TabPanel,
    TabPanels,
} from "@tremor/react";
const CardsComunas = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedLocation = selectedIndex === 0 ? "A" : "B";
    return (
        <Grid numItems={1} className="gap-3">
            <Card decoration="top" decorationColor="emerald">
                <Title>Provincia de Valdivia</Title>
                <TabGroup
                    index={selectedIndex}
                    onIndexChange={setSelectedIndex}
                    className="mt-6"
                >
                    <TabList>
                        <Tab>Valdivia</Tab>
                        <Tab>Lanco</Tab>
                        <Tab>Máfil</Tab>
                        <Tab>Mariquina</Tab>
                        <Tab>Corral</Tab>
                        <Tab>Paillaco</Tab>
                        <Tab>Los Lagos</Tab>
                        <Tab>Panguipulli</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className="mt-4">
                                <Title>Colores Rescatados: 40</Title>
                                <Text>
                                    Última Expedición: 26 de Agosto 2023
                                </Text>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </Card>
            <Card decoration="top" decorationColor="orange">
                <Title>Provincia del Ranco</Title>
                <TabGroup className="mt-6">
                    <TabList>
                        <Tab>La Unión</Tab>
                        <Tab>Río Bueno</Tab>
                        <Tab>Lago Ranco</Tab>
                        <Tab>Futrono</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="mt-4">
                            <Title>Colores Rescatados: 16</Title>
                            <Text>Última Expedición: 15 de Abril 2023</Text>
                        </div>
                    </TabPanel>
                </TabGroup>
            </Card>
        </Grid>
    );
};
export default CardsComunas;
