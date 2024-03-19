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
    border: "10px solid #D1D5DB", //Cambiar a variable para que se adapte al color
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
                          {/*
                            border: `10px solid rgb(${color[COLORINFO.rgbR]},${color[COLORINFO.rgbG]},${
                              color[COLORINFO.rgbB]
                            })`,*/
                            backgroundColor:
                            `rgb(
                                ${color[COLORINFO.rgbR]},
                                ${color[COLORINFO.rgbG]},
                                ${color[COLORINFO.rgbB]})`
                          },
                        ]}
                      >
                        {/* FALTA IMÁGEN */}
                        <View style={styles.image} src={color[5]}></View>
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
        <div className={`text-white text-xs flex flex-col items-center justify-center`}>
          <PDFDownloadLink
            onClick={() => {
              setDownloaded(true);
            }}
            document={<PDFToExport favoriteColors={favoriteColors} />}
            fileName="colores-favoritos.pdf"
          >
            {({ blob, url, loading, error }) => (loading ? "Cargando colores..." : <><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16">
  <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"/>
</svg> </>)}
          </PDFDownloadLink>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExportPDF;
