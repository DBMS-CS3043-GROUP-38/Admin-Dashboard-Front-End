import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout";
import Overview from "./pages/admin/Overview";
import ScheduleTrain from "./pages/admin/ScheduleTrain";
import ScheduleOrders from "./pages/admin/ScheduleOrders";
import Orders from "./pages/admin/Orders";

function App() {
    const {theme, colorMode} = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <Routes>
                        {/* Main route */}
                        <Route path="/" element={<h1>Hello</h1>}/>

                        <Route path="/admin" element={<AdminLayout/>}>
                            <Route index element={<Overview/>}/>
                            <Route path="schedule-trains" element={<ScheduleTrain/>}/>
                            <Route path='schedule-orders' element={<ScheduleOrders/>}/>
                            <Route path='orders' element={<Orders/>}/>
                        < /Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
