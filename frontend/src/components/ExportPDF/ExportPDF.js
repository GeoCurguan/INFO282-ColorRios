import { useState, useEffect } from "react";
import { COLORINFO, RGB } from "@/constants/properties";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Estilos para el pdf
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    padding: "40",
  },
  section: {
    border: "2px solid black",
    flexGrow: 1,
  },
  cardColor: {
    backgroundColor: "#D1D5DB",
    height: "40%",
    padding: "40 40 50 40",
  },
  selectedColor: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  colorImage: {
    marginTop: "150px",
    width: "220",
    height: "220",
    borderRadius: "400",
    border: "10px solid #434343", //Cambiar a variable para que se adapte al color
    position: "absolute",
    bottom: "-30px",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "200",
    height: "200",
    borderRadius: "400",
    objectFit: "cover",
  },
  cardInfo: {
    flexDirection: "column",
    alignItems: "center",
  },
  colorTitle: {
    fontSize: "32px",
  },
  colorLocation: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  colorLocationData: {
    width: "40%",
    alignItems: "center",
  },
  dataContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "10px 5px 10px 5px",
    margin: "10px 0px 10px 0px",
  },
  subTitles: {
    fontSize: "26px",
  },
});

//PDF a generar
const PDFToExport = ({ favoriteColors }) => {
  return (
    <Document>
      {favoriteColors
        ? favoriteColors.map((color, index) => {
            return (
              <Page size="A4" style={styles.page} key={index}>
                <View style={styles.section}>
                  <View style={styles.cardColor}>
                    <View
                      style={[
                        styles.selectedColor,
                        {
                          backgroundColor: `rgb(${color[COLORINFO.rgbR]},${color[COLORINFO.rgbG]},${
                            color[COLORINFO.rgbB]
                          })`,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.colorImage,
                          {
                            border: `10px solid rgb(${color[COLORINFO.rgbR]},${color[COLORINFO.rgbG]},${
                              color[COLORINFO.rgbB]
                            })`,
                          },
                        ]}
                      >
                        {/* FALTA IMÁGEN */}
                        {/* <Image style={styles.image} src={color[5]} /> */}
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.colorTitle}>{color[COLORINFO.colorName]}</Text>
                    <Text style={styles.subTitles}>Informacion</Text>
                    <View style={styles.colorLocation}>
                      <View style={styles.colorLocationData}>
                        <View style={styles.dataContainer}>
                          <Text style={styles.subTitles}>Comuna</Text>
                          <Text>{color[COLORINFO.comuna]}</Text>
                        </View>
                      </View>
                      <View style={styles.colorLocationData}>
                        <View style={styles.dataContainer}>
                          <Text style={styles.subTitles}>Muestra</Text>
                          <Text>xxx -xxx -xxx</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.subTitles}>Códigos</Text>
                    <View style={styles.colorLocation}>
                      <View style={styles.colorLocation}>
                        <View style={styles.colorLocationData}>
                          <View style={styles.dataContainer}>
                            <Text style={styles.subTitles}>NCS</Text>
                            <Text>
                              {color[COLORINFO.ncsNuance]}-{color[COLORINFO.ncsHue]}
                            </Text>
                          </View>

                          <View style={styles.dataContainer}>
                            <Text style={styles.subTitles}>Cielab</Text>
                            <Text>
                              L*: {color[COLORINFO.cielabL]} a*: {color[COLORINFO.cielabA]} b*:{" "}
                              {color[COLORINFO.cielabB]}
                            </Text>
                          </View>

                          <View style={styles.dataContainer}>
                            <Text style={styles.subTitles}>Cmynk</Text>
                            <Text>
                              {color[COLORINFO.cmykC]}C {color[COLORINFO.cmykM]}M {color[COLORINFO.cmykY]}Y{" "}
                              {color[COLORINFO.cmykK]}K{" "}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.colorLocationData}>
                          <View style={styles.dataContainer}>
                            <Text style={styles.subTitles}>RGB</Text>
                            <Text>
                              {color[COLORINFO.rgbR]}-{color[COLORINFO.rgbG]}-{color[COLORINFO.rgbB]}
                            </Text>
                          </View>

                          <View style={styles.dataContainer}>
                            <Text style={styles.subTitles}>Munsell</Text>
                            <Text>{color[COLORINFO.munsellHue] + "/" + color[COLORINFO.munsellChroma]}</Text>
                          </View>

                          <View style={styles.dataContainer}>
                            <Text style={styles.subTitles}>Cerecita</Text>
                            <Text>xxx -xxx -xxx</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Page>
            );
          })
        : ""}
    </Document>
  );
};

//Componente del boton de el export
const ExportPDF = ({ setDownloaded, favoriteColors }) => {
  //Boleando para controlar el renderizado del pdf con next
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="text-white">
          <PDFDownloadLink
            onClick={() => {
              setDownloaded(true);
            }}
            document={<PDFToExport favoriteColors={favoriteColors} />}
            fileName="colores-favoritos.pdf"
          >
            {({ blob, url, loading, error }) => (loading ? "Cargando colores..." : "Exportar")}
          </PDFDownloadLink>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExportPDF;
