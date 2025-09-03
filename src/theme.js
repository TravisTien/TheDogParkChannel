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
            main: "#fcfdff",
            border: '#6E6E6E',
        },
        button: {
            inactive: "#eeeeee",
            active: "#e1473e",
            hover: "#c5c7c5",
        },
        text: {
            default: "#00092e",
            secondary: "#6E6E6E",
        },
        reverseText: {
            default: "#fcfdff",
            background: "#00092e"
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
        theme: {
            black: "#29092e",
        },
        paper: {
            main: '#1f2535',
            border: '#9E9E9E',
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
        reverseText: {
            default: "#29092e",
            background: "#ffffff"
        },
        gradients: {
            primary: "linear-gradient(180deg, #040918 0%, #091540 100%)",
        },
        primary: {
            main: "#f35a53"
        },
        info: {
            main: '#525868'
        }
    },
});