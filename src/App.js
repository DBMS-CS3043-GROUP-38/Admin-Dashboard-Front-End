import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout";

function App() {
    const { theme, colorMode } = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        {/* Main route */}
                        <Route path="/" element={<h1>Hello</h1>} />

                        {/* Admin route with wildcard to handle nested routes */}
                        <Route path="/admin/*" element={<AdminLayout />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
