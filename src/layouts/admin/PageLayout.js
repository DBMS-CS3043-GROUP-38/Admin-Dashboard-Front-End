import {Box} from "@mui/material";
import Header from '../../components/Header';

const PageLayout = ({heading, subHeading, children}) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            p={2}
        >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={heading} subtitle={subHeading}/>
            </Box>
            <Box sx={{flexGrow: 1}}>
            {/* Main content passed between tags*/}
            {children}
            </Box>
        </Box>
    );
}

export default PageLayout;