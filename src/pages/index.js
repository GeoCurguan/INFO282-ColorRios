import { Poppins } from "next/font/google";
// Hooks
import useSideBar from "@/hooks/useSideBar";
import useFilters from "@/hooks/useFilters";

// Components
import Header from "@/components/Header";
import Drawer from "@/components/Drawer/Drawer";
import Colors from "@/components/Colors/Colors";
import ColorDetail from "@/components/ColorDetail/ColorDetail";
import { useState, useEffect } from "react";

import ColorPDF from "@/components/ColorPDF/ColorPDF";

//PDF
import React from 'react';
import ReactDOM from 'react-dom';

import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const poppins = Poppins({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin-ext"],
});

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IP}/api/colors`);
  const colors = await res.json();
  const values = colors.values;

  return {
    props: {
      colors: values,
    },
  };
}


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

const MyDoc = () => (
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
);


export default function Home({ colors }) {
  const { classNameObject, openFilters, toggleFilters, widthColors, detailTransition, currentColor, setCurrentColor } =
    useSideBar();
  const { filters, filterColors, setFilters } = useFilters();
  const filteredColors = filterColors(colors);
  const [colorToPalette, setColorToPalette] = useState(null)

  const [pdf, setPdf] = useState('');

  const downloadPDF = () => {
    const pdf = PDFViewer.renderToString(<ColorPDF />);
    setPdf(pdf);
  };

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <main className={`flex min-h-screen flex-wrap justify-center items-center p-12 ${poppins.className} custom-bg`}>
        <div className={`flex min-h-screen w-full`}>
          {/* -- ColorDetail -- */}
          <div
            className={`flex ${classNameObject.filtersDrawer.detailTransition} top-0 right-0 h-128 transition ease-in-out delay-150 `}
          >
            <Drawer
              colors={colors}
              openFilters={openFilters}
              toggleFilters={toggleFilters}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div
            className={`flex flex-wrap justify-center ${widthColors} items-center transition-all content-start `}
            data-testid="colors"
          >
            <Header filteredColorsLength={filteredColors.length} colorsLength={colors.length} colorToPalette={colorToPalette} />
            <Colors colors={filteredColors} setCurrentColor={setCurrentColor} />
          </div>

          {/* -- ColorDetail -- */}
          <div
            className={`flex ${classNameObject.colorDetail.detailTransition} top-0 right-0 h-128 transition ease-in-out delay-150 `}
          >
            <ColorDetail color={currentColor} setCurrentColor={setCurrentColor} setColorToPalette={setColorToPalette}/>
          </div>

          {
            isClient ?                 <div>
            <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>
            </div> : null
          }


        </div>
      </main>
    </>
  );
}
