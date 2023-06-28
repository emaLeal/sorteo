import Navbar from "./navbar";

export default async function GestionarEventoId({ children, params }) {
  const { id } = params
  return (
    <>
      <Navbar id={id} />
      <div>{children}</div>
    </>
  );
}
