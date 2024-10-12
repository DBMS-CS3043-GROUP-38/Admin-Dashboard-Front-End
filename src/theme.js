import {createContext, useState, useMemo} from "react";
import {createTheme} from "@mui/material";

// Main Colors
export const tokens = (mode) => ({
    ...(mode === 'dark'
            ? {
                grey: {
                    100: "#e0e0e0",
                    200: "#c2c2c2",
                    300: "#a3a3a3",
                    400: "#858585",
                    500: "#666666",
                    600: "#525252",
                    700: "#3d3d3d",
                    800: "#292929",
                    900: "#141414"
                },
                primary: {
                    100: "#d0d1d5",
                    200: "#a1a4ab",
                    300: "#727681",
                    400: "#1f2a40",
                    500: "#141b2d",
                    600: "#101624",
                    700: "#0c101b",
                    800: "#080b12",
                    900: "#040509"
                },
                greenAccent: {
                    100: "#dbf5ee",
                    200: "#b7ebde",
                    300: "#94e2cd",
                    400: "#70d8bd",
                    500: "#4cceac",
                    600: "#3da58a",
                    700: "#2e7c67",
                    800: "#1e5245",
                    900: "#0f2922"
                },
                redAccent: {
                    100: "#f8dcdb",
                    200: "#f1b9b7",
                    300: "#e99592",
                    400: "#e2726e",
                    500: "#db4f4a",
                    600: "#af3f3b",
                    700: "#832f2c",
                    800: "#58201e",
                    900: "#2c100f"
                },
                purpleAccent: {
                    100: "#e1e2fe",
                    200: "#c3c6fd",
                    300: "#a4a9fc",
                    400: "#868dfb",
                    500: "#6870fa",
                    600: "#535ac8",
                    700: "#3e4396",
                    800: "#2a2d64",
                    900: "#151632"
                },
                yellowAccent: {
                    100: "#fff2cd",
                    200: "#ffe49a",
                    300: "#ffd768",
                    400: "#ffc935",
                    500: "#ffbc03",
                    600: "#cc9602",
                    700: "#997102",
                    800: "#664b01",
                    900: "#332601"
                },
                cyanAccent: {
                    100: "#cdf8fe",
                    200: "#9af1fe",
                    300: "#68e9fd",
                    400: "#35e2fd",
                    500: "#03dbfc",
                    600: "#02afca",
                    700: "#028397",
                    800: "#015865",
                    900: "#012c32"
                },
            } : {
                grey: {
                    100: "#141414",
                    200: "#292929",
                    300: "#3d3d3d",
                    400: "#525252",
                    500: "#666666",
                    600: "#858585",
                    700: "#a3a3a3",
                    800: "#c2c2c2",
                    900: "#e0e0e0"
                },
                primary: {
                    100: "#040509",
                    200: "#080b12",
                    300: "#0c101b",
                    400: "#f2f0f0",
                    // 400: "#101624",
                    500: "#141b2d",
                    600: "#434957",
                    700: "#727681",
                    800: "#a1a4ab",
                    900: "#fcfcfc",
                    // 900: "#d0d1d5"
                },
                greenAccent: {
                    100: "#0f2922",
                    200: "#1e5245",
                    300: "#2e7c67",
                    400: "#3da58a",
                    500: "#4cceac",
                    600: "#70d8bd",
                    700: "#94e2cd",
                    800: "#b7ebde",
                    900: "#dbf5ee"
                },
                redAccent: {
                    100: "#2c100f",
                    200: "#58201e",
                    300: "#832f2c",
                    400: "#af3f3b",
                    500: "#db4f4a",
                    600: "#e2726e",
                    700: "#e99592",
                    800: "#f1b9b7",
                    900: "#f8dcdb"
                },
                purpleAccent: {
                    100: "#151632",
                    200: "#2a2d64",
                    300: "#3e4396",
                    400: "#535ac8",
                    500: "#6870fa",
                    600: "#868dfb",
                    700: "#a4a9fc",
                    800: "#c3c6fd",
                    900: "#e1e2fe"
                },
                yellowAccent: {
                    100: "#332601",
                    200: "#664b01",
                    300: "#997102",
                    400: "#cc9602",
                    500: "#ffbc03",
                    600: "#ffc935",
                    700: "#ffe49a",
                    800: "#fff2cd",
                    900: "#fff2cd"
                },
                cyanAccent: {
                    100: "#012c32",
                    200: "#015865",
                    300: "#028397",
                    400: "#02afca",
                    500: "#03dbfc",
                    600: "#35e2fd",
                    700: "#68e9fd",
                    800: "#9af1fe",
                    900: "#cdf8fe"
                }
            }
    )
});


//Mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark')
                ? {
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.redAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[300],
                    },
                    background: {
                        default: colors.primary[600],
                    }
                }
                : {
                    primary: {
                        main: colors.primary[300],
                    },
                    secondary: {
                        main: colors.redAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[300],
                    },
                    background: {
                        default: colors.primary[900],
                    }
                }
        },
        typography: {
            fontFamily: ["Source Sans 3", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 30,
            },
            h3: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 14,
            },
        }
    }
}

//Context for the color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {
    },
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return {colorMode, theme};
}
//
// import { createContext, useState, useMemo } from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
//
// // Define color tokens based on the mode
// const tokens = (mode) => ({
//     grey: {
//         ...(mode === "dark" ? {
//             100: "#e0e0e0",
//             200: "#c2c2c2",
//             300: "#a3a3a3",
//             400: "#858585",
//             500: "#666666",
//             600: "#525252",
//             700: "#3d3d3d",
//             800: "#292929",
//             900: "#141414"
//         } : {
//             100: "#141414",
//             200: "#292929",
//             300: "#3d3d3d",
//             400: "#525252",
//             500: "#666666",
//             600: "#858585",
//             700: "#a3a3a3",
//             800: "#c2c2c2",
//             900: "#e0e0e0"
//         }),
//     },
//     primary: {
//         ...(mode === "dark" ? {
//             100: "#d0d1d5",
//             200: "#a1a4ab",
//             300: "#727681",
//             400: "#1f2a40",
//             500: "#141b2d",
//             600: "#101624",
//             700: "#0c101b",
//             800: "#080b12",
//             900: "#040509"
//         } : {
//             100: "#040509",
//             200: "#080b12",
//             300: "#0c101b",
//             400: "#101624",
//             500: "#141b2d",
//             600: "#434957",
//             700: "#727681",
//             800: "#a1a4ab",
//             900: "#d0d1d5"
//         }),
//     },
//     greenAccent: {
//         ...(mode === "dark" ? {
//             100: "#dbf5ee",
//             200: "#b7ebde",
//             300: "#94e2cd",
//             400: "#70d8bd",
//             500: "#4cceac",
//             600: "#3da58a",
//             700: "#2e7c67",
//             800: "#1e5245",
//             900: "#0f2922"
//         } : {
//             100: "#0f2922",
//             200: "#1e5245",
//             300: "#2e7c67",
//             400: "#3da58a",
//             500: "#4cceac",
//             600: "#70d8bd",
//             700: "#94e2cd",
//             800: "#b7ebde",
//             900: "#dbf5ee"
//         }),
//     },
//     redAccent: {
//         ...(mode === "dark" ? {
//             100: "#f8dcdb",
//             200: "#f1b9b7",
//             300: "#e99592",
//             400: "#e2726e",
//             500: "#db4f4a",
//             600: "#af3f3b",
//             700: "#832f2c",
//             800: "#58201e",
//             900: "#2c100f"
//         } : {
//             100: "#2c100f",
//             200: "#58201e",
//             300: "#832f2c",
//             400: "#af3f3b",
//             500: "#db4f4a",
//             600: "#e2726e",
//             700: "#e99592",
//             800: "#f1b9b7",
//             900: "#f8dcdb"
//         }),
//     },
//     blueAccent: {
//         ...(mode === "dark" ? {
//             100: "#e1e2fe",
//             200: "#c3c6fd",
//             300: "#a4a9fc",
//             400: "#868dfb",
//             500: "#6870fa",
//             600: "#535ac8",
//             700: "#3e4396",
//             800: "#2a2d64",
//             900: "#151632"
//         } : {
//             100: "#151632",
//             200: "#2a2d64",
//             300: "#3e4396",
//             400: "#535ac8",
//             500: "#6870fa",
//             600: "#868dfb",
//             700: "#a4a9fc",
//             800: "#c3c6fd",
//             900: "#e1e2fe"
//         }),
//     },
// });
//
// const themeSettings = (mode) => {
//     const colors = tokens(mode);
//
//     return createTheme({
//         palette: {
//             mode,
//             primary: {
//                 main: colors.primary[500],
//                 ...(mode === 'dark' && { light: colors.primary[400], dark: colors.primary[700] }),
//             },
//             secondary: {
//                 main: colors.redAccent[500],
//             },
//             neutral: {
//                 dark: colors.grey[700],
//                 main: colors.grey[500],
//                 light: colors.grey[300],
//             },
//             background: {
//                 default: mode === 'dark' ? colors.primary[500] : '#fcfcfc',
//             }
//         },
//         typography: {
//             fontFamily: ["Source Sans 3", "sans-serif"].join(","),
//             fontSize: 12,
//             h1: { fontSize: 40 },
//             h2: { fontSize: 30 },
//             h3: { fontSize: 24 },
//             h4: { fontSize: 20 },
//             h5: { fontSize: 16 },
//             h6: { fontSize: 14 },
//         }
//     });
// };
//
// // Context to toggle color mode
// export const ColorModeContext = createContext({
//     toggleColorMode: () => {}
// });
//
// export const useMode = () => {
//     const [mode, setMode] = useState("dark");
//
//     const colorMode = useMemo(() => ({
//         toggleColorMode: () => {
//             setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
//         },
//     }), []);
//
//     const theme = useMemo(() => themeSettings(mode), [mode]);
//
//     return { colorMode, theme };
// };
//
// // Wrap your app with this provider
// export const ThemeProviderWrapper = ({ children }) => {
//     const { theme, colorMode } = useMode();
//
//     return (
//         <ColorModeContext.Provider value={colorMode}>
//             <ThemeProvider theme={theme}>
//                 {children}
//             </ThemeProvider>
//         </ColorModeContext.Provider>
//     );
// };
