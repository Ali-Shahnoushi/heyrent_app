import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [theme, setTheme] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "theme"
  );

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  function toggleDarkMode() {
    setTheme((dark) => !dark);
  }

  return (
    <DarkModeContext.Provider value={{ theme, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === "undefined")
    throw new Error("DarkModeContext was used outside the DarkModeProvider !");

  return context;
}

export { DarkModeProvider, useDarkMode };
