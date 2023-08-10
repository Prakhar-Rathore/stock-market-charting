import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Paper } from '@mui/material';
import { Card, Grid, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";


import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Landing() {

    const [height, setHeight] = React.useState(window.innerHeight - 70);

    React.useEffect(() => {
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    const updateHeight = () => {
        setHeight(window.innerHeight - 70);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{
                background: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)",
                backgroundBlendMode: "overlay, difference, difference, exclusion, normal"
            }}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color="transparent" elevation={0} sx={{ background: 'transparent', boxShadow: 'none', border: "none", height: "70px" }}>
                        <Toolbar>
                            <Grid container style={{ marginTop: "10px", marginBottom: "10px" }}>
                                <Grid item xs={2} style={{ alignSelf: "center" }}>
                                    <Link to="/" style={{
                                        textDecoration: "none"
                                    }}>
                                        <Avatar
                                            src="https://cdn2.vectorstock.com/i/1000x1000/67/86/mobile-stock-market-business-logo-icon-design-vector-22926786.jpg"
                                            alt="logo"
                                            sx={{ width: 50, height: 50, alignSelf: "center" }}
                                        />
                                    </Link>
                                </Grid>
                                <Grid item xs={10} textAlign="end">
                                    <Link to="/login" style={{
                                        textDecoration: "none",
                                        color: "white",
                                        marginLeft: "20px"
                                    }}>
                                        <Button style={{
                                            background: "linear-gradient( 111.6deg, rgba(174,68,223,1) 27.3%, rgba(246,135,135,1) 112.7% )",
                                            borderRadius: "15px",
                                            padding: "15px",
                                            fontSize: "18px",
                                            minWidth: "15%"
                                        }}>
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/sign-up" style={{
                                        textDecoration: "none",
                                        color: "white",
                                        marginLeft: "20px"
                                    }}>
                                        <Button style={{
                                            background: "linear-gradient( 111.6deg, rgba(174,68,223,1) 27.3%, rgba(246,135,135,1) 112.7% )",
                                            borderRadius: "15px",
                                            padding: "15px",
                                            fontSize: "18px",
                                            minWidth: "15%"
                                        }}>
                                            Sign Up
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box minHeight={height}  style={{ width: "100%" }}>
                    <Grid minHeight={height} container style={{ width: "100%"}}>

                        <Grid item xs={12} display={{ xs: "block", md: "none" }} marginTop="15px">
                            <img src="background.png" alt="bgImage" style={{ width: "90%" }} />
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <CssBaseline />

                            <Paper sx={{
                                backgroundColor: "transparent",
                                elevation: "0",
                                border: "none",
                                background: "transparent",
                                boxShadow: "none",
                                align: "justify",
                                height: "100%",
                                justifyContent: "center",
                                display: "flex",
                                flexDirection: "column",
                                padding: "50px"
                            }} >
                                <Typography component="h1" variant="h2" alignSelf="flex-start" align="left" color="#49b8d9" fontFamily={"Georgia"}>
                                    WELCOME TO
                                </Typography>
                                <Typography component="h1" variant="h5" alignSelf="flex-start" align="left" fontFamily={"Georgia"}>
                                    STOCK MARKET CHARTING
                                </Typography>

                                <Typography component="h4" variant="h5" alignSelf="flex-start" align="left" fontFamily={"Georgia"}>
                                    <br />
                                    All the tools you need to make wise investment decisions.
                                </Typography>
                                <Typography component="h4" variant="h5" alignSelf="flex-start" align="left" fontFamily={"Georgia"}>
                                    Join smart investors now.
                                </Typography>
                                <Typography component="h4" variant="h5" alignSelf="flex-start" align="left" fontFamily={"Georgia"}>
                                    Login or Sign Up to access further details.
                                </Typography>
                            </Paper>

                        </Grid>

                        <Grid item xs={0} md={5} display={{ xs: "none", md: "block", alignSelf: "center" }}>
                            <img src="background.png" alt="bgImage" style={{ width: "90%", borderRadius: "8px" }} />
                        </Grid>

                    </Grid>

                </Box>
            </Box>
        </ThemeProvider>
    );
}
