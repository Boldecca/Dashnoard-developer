import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import "./App.css"
export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <Navbar />
      <Dashboard />
    </div>
  );
}
