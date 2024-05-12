import "./App.css";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/Home/Home.jsx";
import Signup from "./assets/Signup/Signup.jsx";
import Chat from "./assets/Chats/Chat.jsx";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
