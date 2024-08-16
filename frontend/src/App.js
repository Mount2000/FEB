import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  ScrollRestoration,
} from "react-router-dom";
import NotFoundPage from "./pages/404";
import AdminPage from "./pages/admin";
import HomePage from "./pages/home";
import Node from "./pages/node";
import DefaultLayout from "./layouts";
import AirDrop from "./pages/airdrop";
import Swap from "./pages/swap";
import "./global.css";
import Terms from "./pages/terms";
import PrivacyPolicy from "./pages/privacypolicy";

const App = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/node" element={<Node />} />
          <Route path="/airdrop" element={<AirDrop />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
};

export default App;
