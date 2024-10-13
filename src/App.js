import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout";
import Overview from "./pages/admin/Overview";
import ScheduleTrain from "./pages/admin/ScheduleTrain";
import ScheduleOrders from "./pages/admin/ScheduleOrders";
import Orders from "./pages/admin/Orders";
import SalesReport from "./pages/admin/SalesReport";
import ScheduledOrders from "./pages/admin/ScheduledOrders";
import Stores from "./pages/admin/Stores";
import Drivers from "./pages/admin/Drivers";
import Assistants from "./pages/admin/Assistants";
import Customers from "./pages/admin/Customers";
import Trucks from "./pages/admin/Trucks";
import RoutePath from "./pages/admin/Routes";
import Logout from "./pages/global/Logout";
import LoginPage from "./pages/global/Login";
import ReportOrder from "./pages/admin/ReportOrder";
import Managers from "./pages/admin/Managers";

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

                        <Route path={'/auth'}>
                            <Route path={'logout'} element={<Logout/>}/>
                            <Route path={'login'} element={<LoginPage/>}/>
                        </Route>

                        <Route path="/admin" element={<AdminLayout/>}>
                            <Route index element={<Overview/>}/>
                            <Route path="schedule-trains" element={<ScheduleTrain/>}/>
                            <Route path='schedule-orders' element={<ScheduleOrders/>}/>
                            <Route path='orders' element={<Orders/>}/>
                            <Route path='sales-reports' element={<SalesReport/>}/>
                            <Route path='trains' element={<ScheduledOrders/>}/>
                            <Route path='stores' element={<Stores/>}/>
                            <Route path='drivers' element={<Drivers/>}/>
                            <Route path='assistants' element={<Assistants/>}/>
                            <Route path='customers' element={<Customers/>}/>
                            <Route path='trucks' element={<Trucks/>}/>
                            <Route path='routes' element={<RoutePath/>}/>
                            <Route path='report-order' element={<ReportOrder/>}/>
                            <Route path='managers' element={<Managers/>}/>
                        </Route>

                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
);
}

export default App;
