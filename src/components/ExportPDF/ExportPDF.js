import { useState, useEffect } from 'react';

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
    backgroundColor: '#434343', //Cambiar a variable para que se adapte al color
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorImage: {
    backgroundColor: 'gray', //Cambiar a backgroundImage de la imagen asignada para el color
    marginTop: '150px',
    width: '210',
    height: '210',
    borderRadius: '100',
    border: '5px solid #434343',
    position: 'absolute',
	bottom: '-30px'
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
const PDFToExport = ({colorPalette}) => {
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.cardColor}>
          <View style={styles.selectedColor}>
            <View style={styles.colorImage}>
            </View>
          </View>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.colorTitle}>Nombre de color</Text>
          <Text style={styles.subTitles}>Informacion</Text>
          <View style={styles.colorLocation}>
            <View style={styles.colorLocationData}>
              <View style={styles.dataContainer}>
                <Text style={styles.subTitles}>Comuna</Text>
              	<Text>xxx -xxx -xxx</Text>
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
                    <Text>xxx -xxx -xxx</Text>
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
        <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.cardColor}>
          <View style={styles.selectedColor}>
            <View style={styles.colorImage}>
            </View>
          </View>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.colorTitle}>Nombre de color</Text>
          <Text style={styles.subTitles}>Informacion</Text>
          <View style={styles.colorLocation}>
            <View style={styles.colorLocationData}>
              <View style={styles.dataContainer}>
                <Text style={styles.subTitles}>Comuna</Text>
              	<Text>xxx -xxx -xxx</Text>
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
                    <Text>xxx -xxx -xxx</Text>
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
  </Document>
);
}

//Componente del boton de el export
const ExportPDF = () => {

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
          <PDFDownloadLink document={<PDFToExport />} fileName="colores-favoritos.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Cargando colores...' : 'Exportar colores')}
          </PDFDownloadLink>
          </div> : <></>
      }
    </>
  )
}

export default ExportPDF;