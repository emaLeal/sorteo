"use client";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useRef } from "react";
import QRCode from "qrcode";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const Template = ({ participante }) => {
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
          <Text style={styles.title}>CERTIFICADO DE PARTICIPANTE</Text>
          <View>
            <Text style={styles.listItem}>Nombre: {participante.nombre}</Text>
            <Text style={styles.listItem}>Cedula: {participante.cedula}</Text>
            <Text style={styles.listItem}>Cargo: {participante.cargo}</Text>
          </View>
          <View>
            <div ref={qrCodeRef}>
              <Image src={qrCodeDataURL()} />
            </div>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template;
