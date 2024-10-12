import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Overview from "../../pages/global/Overview";

export default function AdminLayout() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <main
                className="content"
                style={{
                    flexGrow: 1,
                    marginLeft: '240px', // Match this with the sidebar width
                    overflowY: 'auto', // Allow vertical scrolling
                    height: '100vh', // Full height of the viewport
                }}
            >
                <Topbar />
                <Routes>
                    <Route path={'/'} element={<Overview />} />
                </Routes>
            </main>
        </div>
    );
}
