import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { themeDefault } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { Header } from "./components/Header";
import { CycleContextProvider } from "./contexts/CycleContext";

export function App() {
  return (
    <ThemeProvider theme={themeDefault}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
