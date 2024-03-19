import React, { useState } from "react";
import { Card, Grid, Title, Text, Tab, TabList, TabGroup, TabPanel, TabPanels } from "@tremor/react";

const CardsComunas = ({ dataColors, dates }) => {
  const [selectedIndexValdivia, setSelectedIndexValdivia] = useState(0);
  const [selectedIndexRanco, setSelectedIndexRanco] = useState(0);

  const renderComunaInfo = (comuna) => {
    if (!dataColors || !dataColors.colors || !Array.isArray(dataColors.colors)) {
      return (
        <div className="mt-4">
          <Title>Colores Rescatados: 0</Title>
          <Text>No hay datos disponibles.</Text>
        </div>
      );
    }

    const coloresComuna = dataColors.colors.filter((color) => color.commune === comuna);

    const ultimaExpedicion = coloresComuna.reduce((maxDate, color) => {
      const fechaColor = dates.colors?.find((date) => date.idColor === color.id)?.fecha;

      if (fechaColor) {
        const fechaExpedicion = new Date(fechaColor.date);
        return fechaExpedicion > maxDate ? fechaExpedicion : maxDate;
      } else {
        return maxDate;
      }
    }, new Date(0));

    const totalColoresRescatados = coloresComuna.length;

    const noHayExpediciones = ultimaExpedicion.getTime() === new Date(0).getTime();

    return (
      <div className="mt-4">
        <Title>Colores Rescatados: {totalColoresRescatados}</Title>
        <Text className="sm:hidden"> {comuna} </Text>
        <Text>
          Última Expedición: {noHayExpediciones ? "No existen datos válidos" : ultimaExpedicion.toLocaleDateString()}
        </Text>
      </div>
    );
  };

  const selectedLocationValdivia = selectedIndexValdivia === 0 ? "Valdivia" : "Valdivia";
  const selectedLocationRanco = selectedIndexRanco === 0 ? "Ranco" : "La Unión";

  return (
    <Grid numItems={1} className="gap-3">
      <Card decoration="top" decorationColor="emerald">
        <Title>Provincia de Valdivia</Title>
        <TabGroup index={selectedIndexValdivia} onIndexChange={setSelectedIndexValdivia} className="mt-6">
          <TabList className="overflow-x-auto overflow-y-hidden">
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
            <TabPanel>{renderComunaInfo("Valdivia")}</TabPanel>
            <TabPanel>{renderComunaInfo("Lanco")}</TabPanel>
            <TabPanel>{renderComunaInfo("Máfil")}</TabPanel>
            <TabPanel>{renderComunaInfo("Mariquina")}</TabPanel>
            <TabPanel>{renderComunaInfo("Corral")}</TabPanel>
            <TabPanel>{renderComunaInfo("Paillaco")}</TabPanel>
            <TabPanel>{renderComunaInfo("Los Lagos")}</TabPanel>
            <TabPanel>{renderComunaInfo("Panguipulli")}</TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
      <Card decoration="top" decorationColor="orange">
        <Title>Provincia del Ranco</Title>
        <TabGroup index={selectedIndexRanco} onIndexChange={setSelectedIndexRanco} className="mt-6">
          <TabList>
            <Tab>La Unión</Tab>
            <Tab>Río Bueno</Tab>
            <Tab>Lago Ranco</Tab>
            <Tab>Futrono</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{renderComunaInfo("La Unión")}</TabPanel>
            <TabPanel>{renderComunaInfo("Río Bueno")}</TabPanel>
            <TabPanel>{renderComunaInfo("Lago Ranco")}</TabPanel>
            <TabPanel>{renderComunaInfo("Futrono")}</TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </Grid>
  );
};
export default CardsComunas;
