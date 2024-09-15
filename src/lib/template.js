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
import "primeicons/primeicons.css";

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

const calculateLuminance = (hex) => {
  // Convierte el color hex a RGB
  const rgb = parseInt(hex.slice(1), 16); // Remueve el '#' y convierte a número
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  // Normaliza los valores RGB a [0, 1]
  const [rNorm, gNorm, bNorm] = [r, g, b].map((v) => v / 255);

  // Calcula la luminancia usando una fórmula estándar
  const luminance = 0.299 * rNorm + 0.587 * gNorm + 0.114 * bNorm;
  return luminance;
};

const Template = ({
  participante,
  nombre_evento,
  nombre_empresa,
  foto_empresa,
  fondo_color,
  fuente_color,
  borde_color,
  fondo_campos,
}) => {
  const luminance = calculateLuminance(fondo_campos);
  const nombreImg = luminance < 0.5 ? "/usuario.png" : "/usuario-light.png";
  const cargoImg = luminance < 0.5 ? "/cargo.png" : "/cargo-light.png";
  const cedulaImg =
    luminance < 0.5
      ? "/clip-de-tarjeta-de-identificacion-alt.png"
      : "/clip-de-tarjeta-de-identificacion-alt-light.png";
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 1,
      backgroundColor: fondo_color,
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
      backgroundColor: fondo_campos,
      paddingLeft: 1,
      color: fuente_color,
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
      borderColor: borde_color,
    },
  });

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
            <Image
              src={foto_empresa}
              alt="logo"
              style={{ width: 5, height: 2 }}
            />
            <Text style={{ fontSize: 3, color: "gray" }}>{nombre_empresa}</Text>
          </View>
          <Text style={styles.title}>{nombre_evento}</Text>
          <View>
            <View style={styles.listItem}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  src={nombreImg}
                  alt="logo usuario"
                  style={{ width: 3, height: 3, marginTop: 1 }}
                />
                <Text style={{ fontFamily: "Open Sans", fontWeight: 600 }}>
                  Nombre:{" "}
                </Text>
              </View>
              <Text style={{ fontSize: 3 }}>{participante.nombre}</Text>
            </View>
            <View style={styles.listItem}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  src={cedulaImg}
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
                  src={cargoImg}
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
