import React from "react";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Router from './Router';
import { theme } from './theme';
import { ThemeContext, ThemeContextFields } from './context/ThemeContext'; 

export default function App() {

    const [myTheme, setMyTheme] = React.useState<"dark" | "light" | "auto">("dark");

    const themeContext: ThemeContextFields = {
        theme: myTheme,
        setTheme: setMyTheme
    }

    return (
        <MantineProvider theme={ theme }>
            <ThemeContext.Provider value={ themeContext }>
                <Router />
            </ThemeContext.Provider>
        </MantineProvider>
    );
}
