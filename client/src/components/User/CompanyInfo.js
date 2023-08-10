import React, { useState } from 'react';
import { Box, Paper, Divider, List, ListItemText, Stack, Grid, Typography, ListItem, Slider, Autocomplete, InputBase, TableContainer, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import Button from "@mui/material/Button";
import { experimentalStyled as styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ChaletIcon from '@mui/icons-material/Chalet';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Tooltip from '@mui/material/Tooltip';
import CssBaseline from "@mui/material/CssBaseline";
import CompanyChart from './companyChart'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
const themeLight = createTheme({
    palette: {
        background: {
            default: "#FFFFFF"
 
        },
        text: {
            primary: "#000000"
        },
        mode: "light"
    },
    typography: {
        body1: {
            fontWeight: 600,
            fontSize: 20,
        },
        body2:
        {
            fontWeight: 500,
            fontSize: 20,
        }
        ,
        body3:
        {
            fontWeight: 700,
            fontSize: 30,
        }, body4:
        {
            fontWeight: 600,
            fontSize: 25,
        },

    },


});

const themeDark = createTheme({
    palette: {
        background: {
            default: "#2e325f"
        },
        text: {
            primary: "#ffffff"
        },
        mode: 'dark',
    },


    typography: {
        body1: {
            fontWeight: 600,
            fontSize: 20,

        },
        body2:
        {
            fontWeight: 500,
            fontSize: 20,
        },
        body3:
        {
            fontWeight: 700,
            fontSize: 30,
        },
        body4:
        {
            fontWeight: 600,
            fontSize: 25,
        }


    },


});

export default function CompanyInfo({ companyData, companyOverview, chartData, color, fetchCompanyData, allCompanies, stats, Datamsg, OverviewMsg, statsMsg }) {
    const [light, setLight] = React.useState(true);
    const [tabValue, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [readMore, setReadMore] = useState(false);
    const abtCompany = Object.keys(companyData).length !== 0 && companyData.about;
    const link = <a className="read-more-link" style={{
        color: "blue", textDecoration: "underline",
        letterSpacing: "1px", cursor: "pointer"
    }} onClick={() => { setReadMore(!readMore) }}>Read more</a>;
    const value = readMore ? abtCompany.slice(400, abtCompany.length) : link;
    return (
        <ThemeProvider theme={light ? themeDark : themeLight}>

            <main style={{ marginLeft: "5px", marginRight: "5px", marginTop: "0px", marginBottom: "0px" }}>
                <Box
                    sx={{ flexGrow: 1, alignItems: "baseline" }}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end">
                    <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={8} marginRight={1} mt={0} mb="5px" width='100%'>

                        <SearchIcon style={{ coSelf: "center", margin: "5px" }} />
                        <Autocomplete
                            id="input"
                            options={allCompanies}
                            renderInput={(params) => {
                                const { InputLabelProps, InputProps, ...rest } = params;
                                return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%" }} {...params.InputProps} {...rest} />
                            }}
                            onChange={(event, value) => fetchCompanyData(value)}
                            color="primary"
                            style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "10px" }}
                            defaultValue={companyData.name}
                        />

                    </Grid>
                    <Tooltip title="toggle between light and dark mode">
                        <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
                    </Tooltip>
                </Box>

                <CssBaseline />
                <div style={{ padding: "10px" }}></div>




                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                    variant="fullWidth"
                    centered
                    sx={{ borderBottom: "1px solid white" }}
                >
                    <Tab label="Profile" />
                    <Tab label="Performance" />
                    <Tab label="Chart" />
                    <Tab label="Statistics" />
                </Tabs>
                {Datamsg === "" ?
                    <TabPanel value={tabValue} index={0}>
                        <Grid item id="about" sx={{ bgcolor: "#171834", boxShadow: 5, zIndex: "10", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)", borderRadius: "10px" }}>
                            <Grid sx={{ borderBottom: "1px solid rgba(0,0,0,0.5)" }}>
                                <Typography variant="h1" fontWeight="600" padding="10px" margin="15px" fontSize="22px" align="center">
                                    {companyData.name}
                                    <span style={{ color: color, marginLeft: "20px", fontWeight: "600" }} >{companyData.changepct ? companyData.changepct.toFixed(2) : companyData.changepct}%</span>
                                    {companyData.changepct > 0 ? <ArrowUpwardIcon style={{ color: "green", height: "100%" }} /> : <ArrowDownwardIcon fontSize="medium" style={{ color: "red", height: "100%" }} />}
                                </Typography></Grid >
                            <div style={{ padding: "10px" }}></div>
                            <Typography variant='body2' align="left" style={{ marginLeft: "15px", width: "95%", fontSize: "85%" }}>
                                {abtCompany.slice(0, 400)}
                                {value}
                            </Typography>
                            <div style={{ padding: "10px" }}></div>
                        </Grid>
                        <Grid item id="general-information" sx={{ backgroundColor: "#171834", zIndex: "10", boxShadow: 5, borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)", borderRadius: "10px" }}>
                            <Grid sx={{ borderBottom: "1px solid rgba(0,0,0,0.5)" }}>
                                <Typography variant="h4" fontWeight="600" paddingTop="10px" margin="15px" marginTop="8px" fontSize="22px" align="center">General Information</Typography></Grid>
                            <Grid container>
                                <Grid container>
                                    <Grid item xs={6} style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}>
                                        <Grid item xs={12} style={{ margin: "10px", textAlign: "left", fontSize: "85%" }}>
                                            <span style={{ margin: "5px", color: "#7c7e8c" }}>CEO</span>
                                            <span style={{ fontWeight: "600", margin: "5px", float: "right" }}>{companyData.ceo}</span>
                                        </Grid>
                                        <Grid item xs={12} style={{ margin: "10px", textAlign: "left", fontSize: "85%" }}>
                                            <span style={{ margin: "5px", color: "#7c7e8c" }}>Founded</span>
                                            <span style={{ fontWeight: "600", margin: "5px", float: "right" }}>{companyData.founded}</span>
                                        </Grid>
                                        <Grid item xs={12} style={{ margin: "10px", textAlign: "left", fontSize: "85%" }}>
                                            <span style={{ margin: "5px", color: "#7c7e8c" }}>Headquarters</span>
                                            <span style={{ fontWeight: "600", margin: "5px", float: "right" }}>{companyData.hq}</span>
                                        </Grid>

                                    </Grid>


                                    <Grid item xs={6}>
                                        <Grid item xs={12} style={{ margin: "10px", textAlign: "left", marginTop: "15px", fontSize: "85%" }}>
                                            <span style={{ margin: "5px", color: "#7c7e8c" }}>Industry</span>
                                            <span style={{ fontWeight: "600", margin: "5px", float: "right" }}>{companyData.industry}</span>
                                        </Grid>
                                        <Grid item xs={12} style={{ margin: "10px", textAlign: "left", fontSize: "85%" }}>
                                            <span style={{ margin: "5px", color: "#7c7e8c" }}>Sector</span>
                                            <span style={{ fontWeight: "600", margin: "5px", float: "right" }}>{companyData.sector}</span>
                                        </Grid>
                                    </Grid>
                                </Grid>


                            </Grid>
                        </Grid>
                        <Grid item id="key-executives" sx={{ backgroundColor: "#171834", boxShadow: 5, zIndex: "10", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)", borderRadius: "10px" }}>
                            <Grid sx={{ borderBottom: "1px solid rgba(0,0,0,0.5)" }}>
                                <Typography variant="h1" fontWeight="600" paddingTop="10px" margin="15px" fontSize="22px" align="center">
                                    Key Executives </Typography></Grid >
                            <Grid container>
                                <Grid item xs={6} style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}>
                                    {companyData.boardMembers && companyData.boardMembers.map((boardMember, index) => {
                                        if (index < companyData.boardMembers.length / 2)
                                            return (
                                                <Grid key={index} item xs={12} style={{ margin: "10px", textAlign: "left" }}>
                                                    <Typography variant='body2' style={{ fontSize: "85%", margin: "5px" }}>{boardMember}</Typography>
                                                </Grid>
                                            )
                                    })}
                                </Grid>
                                <Grid item xs={6}>
                                    {companyData.boardMembers && companyData.boardMembers.map((boardMember, index) => {
                                        if (index >= companyData.boardMembers.length / 2)
                                            return (
                                                <Grid key={index} item xs={12} style={{ margin: "10px", textAlign: "left" }}>
                                                    <Typography variant='body2' style={{ fontSize: "85%", margin: "5px" }}>{boardMember}</Typography>
                                                </Grid>
                                            )
                                    })}
                                </Grid>

                            </Grid>
                        </Grid>
                    </TabPanel>
                    : <div>{Datamsg}</div>}
 
                <TabPanel value={tabValue} index={1}>
                    {OverviewMsg === "" && Object.keys(companyOverview).length !== 0 ?
 
                        <h1>
                            <Box sx={{ flexGrow: 1 }} display="flex"
                                justifyContent="center"
                                alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                                <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 20 }} display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    width={'100%'}
                                    maxWidth='100%'>
 
                                    <Grid item id="performance">
 
                                        {/* <Grid sx={{ boxShadow: 5, borderBottom: 1, borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                                            <Typography variant="h4" fontWeight="600" paddingBottom="10px" paddingTop="10px" margin="15px" fontSize="22px" align="center" >Performance</Typography>
                                            </Grid> */}
                                        <div style={{ padding: "15px" }}></div>
                                        <Grid item xs={2} sm={8} md={6} lg={20} >
                                            <Grid container fontSize="85%">
 
                                                <Grid container>
                                                    <Grid item xs={4} style={{ marginBottom: "10px", textAlign: "left" }} >
                                                        <Typography variant='body3'>Today's Low</Typography>
                                                        <Grid> {companyOverview.low}</Grid>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Slider valueLabelDisplay="auto" min={companyOverview.low} max={companyOverview.high} value={companyOverview.priceclose ? companyOverview.priceclose : 0} />
                                                    </Grid>
                                                    <Grid item xs={4} style={{ marginBottom: "10px", textAlign: "right" }}>
                                                        <Typography variant='body3'>Today's High</Typography>
                                                        <Grid >{companyOverview.high}</Grid>
                                                    </Grid>
                                                </Grid>
 
 
 
                                                <Grid container style={{ borderBottom: "1px dashed rgba(124, 126, 140, 0.5)" }}>
                                                    <Grid item xs={4} style={{ marginTop: "4px", marginBottom: "15px", textAlign: "left" }}>
                                                        <Typography variant='body3'>52W Low</Typography>
                                                        <Grid>{companyOverview.low52} </Grid>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Slider valueLabelDisplay="auto" min={companyOverview.low52} max={companyOverview.high52} value={companyOverview.priceclose ? companyOverview.priceclose : 0} />
                                                    </Grid>
                                                    <Grid item xs={4} style={{ marginTop: "4px", marginBottom: "15px", textAlign: "right" }}>
                                                        <Typography variant='body3'>52W High</Typography>
                                                        <Grid>{companyOverview.high52}</Grid>
                                                    </Grid>
                                                </Grid>
 
 
 
                                                <Grid container style={{ marginTop: "15px" }}>
                                                    <Grid item xs={4}>
                                                        <Typography variant='body3'>Open Price</Typography>
                                                        <Grid>{companyOverview['price open']}</Grid>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant='body3'>Close Price</Typography>
                                                        <Grid>{companyOverview.priceclose ? companyOverview.priceclose.toFixed(2) : companyOverview.priceclose}</Grid>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant='body3'>Volume</Typography>
                                                        <Grid>{companyOverview.volume >= 1000000000000 ? Math.round(companyOverview.volume / 1000000000000) + ' T' : companyOverview.volume >= 1000000000 ? companyOverview.volume / 1000000000 + ' B' : companyOverview.volume >= 1000000 ? Math.round(companyOverview.volume / 1000000) + ' M' : companyOverview.volume}</Grid>
                                                    </Grid>
                                                </Grid>
 
 
 
                                            </Grid>
                                        </Grid>
                                    </Grid>
 
                                </Grid>
 
                            </Box>
                        </h1>
                        : OverviewMsg !== "" ? <div>{OverviewMsg}</div> : <div>No recent data for the company </div>}
                </TabPanel>





                <TabPanel value={tabValue} index={2}>
 
                    {/* <Grid sx={{ bgcolor: "linear-gradient( 111.6deg, rgba(174,68,223,1) 27.3%, rgba(246,135,135,1) 112.7% )", boxShadow: 5, borderBottom: 1, borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                        <Typography variant="h1" fontWeight="600"margin="15px" fontSize="22px" align="center" >
                        </Typography></Grid > */}
                    <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        // width="1100px"
                        // height="700px"
                        alignItems="center" marginLeft={4} marginRight={1} mt={0}>
                        <Grid container
                        spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 12 }}
                        display="flex"
                            justifyContent="center"
                            alignItems="center"
                        //     width="1100px"
                        // height="700px"
                        >
 
                            <Grid item xs={12}>
 
                                {chartData ? <CompanyChart dataset={chartData} companyName={companyData.name} /> : <div> Loading chart...</div>}
 
                            </Grid>
 
                            <Grid item xs={2} sm={8} md={6} lg={12} >
 
                                {/* <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer> */}
                            </Grid>
                        </Grid>
 
                    </Box>
 
 
                </TabPanel>


                {statsMsg === "" ?
                    <TabPanel value={tabValue} index={3}>

                        {/* <Grid sx={{ boxShadow: 5, borderBottom: 1, borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                            <Typography variant="h4" fontWeight="600" paddingBottom="10px" paddingTop="10px" margin="15px" fontSize="22px" align="center">Statistics</Typography>
                        </Grid> */}
                        {/* <div style={{ padding: "10px" }}></div> */}





                        <Box sx={{ flexGrow: 1 }} display="flex"
                            justifyContent="center"
                            alignItems="center">
                            <Grid container spacing={{ xs: 1, md: 2, lg: 0 }} columns={{ xs: 2, sm: 2, md: 12, lg: 16 }} display="flex"
                                justifyContent="center"
                                alignItems="center" >

                                <Grid item xs={2} sm={4} md={6} lg={7.3} >
                                    <Grid sx={{ borderRadius: "10px", boxShadow: 5, backgroundColor: "#171834", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                                    <Grid float='left'><Typography variant="body1" paddingTop="10px">Valuation Measures </Typography></Grid>

                                    {/* <div style={{ padding: "10px" }}></div> */}

                                    <Box sx={{ flexGrow: 3 }} display="flex"
                                        justifyContent="center"
                                        alignItems="center" marginLeft={0} marginRight={1} mt={2.5}>
                                        <Grid container spacing={{ xs: 1, md: 1, lg: 2 }} columns={{ xs: 0.3, sm: 0.3, md: 12, lg: 16 }} display="flex"
                                            justifyContent="center"
                                            alignItems="center" >
                                            <TableContainer style={{ width: 600, padding: "10px 0" }}>
                                                <Table
                                                    sx={{
                                                        alignItems: "center",
                                                        display: ""
                                                    }}
                                                >
                                                    <TableBody>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Market Cap</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {companyOverview.marketcap}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> P/E Ratio</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{companyOverview.pe}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> P/B Ratio</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{companyOverview.pb}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> Sector PE</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{companyOverview.sectorpe}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Div. Yield</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{companyOverview.divyield}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Book Value</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{companyOverview.bookval}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Face Value</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{companyOverview.faceval}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid></Box>
                                    </Grid>
                                    <Grid style={{ marginTop: "10px" }}><Typography variant="h4">Financial Highlights </Typography></Grid>

                                    <Box sx={{ flexGrow: 3 }} display="flex"
                                        justifyContent="center"
                                        alignItems="center" marginLeft={0} marginRight={1} mt={2.5}>
                                        <Grid container spacing={{ xs: 1, md: 1, lg: 0 }} columns={{ xs: 0.3, sm: 0.3, md: 12, lg: 16 }} display="flex"
                                            justifyContent="center"
                                            alignItems="center" >
                                            {/* <div style={{ padding: "10px" }}></div>
                                            <div style={{ padding: "10px" }}></div> */}

                                            <Grid sx={{ borderRadius: "10px", boxShadow: 5, padding: "10px", backgroundColor: "#171834", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                                            <Grid ><Typography variant="body1">Fiscal Year </Typography></Grid>
                                            <TableContainer style={{ width: 600, padding: "10px 0" }}>
                                                <Table
                                                    sx={{
                                                        alignItems: "center",
                                                        display: ""
                                                    }}
                                                >
                                                    {stats?.['Financial Highlights']?.['Fiscal Year'] ? <TableBody>
                                                        <TableRow hover >
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> Fiscal Year Ends</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> Most Recent Quarter (mrq)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)']}</TableCell>
                                                        </TableRow>
                                                    </TableBody> : "Loading..."}
                                                </Table>
                                            </TableContainer>
                                            </Grid>
                                            <Grid sx={{ borderRadius: "10px", boxShadow: 5, padding: "10px", marginTop: "10px", backgroundColor: "#171834", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                                            <Grid ><Typography variant="body1">Profitability </Typography></Grid>

                                            <TableContainer style={{ width: 600, padding: "10px 0" }}>
                                                <Table
                                                    sx={{
                                                        alignItems: "center",
                                                        display: ""
                                                    }}
                                                >
                                                    {stats?.['Financial Highlights']?.['Profitability'] ? <TableBody>
                                                        <TableRow hover>

                                                            <TableCell sx={{ fontSize: 17 }} align="left">Operating Margin (ttm)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Profitability']['Operating Margin (ttm)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> Profit Margin</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Profitability']['Profit Margin']}</TableCell>
                                                        </TableRow>


                                                    </TableBody> : "Loading..."}

                                                </Table>
                                            </TableContainer>
                                            </Grid>
                                            <Grid sx={{ borderRadius: "10px", boxShadow: 5, padding: "10px", marginTop: "10px", backgroundColor: "#171834", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                                            <Grid ><Typography variant="body1">Management Effectiveness</Typography></Grid>

                                            <TableContainer style={{ width: 600, padding: "10px 0" }}>
                                                <Table
                                                    sx={{
                                                        alignItems: "center",
                                                        display: ""
                                                    }}
                                                >
                                                    {stats?.['Financial Highlights']?.['Management Effectiveness'] ? <TableBody>
                                                        <TableRow hover>

                                                            <TableCell sx={{ fontSize: 17 }} align="left">Return on Assets (ttm)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> Return on Equity (ttm)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']}</TableCell>
                                                        </TableRow>


                                                    </TableBody> : <div>Loading...</div>}

                                                </Table>
                                            </TableContainer>
                                            </Grid>
                                            <Grid sx={{ borderRadius: "10px", boxShadow: 5, padding: "10px", marginTop: "10px", backgroundColor: "#171834", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                                            <Grid ><Typography variant="body1">Income Statement </Typography></Grid>

                                            <TableContainer style={{ width: 600, padding: "10px 0" }}>
                                                <Table sx={{ alignItems: "center", display: "" }}>
                                                    {stats?.['Financial Highlights']?.['Income Statement'] ? <TableBody>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Diluted EPS (ttm)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Income Statement']['Diluted EPS (ttm)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> EBITDA</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Income Statement']['EBITDA'] === null ? 'N/A' : stats['Financial Highlights']['Income Statement']['EBITDA']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Gross Profit (ttm)</TableCell>
                                                            <   TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Income Statement']['Gross Profit (ttm)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Net Income Avi to Common (ttm)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Income Statement']['Net Income Avi to Common (ttm)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Quarterly Earnings Growth (yoy)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Income Statement']['Quarterly Earnings Growth (yoy)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Quarterly Revenue Growth (yoy)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Revenue (ttm)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Income Statement']['Revenue (ttm)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Revenue Per Share (ttm)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Income Statement']['Revenue Per Share (ttm)']}</TableCell>
                                                        </TableRow>


                                                    </TableBody> : <div>Loading...</div>}

                                                </Table>
                                            </TableContainer>

                                            </Grid>
                                            <Grid sx={{ borderRadius: "10px", boxShadow: 5, padding: "10px", marginTop: "10px", backgroundColor: "#171834", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                                            <Grid><Typography variant="body1">Balance Sheet </Typography></Grid>

                                            <TableContainer style={{ width: 600, padding: "10px 0" }}>
                                                <Table
                                                    sx={{
                                                        alignItems: "center",
                                                        display: ""
                                                    }}
                                                >
                                                    {stats?.['Financial Highlights']?.['Balance Sheet'] ? <TableBody>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> Book Value Per Share</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> Current Ratio</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Total Cash (mrq)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Balance Sheet']['Total Cash (mrq)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> Total Cash Per Share (mrq)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Balance Sheet']['Total Cash Per Share (mrq)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Total Debt (mrq)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Balance Sheet']['Total Debt (mrq)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Total Debt/Equity (mrq)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right"> {stats['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)']}</TableCell>
                                                        </TableRow>


                                                    </TableBody> : "Loading..."}

                                                </Table>
                                            </TableContainer>
                                            </Grid>
                                            <Grid sx={{ borderRadius: "10px", boxShadow: 5, padding: "10px", marginTop: "10px", backgroundColor: "#171834", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                                            <Grid><Typography variant="body1">Cash Flow Statements </Typography></Grid>
                                            <TableContainer style={{ width: 600, padding: "10px 0" }}>
                                                <Table
                                                    sx={{
                                                        alignItems: "center",
                                                        display: ""
                                                    }}
                                                >
                                                    {stats?.['Financial Highlights']?.['Cash Flow statement'] ? <TableBody>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> Levered Free Cash Flow (ttm)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Operating Cash Flow (ttm)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)']}</TableCell>
                                                        </TableRow>

                                                    </TableBody> : <div>Loading...</div>}

                                                </Table>
                                            </TableContainer>

                                            </Grid>



                                        </Grid>

                                    </Box>


                                </Grid>






                                <Grid item xs={2} sm={4} md={6} lg={7.3} >
                                    <Grid><Typography variant="h4">Trading Information </Typography></Grid>

                                    <Box sx={{ flexGrow: 3 }} display="flex"
                                        justifyContent="center"
                                        alignItems="center" marginLeft={2.5} marginRight={1} mt={2.5}>
                                        <Grid container spacing={{ xs: 1, md: 1, lg: 0 }} columns={{ xs: 0.3, sm: 0.3, md: 12, lg: 16 }} display="flex"
                                            justifyContent="center"
                                            alignItems="center" >
                                            <Grid sx={{ borderRadius: "10px", boxShadow: 5, padding: "10px", marginTop: "10px", backgroundColor: "#171834", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                                            <Grid ><Typography variant="body1">Stock Price History </Typography></Grid>
                                            <TableContainer style={{ width: 600, padding: "10px 0" }}>
                                                <Table
                                                    sx={{
                                                        alignItems: "center",
                                                        display: ""
                                                    }}
                                                >
                                                    {stats?.['Trading Information']?.['Stock Price History'] ? <TableBody >
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> 50-Day Moving Average </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Trading Information']['Stock Price History']['50-Day Moving Average 3']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> 52 Week High </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Trading Information']['Stock Price History']['52 Week High 3']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> 52 Week Low </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Trading Information']['Stock Price History']['52 Week Low 3']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> 52-Week Change </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Trading Information']['Stock Price History']['52-Week Change 3']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">200-Day Moving Average </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Trading Information']['Stock Price History']['200-Day Moving Average 3']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Beta (5Y Monthly)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Trading Information']['Stock Price History']['Beta (5Y Monthly)']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">S&P500 52-Week Change </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Trading Information']['Stock Price History']['S&P500 52-Week Change 3']}</TableCell>
                                                        </TableRow>

                                                    </TableBody> : <div>Loading...</div>}
                                                </Table>
                                            </TableContainer>
                                            </Grid>
                                            <Grid sx={{ borderRadius: "10px", boxShadow: 5, padding: "10px", marginTop: "10px", backgroundColor: "#171834", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                                            <Grid ><Typography variant="body1">Share Statistics </Typography></Grid>
                                            <TableContainer style={{ width: 600, padding: "10px 0" }}>
                                                <Table
                                                    sx={{
                                                        alignItems: "center",
                                                        display: ""
                                                    }}
                                                >
                                                    {stats?.['Trading Information']?.['Share Statistics'] ? <TableBody>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> % Held by Insiders </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Trading Information']['Share Statistics']['% Held by Insiders 1']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">% Held by Institutions</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Share Statistics']['% Held by Institutions 1']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Avg Vol (3 month)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Share Statistics']['Avg Vol (3 month) 3']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Avg Vol (10 day)</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Share Statistics']['Avg Vol (10 day) 3']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Float</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Share Statistics']['Float 8']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Implied Shares Outstanding</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Share Statistics']['Implied Shares Outstanding 6'] === null ? 'N/A' : stats['Trading Information']['Share Statistics']['Implied Shares Outstanding 6']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Shares Outstanding </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Share Statistics']['Shares Outstanding 5']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Shares Short </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Share Statistics']['Shares Short 4'] === null ? 'N/A' : stats['Trading Information']['Share Statistics']['Shares Short 4']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Shares Short (prior month )</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Share Statistics']['Shares Short (prior month ) 4'] === null ? 'N/A' : stats['Trading Information']['Share Statistics']['Shares Short (prior month ) 4']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Short % of Float </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Share Statistics']['Short % of Float 4'] === null ? 'N/A' : stats['Trading Information']['Share Statistics']['Short % of Float 4']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Short % of Shares Outstanding </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Share Statistics']['Short % of Shares Outstanding 4'] === null ? 'N/A' : stats['Trading Information']['Share Statistics']['Short % of Shares Outstanding 4']}</TableCell>
                                                        </TableRow >
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Short Ratio </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Share Statistics']['Short Ratio 4'] === null ? 'N/A' : stats['Trading Information']['Share Statistics']['Short Ratio 4']}</TableCell>
                                                        </TableRow>
                                                    </TableBody> : <div>Loading...</div>}
                                                </Table>
                                            </TableContainer>
                                            </Grid>
                                            <Grid sx={{ borderRadius: "10px", boxShadow: 5, padding: "10px", marginTop: "10px", backgroundColor: "#171834", borderColor: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)" }}>
                                            <Grid><Typography variant="body1" >Dividend & Splits </Typography></Grid>
                                            <TableContainer style={{ width: 600, padding: "10px 0" }}>
                                                <Table
                                                    sx={{
                                                        alignItems: "center",
                                                        display: ""
                                                    }}
                                                >
                                                    {stats?.['Trading Information']?.['Dividend & Splits'] ? <TableBody>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left"> 5 Year Average Dividend Yield </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">  {stats['Trading Information']['Dividend & Splits']['5 Year Average Dividend Yield 4'] === null ? 'N/A' : stats['Trading Information']['Dividend & Splits']['5 Year Average Dividend Yield 4']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Dividend Date</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Dividend & Splits']['Dividend Date 3'] === null ? 'N/A' : stats['Trading Information']['Dividend & Splits']['Dividend Date 3']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Ex-Dividend Date</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Dividend & Splits']['Ex-Dividend Date 4']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Forward Annual Dividend Rate</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Dividend & Splits']['Forward Annual Dividend Rate 4']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Forward Annual Dividend Yield</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Dividend & Splits']['Forward Annual Dividend Yield 4']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Last Split Date</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Dividend & Splits']['Last Split Date 3'] === null ? 'N/A' : stats['Trading Information']['Dividend & Splits']['Last Split Date 3']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Last Split Factor</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Dividend & Splits']['Last Split Factor 2'] === null ? 'N/A' : stats['Trading Information']['Dividend & Splits']['Last Split Factor 2']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Payout Ratio </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Dividend & Splits']['Payout Ratio 4']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Trailing Annual Dividend Rate </TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Dividend & Splits']['Trailing Annual Dividend Rate 3']}</TableCell>
                                                        </TableRow>
                                                        <TableRow hover>
                                                            <TableCell sx={{ fontSize: 17 }} align="left">Trailing Annual Dividend Yield</TableCell>
                                                            <TableCell sx={{ fontSize: 17 }} align="right">{stats['Trading Information']['Dividend & Splits']['Trailing Annual Dividend Yield 3']}</TableCell>
                                                        </TableRow>
                                                    </TableBody> : <div>Loading...</div>}
                                                </Table>
                                            </TableContainer>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>

                        </Box>

                    </TabPanel>

                    : <div>{statsMsg}</div>}




            </main>
        </ThemeProvider >

    )
}
function TabPanel(props) {
    const { children, value, index } = props;
    return (<div>
        {
            value === index && (<h3>{children} </h3>)
        }
    </div>)
}



