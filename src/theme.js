// src/theme.js

import { createTheme } from '@mui/material/styles';

// 淺色主題
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        backgroundColor: {
            main: "#ecf5fc",
            light: "#1f2535",
            dark: "#eeeeee"
        },
        paper: {
            main: "#fcfdff"
        },
        button: {
            inactive: "#eeeeee",
            active: "#e1473e",
            hover: "#c5c7c5",
        },
        text: {
            default: "#00092e",
            secondary: "#93969d",
        },
        gradients: {
            primary: "linear-gradient(180deg, #EBF2FC 0%, #EEF8F9 100%)",
        },
    },
});

// 深色主題
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        black: "#29092e",
        backgroundColor: {
            main: "#ecf5fc",
            light: "#fcfdff",
            dark: "#eeeeee"
        },
        paper: {
            main: '#1f2535'
        },
        button: {
            inactive: "#535867",
            active: "#f35a53",
            hover: "#525868",
        },
        text: {
            default: "#ffffff",
            secondary: "#abb2bd",
            white: '#ffffff',
        },
        gradients: {
            primary: "linear-gradient(180deg, #040918 0%, #091540 100%)",
        },
        primary: {
            main: "#f35a53"
        }
    },
});