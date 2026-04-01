import { useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import MoreProjects from "./pages/MoreProjects";
import type { Language } from "./types/language";

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useLayoutEffect(() => {
    const shouldRestoreProjects =
      location.pathname === "/" &&
      sessionStorage.getItem("homeReturnSection") === "projects";

    if (shouldRestoreProjects) return;

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  /* Controla o idioma global do portfólio */
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("portfolio-language");

    if (savedLanguage === "pt-BR" || savedLanguage === "en") {
      return savedLanguage;
    }

    return "pt-BR";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <BrowserRouter>
      <>
        <ScrollToTopOnRouteChange />

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