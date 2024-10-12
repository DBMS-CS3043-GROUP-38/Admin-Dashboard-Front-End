import {Box} from "@mui/material";
import Header from '../../components/Header';
import {Outlet} from "react-router-dom";

const PageLayout = ({heading, subHeading}) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            overflowY="auto" // Allow scrolling if content overflows>
            p={2}
        >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={heading} subtitle={subHeading}/>
            </Box>
            {/* Main content passed between tags*/}
            < Outlet />
        </Box>
    );
}

export default PageLayout;