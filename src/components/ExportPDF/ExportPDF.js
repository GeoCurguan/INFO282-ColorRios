import { useState, useEffect } from 'react';

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

//PDF a generar
const PDFToExport = ({colorPalette}) => {
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
  )

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
          <PDFDownloadLink document={<PDFToExport />} fileName="somename.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
          </PDFDownloadLink>
          </div> : <></>
      }
    </>
  )
}

export default ExportPDF;