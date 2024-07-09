"use client";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { useRef } from "react";
import QRCode from "qrcode";
import logo from '/public/logo.png'

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 5,
    backgroundColor: "lightblue",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: "Open Sans",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
  },
  listItem: {
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "200%",
    fontSize: 12,
    marginBottom: 5,
  },
  qrDiv: {
    padding: 10,
  },
});

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const Template = ({ participante, nombre_evento }) => {
  const invitacionLink = `https://admin.smartie.com.co/api/habilitar`;
  const qrCodeRef = useRef(null);
  const qrCodeDataURL = () => {
    const canvas = document.createElement("canvas");
    QRCode.toCanvas(canvas, invitacionLink, { errorCorrectionLevel: "H" });
    return canvas.toDataURL("image/png");
  };
  return (
    <Document>
      <Page size={"A6"} style={styles.page}>
        <View style={styles.section}>
          <View>
          <Image src="/logo.png" alt="logo" style={{width: 40, height: 25}}/>
          </View>
          <Text style={styles.title}>{nombre_evento}         
          </Text>
          <View>
            <View style={styles.listItem}>
              <Text style={{ fontFamily: "Open Sans", fontWeight: 600 }}>
                Nombre:{" "}
              </Text>
              <Text>{participante.nombre}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={{ fontFamily: "Open Sans", fontWeight: 600 }}>
                Cedula:{" "}
              </Text>
              <Text>{participante.cedula}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={{ fontFamily: "Open Sans", fontWeight: 600 }}>
                Cargo:{" "}
              </Text>
              <Text>{participante.cargo}</Text>
            </View>
          </View>
          <View style={styles.qrDiv}>
            <div ref={qrCodeRef}>
              <Image src={qrCodeDataURL()} alt="qr-code" />
            </div>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template;
