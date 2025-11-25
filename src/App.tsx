import HomePage from "./components/pages/HomePage";
import CertificatesPage from "./components/pages/CertificatesPage";
import Navbar from "./components/navbar/Navbar";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  const showNavbar =
    location.pathname === "/certificates" ||
    location.pathname === "/educational-tour";

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/certificates" element={<CertificatesPage />} />

        {/*
          Future page: educational tour
          <Route path="/educational-tour" element={<EducationalTourPage />} />
        */}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  );
}
