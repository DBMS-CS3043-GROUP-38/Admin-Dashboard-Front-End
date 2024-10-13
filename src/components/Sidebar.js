import {useState} from "react";
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
import {tokens} from "../theme";
import {Link} from "react-router-dom";
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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Engineering, TrainSharp} from "@mui/icons-material";
import RouteIcon from '@mui/icons-material/Route';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            component={<Link to={to}/>}
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Overview");

    return (
        <Box
            display="flex"
            sx={{
                zIndex: 1000, // Ensures the sidebar stays on top
            }}
        >
            <ProSidebar
                rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                        padding: "5px 5px 5px 5px",
                    },
                }}
                backgroundColor={colors.primary["400"]}
            >
                <Box
                    padding={2}
                >
                    <Typography
                        variant="h3"
                        style={{color: colors.purpleAccent["300"]}}
                    >
                        Dashboard
                    </Typography>
                </Box>
                <Menu
                    iconShape="square"
                    menuItemStyles={{
                        button: ({active}) => {
                            return {
                                backgroundColor: active ? colors.purpleAccent["800"] : undefined,
                                borderRadius: "10px",
                                [`&:hover`]: {
                                    backgroundColor: colors.purpleAccent["600"],
                                    borderRadius: "10px",
                                },
                            };
                        },
                        subMenuContent: {
                            backgroundColor: colors.primary["400"],
                            borderRadius: "10px",
                        },
                    }}
                >
                    <Item
                        title="Overview"
                        to="./"
                        icon={<AppsIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <SubMenu
                        icon={<ScheduleIcon/>}
                        label="Schedule and Dispatch"
                        defaultOpen={true}
                    >
                        <Item
                            title="Schedule trains"
                            to="schedule-trains"
                            icon={<TrainIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Schedule orders"
                            to="schedule-orders"
                            icon={<ShoppingCartCheckoutIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </SubMenu>
                    <Item
                        title="Sales Reports"
                        to="sales-reports"
                        icon={<AssessmentIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Scheduled Orders"
                        to="trains"
                        icon={<TrainSharp/>}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <Item
                        title="Orders"
                        to="orders"
                        icon={<AllInboxIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />


                    <Item
                        title="Stores"
                        to="stores"
                        icon={<StoreIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Managers"
                        to="managers"
                        icon={<Engineering/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Customers"
                        to="customers"
                        icon={<PeopleIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Drivers"
                        to="drivers"
                        icon={<DriveEtaIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Assistants"
                        to="assistants"
                        icon={<PersonIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Trucks"
                        to="trucks"
                        icon={<LocalShippingIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Routes"
                        to="routes"
                        icon={<RouteIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Report Order"
                        to="report-order"
                        icon={<ProductionQuantityLimitsIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Menu>
            </ProSidebar>
        </Box>
    );
};

const given = () => {
    return (
        <div style={{display: 'flex', height: '100%'}}>
            <ProSidebar>
                <Menu
                    menuItemStyles={{
                        button: ({level, active, disabled}) => {
                            // only apply styles on first level elements of the tree
                            if (level === 0)
                                return {
                                    color: disabled ? '#f5d9ff' : '#d359ff',
                                    backgroundColor: active ? '#eecef9' : undefined,
                                };
                        },
                    }}
                >
                    <SubMenu defaultOpen label="Charts" icon={<StoreIcon name="bar-chart"/>}>
                        <MenuItem> Pie charts</MenuItem>
                        <MenuItem> Line charts</MenuItem>
                        <MenuItem> Bar charts</MenuItem>
                    </SubMenu>
                    <MenuItem active={false} icon={<StoreIcon name="calendar"/>}>
                        Calendar (active)
                    </MenuItem>
                    <MenuItem disabled icon={<StoreIcon name="shopping-cart"/>}>
                        E-commerce (disabled)
                    </MenuItem>
                    <MenuItem icon={<StoreIcon name="service"/>}> Examples</MenuItem>
                    <MenuItem icon={<ExitToAppIcon/>}> Dispatch</MenuItem>
                </Menu>
            </ProSidebar>
        </div>
    );
}

export default Sidebar;