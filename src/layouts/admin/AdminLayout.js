import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Overview from "../../pages/global/Overview";
import {Box} from "@mui/material";

export default function AdminLayout() {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <Box
                className="content"
                style={{
                    flexGrow: 1,
                    overflowY: 'auto', // Allow vertical scrolling
                    // height: '100vh', // Full height of the viewport
                }}
            >
                <Topbar />
                <Routes>
                    <Route path={'/'} element={<Overview />} />
                </Routes>
            </Box>
        </Box>
    );
}
