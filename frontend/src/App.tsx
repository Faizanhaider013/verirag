import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Home from "@/pages/Home";
import AskAI from "@/pages/AskAI";
import Documents from "@/pages/Documents";
import Register from "@/pages/Register";
import Verification from "@/pages/Verification";
import Blockchain from "@/pages/Blockchain";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="ask" element={<AskAI />} />
        <Route path="documents" element={<Documents />} />
        <Route path="register" element={<Register />} />
        <Route path="verification" element={<Verification />} />
        <Route path="blockchain" element={<Blockchain />} />
        <Route path="settings" element={<Settings />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
