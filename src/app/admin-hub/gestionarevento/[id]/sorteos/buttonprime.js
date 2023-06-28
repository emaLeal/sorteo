"use client";
import { Button } from "primereact/button";
import React from "react";

export const ButtonPrime = () => {
  return (
    <Button
      label="Volver"
      icon="pi pi-arrow-left"
      tooltip="Volver a ver los eventos"
      className="p-button p-button-primary p-button-text p-button-rounded"
    />
  );
};
