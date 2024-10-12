import { useState } from "react";
import {
    Sidebar as ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    sidebarClasses,
} from "react-pro-sidebar";
import {
    Box,
    Typography,
    useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { Link } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TrainIcon from "@mui/icons-material/Train";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import AssessmentIcon from "@mui/icons-material/Assessment";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import DriveEtaIcon from '@mui/icons-material/DriveEta';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem
                active={selected === title}
                style={{
                    color: colors.grey[100],
                }}
                onClick={() => setSelected(title)}
                icon={icon}
            >
                <Typography>{title}</Typography>
            </MenuItem>
        </Link>
    );
};


const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Overview");

    return (
        <Box
            display="flex"
            height="100vh" // Ensure the sidebar takes the full height of the viewport
            position="fixed" // Fix the sidebar
            sx={{
                zIndex: 1000, // Ensures the sidebar stays on top
            }}
        >
            <ProSidebar
                rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                        backgroundColor: colors.primary["400"],
                        padding: "5px 10px 5px 10px",
                    },
                }}
            >
                <Menu
                    iconShape="square"
                    menuItemStyles={{
                        button: {
                            backgroundColor: colors.primary["400"],
                            borderRadius: "10px",
                            [`&.active`]: {
                                backgroundColor: colors.primary["400"],
                            },
                            [`&:hover`]: {
                                backgroundColor: colors.purpleAccent["600"],
                                borderRadius: "10px",
                            },
                        },
                        subMenuContent: {
                            backgroundColor: colors.primary["400"],
                            borderRadius: "10px",
                        },
                    }}
                >
                    <MenuItem
                        style={{
                            margin: "10px 0px 10px 0",
                            color: colors.grey["100"],
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography
                                variant="h3"
                                style={{ color: colors.grey["100"] }}
                            >
                                Dashboard
                            </Typography>
                        </Box>
                    </MenuItem>
                    <Item
                        title="Overview"
                        to="/adminadmin"
                        icon={<AppsIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <SubMenu
                        icon={<ScheduleIcon />}
                        label="Schedule"
                        defaultOpen={true}
                    >
                        <Item
                            title="Schedule trains"
                            to="schedule-train"
                            icon={<TrainIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Schedule orders"
                            to="schedule-orders"
                            icon={<ShoppingCartCheckoutIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </SubMenu>
                    <Item
                        title="Orders"
                        to="orders"
                        icon={<AllInboxIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Sales Reports"
                        to="sales-reports"
                        icon={<AssessmentIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Stores"
                        to="stores"
                        icon={<StoreIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Customers"
                        to="customers"
                        icon={<PeopleIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Drivers"
                        to="drivers"
                        icon={<DriveEtaIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Assistants"
                        to="assistants"
                        icon={<PersonIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Trucks"
                        to="trucks"
                        icon={<LocalShippingIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
