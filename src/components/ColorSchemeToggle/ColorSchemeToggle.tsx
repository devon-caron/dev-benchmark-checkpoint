import { ThemeContext } from '@/context/ThemeContext';
import { Button, Group, useMantineColorScheme } from '@mantine/core';
import React from 'react';

const ColorSchemeToggle: React.FC = () => {

    const themeContext = React.useContext(ThemeContext);
    const { setColorScheme } = useMantineColorScheme();

    const updateColorScheme = (scheme: "dark"| "light" | "auto") => {
        themeContext?.setTheme(scheme);
        setColorScheme(scheme);
    }

    return (
        <Group justify="center" mt="xl">
            <Button onClick={() => updateColorScheme('light')}>Light</Button>
            <Button onClick={() => updateColorScheme('dark')}>Dark</Button>
            <Button onClick={() => updateColorScheme('auto')}>Auto</Button>
        </Group>
    );
}

export default ColorSchemeToggle;
