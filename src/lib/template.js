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

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 1,
    backgroundColor: "lightblue",
  },
  section: {
    margin: 2,
    padding: 2,
    flexGrow: 1,
  },
  title: {
    fontSize: 4,
    fontFamily: "Open Sans",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 3,
  },
  text: {
    fontSize: 12,
  },
  listItem: {
    backgroundColor: "white",
    paddingLeft: 1,
    paddingRight: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "200%",
    fontSize: 4,
    marginBottom: 1,
  },
  qrDiv: {
    padding: 2,
    border: 3,
    marginTop: 4,
    borderColor: "black",
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

const Template = ({ participante, nombre_evento, nombre_empresa }) => {
  const invitacionLink = `${encodeURIComponent(
    JSON.stringify({ id: participante.id, nombre: participante.nombre })
  )}`;
  const qrCodeRef = useRef(null);
  const qrCodeDataURL = () => {
    const canvas = document.createElement("canvas");
    QRCode.toCanvas(canvas, invitacionLink, { errorCorrectionLevel: "H" });
    return canvas.toDataURL("image/png");
  };
  return (
    <Document>
      <Page size={"A10"} style={styles.page}>
        <View style={styles.section}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Image src="/logo.png" alt="logo" style={{ width: 5, height: 2 }} />
            <Text style={{ fontSize: 3, color: "gray" }}>{nombre_empresa}</Text>
          </View>
          <Text style={styles.title}>{nombre_evento}</Text>
          <View>
            <View style={styles.listItem}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  src={"/usuario.png"}
                  alt="logo usuario"
                  style={{ width: 3, height: 3, marginTop: 1 }}
                />
                <Text style={{ fontFamily: "Open Sans", fontWeight: 600 }}>
                  Nombre:{" "}
                </Text>
              </View>
              <Text>{participante.nombre}</Text>
            </View>
            <View style={styles.listItem}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  src={"/clip-de-tarjeta-de-identificacion-alt.png"}
                  alt="logo usuario"
                  style={{ width: 3, height: 3, marginTop: 1 }}
                />
                <Text style={{ fontFamily: "Open Sans", fontWeight: 600 }}>
                  Cedula:{" "}
                </Text>
              </View>

              <Text>{participante.cedula}</Text>
            </View>
            <View style={styles.listItem}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  src="/cargo.png"
                  alt="Cargo de Usuario"
                  style={{ width: 3, height: 3, marginTop: 1 }}
                />
                <Text style={{ fontFamily: "Open Sans", fontWeight: 600 }}>
                  Cargo:{" "}
                </Text>
              </View>

              <Text>{participante.cargo}</Text>
            </View>
          </View>
          <View style={styles.qrDiv}>
            <div ref={qrCodeRef}>
              <Image
                src={qrCodeDataURL()}
                alt="qr-code"
                style={{ width: 53, height: 40 }}
              />
              <Text
                style={{
                  fontWeight: "600",
                  family: "Open Sans",
                  color: "black",
                  textAlign: "center",
                  fontSize: 2,
                  marginTop: 4,
                }}
              >
                Escanea aqui
              </Text>
            </div>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template;
