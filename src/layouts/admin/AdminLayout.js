import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import {Outlet, Route, Routes} from "react-router-dom";
import Overview from "../../pages/admin/Overview";
import { Box } from "@mui/material";
import ScheduleTrain from "../../pages/admin/ScheduleTrain";

export default function AdminLayout() {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <Box
                className="content"
                style={{
                    flexGrow: 1,
                    overflowY: 'auto', // Allow vertical scrolling
                }}
            >
                <Topbar />
                <Outlet />
            </Box>
        </Box>
    );
}
