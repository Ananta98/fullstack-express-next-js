"use client";

import { createTheme } from "@mui/material/styles";
import { colorSchemes, typography, shadows, shape } from "./ThemePrimitives";

export const pageTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
    cssVarPrefix: "template",
  },
  colorSchemes,
  typography,
  shadows,
  shape,
});
