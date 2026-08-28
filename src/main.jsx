import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Self-hosted fonts (same-origin, no third-party Google Fonts connection)
import "@fontsource-variable/syne";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/space-mono/latin-400.css";
import "@fontsource/space-mono/latin-700.css";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
