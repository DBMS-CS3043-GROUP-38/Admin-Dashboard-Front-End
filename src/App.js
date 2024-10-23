import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import ManagerLayout from "./layouts/manager/ManagerLayout";

import OverviewM from "./pages/manager/Overview";
import ScheduleTrainM from "./pages/manager/ScheduleTrain";
import BundleOrdersM from "./pages/manager/BundleOrders";
import OrdersM from "./pages/manager/Orders";
import SalesReportM from "./pages/manager/SalesReport";
import StoresM from "./pages/manager/Stores";
import DriversM from "./pages/manager/Drivers";
import AssistantsM from "./pages/manager/Assistants";
import RoutesPathM from "./pages/manager/Routes";
import TrucksM from "./pages/manager/Trucks";
import ReportOrderM from "./pages/manager/ReportOrder";
import TrainsM from "./pages/manager/Trains";
import Receive from "./pages/manager/Receive";
import Admins from "./pages/manager/Admins";
import Shipments from "./pages/manager/Shipments";


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

                                <Route path="/manager" element={<PrivateRoute allowedRoles={['StoreManager']}/>}>
                                    <Route path="" element={<ManagerLayout/>}>
                                        <Route index element={<OverviewM/>}/>
                                        <Route path="schedule-trains" element={<ScheduleTrainM/>}/>
                                        <Route path='bundle-orders' element={<BundleOrdersM/>}/>
                                        <Route path='orders' element={<OrdersM/>}/>
                                        <Route path='sales-reports' element={<SalesReportM/>}/>
                                        <Route path='receive' element={<Receive/>}/>
                                        <Route path='stores' element={<StoresM/>}/>
                                        <Route path='drivers' element={<DriversM/>}/>
                                        <Route path='assistants' element={<AssistantsM/>}/>
                                        <Route path='trucks' element={<TrucksM/>}/>
                                        <Route path='routes' element={<RoutesPathM/>}/>
                                        <Route path='report-order' element={<ReportOrderM/>}/>
                                        <Route path='admins' element={<Admins/>}/>
                                        <Route path='trains' element={<TrainsM/>}/>
                                        <Route path='shipments' element={<Shipments/>}/>
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