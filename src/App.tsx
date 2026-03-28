import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import MoreProjects from "./pages/MoreProjects";
import type { Language } from "./types/language";

function App() {
  /* Controla o idioma global do portfólio */
  const [language, setLanguage] = useState<Language>("pt-BR");

  return (
    <BrowserRouter>
      <>
        {/* Rotas principais */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                language={language}
                onLanguageChange={setLanguage}
              />
            }
          />

          <Route
            path="/projects"
            element={
              <MoreProjects
                language={language}
                onLanguageChange={setLanguage}
              />
            }
          />
        </Routes>

        {/* Toast global */}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </>
    </BrowserRouter>
  );
}

export default App;