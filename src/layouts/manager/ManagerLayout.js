import Topbar from "../../components/Topbar";
import Sidebar from "../../components/SidebarManager";
import {Outlet} from "react-router-dom";
import { Box } from "@mui/material";

export default function ManagerLayout() {
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