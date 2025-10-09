import Footer from "./Footer";
import TempNavbar from "./TempNavbar";
import { Outlet } from "react-router-dom";
export default function TempLayout() {
  return (
    <div id="templayout" className="flex flex-col min-h-screen bg-black">
      <TempNavbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
