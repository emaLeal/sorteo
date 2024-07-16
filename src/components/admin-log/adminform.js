"use client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminForm() {
  const router = useRouter();
  const [error, setError] = useState(null);

  React.useEffect(() => {
    Aos.init();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          usuario: e.target.user.value,
          contrasena: e.target.password.value,
        }),
      });
      if (res.ok) {
        if (res.status === 200) {
          router.push("/admin-hub");
        }
        if (res.status === 400) {
          throw res;
        }
      }
    } catch (error) {
      setError("Credenciales Incorrectos");
    }
  };

  const passwordHeader = <h6>Ingresa una contraseña</h6>;
  const passwordFooter = (
    <>
      <Divider />
      <p className="mt-2">Sugerencias</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>Al menos una letra minuscula</li>
        <li>Al menos una letra mayuscula</li>
        <li>Al menos un caracter numerico</li>
        <li>Minimo 8 caracteres</li>
      </ul>
    </>
  );

  return (
    <div data-aos={"zoom-in"} className="flex justify-center my-20">
      <div className="form-demo">
        <div className="card text-center">
          <h2 className="font-bold mb-4">Inicio de Sesion</h2>
          <form onSubmit={onSubmit} className="p-fluid" method="post">
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText id={"user"} name="user" />

                <label htmlFor="user">Usuario*</label>
              </span>
            </div>
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Password
                  id={"password"}
                  name="password"
                  header={passwordHeader}
                  footer={passwordFooter}
                />

                <label htmlFor="user">Contraseña*</label>
              </span>
            </div>
            <Button
              type="submit"
              label="Iniciar Sesión"
              tooltip="Iniciar Sesión"
              className="mt-2 p-button-primary p-button-text p-button-rounded"
            />
            <div className="mt-2">
              {error && <span className="text-red-400 font-bold">{error}</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
