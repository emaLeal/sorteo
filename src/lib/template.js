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
    padding: 5,
    backgroundColor: "lightblue",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
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
    border: 3,
    marginTop: 15,
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
  const invitacionLink = `${encodeURIComponent(JSON.stringify(participante))}`;
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
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Image
              src="/logo.png"
              alt="logo"
              style={{ width: 40, height: 25 }}
            />
            <Text style={{fontSize: 8, color: 'gray'}}>{nombre_empresa}</Text>
          </View>
          <Text style={styles.title}>{nombre_evento}</Text>
          <View>
            <View style={styles.listItem}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  src={"/usuario.png"}
                  alt="logo usuario"
                  style={{ width: 12, height: 10, marginTop: 2 }}
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
                  style={{ width: 12, height: 12, marginTop: 2 }}
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
                  style={{ width: 12, height: 12, marginTop: 2 }}
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
                style={{ width: 220, height: 180 }}
              />
              <Text
                style={{
                  fontWeight: "600",
                  color: "white",
                  textAlign: "center",
                  fontSize: 10,
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
