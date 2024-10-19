import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import AdminLayout from "./layouts/admin/AdminLayout";
import Overview from "./pages/admin/Overview";
import ScheduleTrain from "./pages/admin/ScheduleTrain";
import ScheduleOrders from "./pages/admin/ScheduleOrders";
import Orders from "./pages/admin/Orders";
import SalesReport from "./pages/admin/SalesReport";
import Dispatch from "./pages/admin/Dispatch";
import Stores from "./pages/admin/Stores";
import Drivers from "./pages/admin/Drivers";
import Assistants from "./pages/admin/Assistants";
import RoutesPath from "./pages/admin/Routes";
import Customers from "./pages/admin/Customers";
import Trucks from "./pages/admin/Trucks";
import ReportOrder from "./pages/admin/ReportOrder";
import Managers from "./pages/admin/Managers";
import Trains from "./pages/admin/Trains";
import LoginPage from "./pages/global/Login";
import LogoutPage from "./pages/global/Logout";
import {AuthProvider} from "./contexts/AuthContext"; // Import the AuthProvider context
import PrivateRoute from "./contexts/PrivateRoute"; // Import the PrivateRoute component
import UnauthorizedPage from "./pages/global/UnAuthorised";
import HomePage from "./pages/global/Home";
import NotFoundPage from "./pages/global/NotFoundPage";
import DataBaseError from "./pages/global/DataBaseError";

function App() {
    const {theme, colorMode} = useMode();


    return (
            <AuthProvider>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <BrowserRouter>
                            <Routes>

                                {/* Public routes */}
                                <Route path="/auth/login" element={<LoginPage/>}/>
                                <Route path="/auth/logout" element={<LogoutPage/>}/>

                                {/* Private Admin routes */}
                                <Route path="/admin" element={<PrivateRoute allowedRoles={['Admin']}/>}>
                                    <Route path="" element={<AdminLayout/>}>
                                        <Route index element={<Overview/>}/>
                                        <Route path="schedule-trains" element={<ScheduleTrain/>}/>
                                        <Route path='schedule-orders' element={<ScheduleOrders/>}/>
                                        <Route path='orders' element={<Orders/>}/>
                                        <Route path='sales-reports' element={<SalesReport/>}/>
                                        <Route path='dispatch' element={<Dispatch/>}/>
                                        <Route path='stores' element={<Stores/>}/>
                                        <Route path='drivers' element={<Drivers/>}/>
                                        <Route path='assistants' element={<Assistants/>}/>
                                        <Route path='customers' element={<Customers/>}/>
                                        <Route path='trucks' element={<Trucks/>}/>
                                        <Route path='routes' element={<RoutesPath/>}/>
                                        <Route path='report-order' element={<ReportOrder/>}/>
                                        <Route path='managers' element={<Managers/>}/>
                                        <Route path='trains' element={<Trains/>}/>
                                    </Route>
                                </Route>

                                {/* Unauthorized page */}
                                <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
                                <Route path="/database-error" element={<DataBaseError/>}/>

                                {/* Default route */}
                                <Route path="/" element={<HomePage/>}/>

                                {/* 404 Not Found page - this should be the last route */}
                                <Route path="*" element={<NotFoundPage/>}/>
                            </Routes>
                        </BrowserRouter>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </AuthProvider>
    );
}

export default App;