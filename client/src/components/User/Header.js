import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Grid, Tooltip, Menu, Button, List, ListItemText, Avatar, TextField, Autocomplete } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled, alpha, useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { Navigate, Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import BusinessIcon from "@mui/icons-material/Business";
import CompareIcon from "@mui/icons-material/Compare";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { routes } from "../../config/serverconfig";
import apiCall from "../../apiCall/apiCall";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DifferenceIcon from '@mui/icons-material/Difference';

const PROD_SERV_ADDRESS_API = routes.PROD_SERV_ADDRESS_API;

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
    background: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)",
    backgroundBlendMode: "overlay, difference, difference, exclusion, normal"
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export default function Header({ setCompanyData }) {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const { logout } = useAuth();

    const styles = theme => ({
        icon: {
            fill: 'white'
        }
    })

    // const [company, setCompany] = React.useState("");
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [idToken, setIdToken] = React.useState(null);
    const [isAdmin, setIsAdmin] = React.useState(false);

    const classes = styles;

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            var res = await logout();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        (async () => {
            const token = await auth.currentUser.getIdToken();
            setIdToken(token);
            const response = await apiCall(
                `${PROD_SERV_ADDRESS_API}/admin/isAdmin`,
                "GET",
                null,
                token
            );
            if (response.data.message === 'Admin') setIsAdmin(true)
        })();
    }, []);

    if (!auth.currentUser) {
        return <Navigate to="/" />;
    }
    else {
        return (
            <Box>
                <AppBar
                    position="fixed"
                    open={open}
                    sx={{
                        background: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)",
                        backgroundBlendMode: "overlay, difference, difference, exclusion, normal",
                        height: "64px"
                    }}
                >
                    <Toolbar style={{ paddingRight: 0 }}>
                        <Grid container>
                            <Grid item xs={1} display="flex">
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    sx={{
                                        ...(open && { display: "none" })
                                    }}
                                >
                                    <MenuIcon style={{ alignSelf: "center" }} />
                                </IconButton>
                                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    <Link to="/user-home" onClick={() => setCompanyData("")}>
                                        <IconButton>
                                            <Avatar
                                                src="https://cdn2.vectorstock.com/i/1000x1000/67/86/mobile-stock-market-business-logo-icon-design-vector-22926786.jpg"
                                                alt="logo"
                                                sx={{ ...(open && { display: "none" }) }}
                                            />
                                        </IconButton>
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item display="flex" flex={1} xs={10} alignItems="center" fontFamily="Segoe Script" justifyContent="center">
                                <div>Stock Market Charting</div>
                            </Grid>
                            <Grid item xs={1} style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Tooltip title="Open profile options">
                                    <IconButton
                                        size="large"
                                        color="inherit"
                                        aria-label="open profile options"
                                        sx={{ mr: 1, height: "100%" }}
                                        onClick={handleOpenUserMenu}
                                    >
                                        <AccountCircleIcon />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <Link to="/reset-pass" style={{ color: "inherit", textDecoration: "none" }}>
                                        <MenuItem key="forgotPass">
                                            Change Password
                                        </MenuItem>
                                    </Link>
                                    <MenuItem key="Logout" onClick={handleLogout}>
                                        <Button sx={{ color: "inherit", textTransform: "inherit", fontSize: '1rem', padding: '0' }}>Logout</Button>
                                    </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} PaperProps={{
                    sx: {
                        background: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)",
                        backgroundBlendMode: "overlay, difference, difference, exclusion, normal",
                        color: "white"
                    }
                }}>
                    <DrawerHeader>
                        <Link to="/user-home" style={{ position: "absolute", left: "10px" }}>
                            <IconButton>
                                <Avatar
                                    src="https://cdn2.vectorstock.com/i/1000x1000/67/86/mobile-stock-market-business-logo-icon-design-vector-22926786.jpg"
                                    alt="logo"
                                    sx={{ width: 56, height: 56 }}
                                />
                            </IconButton>
                        </Link>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: "white" }} /> : <ChevronLeftIcon style={{ color: "white" }} />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <ListItem key="search company" disablePadding sx={{ display: "block" }}>
                            <Link to="/user-home" style={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <Tooltip title="Search for a company">
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                            color: "white"
                                        }}
                                    >
                                        <SearchIcon />
                                    </ListItemIcon>
                                     </Tooltip>
                                    <ListItemText
                                        primary="Search company"
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem key="IPO Dashboard" disablePadding sx={{ display: "block" }}>
                            <Link to="/ipo-dashboard" style={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <Tooltip title="IPO dashboard">
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                            color: "white"
                                        }}
                                    >
                                        <BusinessIcon />
                                    </ListItemIcon>
                                    </Tooltip>
                                    <ListItemText
                                        primary="IPO Dashboard"
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem key="Compare" disablePadding sx={{ display: "block" }}>
                            <Link to="/compare" style={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 2.5,
                                    }}
                                >
                                       <Tooltip title="Company comparison">
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                            color: "white"
                                        }}
                                    >
                                        <CompareIcon />
                                    </ListItemIcon>
                                    </Tooltip>
                                    <ListItemText
                                        primary="Compare"
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem key="Sector Scan" disablePadding sx={{ display: "block" }}>
                            <Link to="/sector-scan" style={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 2.5,
                                    }}
                                >
                                       <Tooltip title="Sector scan">
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                            color: "white"
                                        }}
                                    >
                                        <DifferenceIcon />
                                    </ListItemIcon>
                                    </Tooltip>
                                    <ListItemText
                                        primary="Sector Scan"
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        {isAdmin && <ListItem key="Admin Dashboard" disablePadding sx={{ display: "block" }}>
                            <Link to="/manage-users" style={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 2.5,
                                    }}
                                >
                                       <Tooltip title="Admin dashboard">
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                            color: "white"
                                        }}
                                    >
                                        <AdminPanelSettingsIcon />
                                    </ListItemIcon>
                                    </Tooltip>
                                    <ListItemText
                                        primary="Admin Dashboard"
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>}
                    </List>
                    <Divider />
                </Drawer>
            </Box>
        );
    }
}