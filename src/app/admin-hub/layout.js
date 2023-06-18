import MenuAdmin from "./menu";

export default async function AdminHubLayout({ children }) {
  return (
    <main className="flex">
      <div className="h-screen pr-2 bg-gradient-to-r from-slate-800">
        <MenuAdmin />
      </div>
      <div>{children}</div>
    </main>
  );
}
