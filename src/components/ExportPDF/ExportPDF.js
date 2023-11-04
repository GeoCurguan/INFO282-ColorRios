import { useState, useEffect } from 'react';
import { RGB } from "@/constants/properties";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { rgbToHex } from '@/utils';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: '40',
  },
  section: {
	border: '2px solid black',
    flexGrow: 1
  },
  cardColor: {
    backgroundColor: '#D1D5DB',
    height: '40%',
    padding: '40 40 50 40',
  },
  selectedColor: {
    height: '100%',
	  width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorImage: {
    marginTop: '150px',
    width: '220',
    height: '220',
	  borderRadius: '400',
    border: '10px solid #434343',//Cambiar a variable para que se adapte al color
    position: 'absolute',
	  bottom: '-30px',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '200',
    height: '200',
    borderRadius: '400',
    objectFit: 'cover',
  },
  cardInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  colorTitle: {
    fontSize: '32px',
  },
  colorLocation: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  colorLocationData: {
    width: '40%',
    alignItems: 'center',

  },
  dataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '10px 5px 10px 5px',
    margin : '10px 0px 10px 0px',
  },
  subTitles: {
    fontSize: '26px',
  }
});

//PDF a generar
const PDFToExport = ({favoriteColors}) => {
  return (
    <Document>
        {favoriteColors
          ? favoriteColors.map((color, index) => {
              return (
                <Page size="A4" style={styles.page} key={index}>
                  <View style={styles.section}>
                    <View style={styles.cardColor}>
                      <View style={[styles.selectedColor, {backgroundColor: `rgb(${color[RGB.R]},${color[RGB.G]},${color[RGB.B]})` }]}>
                        <View style={[styles.colorImage, {border: `10px solid rgb(${color[RGB.R]},${color[RGB.G]},${color[RGB.B]})`}]}>
                          <Image
                            style={styles.image}
                            src={color[5]}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.colorTitle}>{color[12]}</Text>
                      <Text style={styles.subTitles}>Informacion</Text>
                      <View style={styles.colorLocation}>
                        <View style={styles.colorLocationData}>
                          <View style={styles.dataContainer}>
                            <Text style={styles.subTitles}>Comuna</Text>
                            <Text>{color[1]}</Text>
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
                                <Text>xxx -xxx -xxx</Text>
                              </View>

                              <View style={styles.dataContainer}>
                                <Text style={styles.subTitles}>Cielab</Text>
                                <Text>xxx -xxx -xxx</Text>
                              </View>

                              <View style={styles.dataContainer}>
                                <Text style={styles.subTitles}>Cmynk</Text>
                                <Text>xxx -xxx -xxx</Text>
                              </View>
                            </View>
                            <View style={styles.colorLocationData}>
                              <View style={styles.dataContainer}>
                                <Text style={styles.subTitles}>RGB</Text>
                                <Text>{color[RGB.R]}-{color[RGB.G]}-{color[RGB.B]}</Text>
                              </View>

                              <View style={styles.dataContainer}>
                                <Text style={styles.subTitles}>Munsell</Text>
                                <Text>xxx -xxx -xxx</Text>
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
}

//Componente del boton de el export
const ExportPDF = ({favoriteColors}) => {

  //Boleando para controlar el renderizado del pdf con next
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return(
    <>
      {
        isClient ?
          <div>
          <PDFDownloadLink document={<PDFToExport favoriteColors={favoriteColors}/>} fileName="colores-favoritos.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Cargando colores...' : 'Exportar colores')}
          </PDFDownloadLink>
          </div> : <></>
      }
    </>
  )
}

export default ExportPDF;