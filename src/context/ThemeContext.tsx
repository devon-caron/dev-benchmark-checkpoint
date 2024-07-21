import React from "react";

export interface ThemeContextFields {
    theme: "dark" | "light" | "auto";
    setTheme: (newTheme: "dark" | "light" | "auto") => void;
}

export const ThemeContext = React.createContext<ThemeContextFields | null>(null);