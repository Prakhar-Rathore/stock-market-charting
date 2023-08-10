import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Paper, Grid, Box } from '@mui/material'
import { Autocomplete, InputBase, TextField } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Typography from '@mui/material/Typography';
import NiftyPoints from './niftyPoints'
import SensexPoints from './sensexPoints'
import MarketDirection from './marketDirection'
import LeaderIndex from './leaderIndex'
import { experimentalStyled as styled } from '@mui/material/styles';
import Nifty50 from "./nifty50";
import Sensex from './sensex'
import BiggestGainers from './biggestGainers'
import Losers from './Losers'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import {db} from '../../firebase';
import {ref,onValue} from 'firebase/database'
import { useEffect } from "react";
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
    }
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
    }
 
  },
 
 
 
});
 
export default function Home({ fetchCompanyData, allCompanies }) {
  const [light, setLight] = React.useState(true);
 
 
  const Item = styled(Paper)(({ theme }) => ({
    border: theme.palette.mode === 'dark' ? '#fff' : '#222',
    borderRadius: "2",
    backgroundColor: theme.palette.mode === 'dark' ? '#171834' : '#d3d3d3',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.primary,
  }));
 
  const [niftyData, setNiftyData] = React.useState({});
  const [sensexData, setSensexData] = React.useState({});
  useEffect(() => {
     
      async function fetchData() {
        var dbRef=ref(db,"1rh1Ta-8dqZKmh1xy5ans2lOqReoiVAT81WyDKqRaxl0/Nifty");
        onValue(dbRef,(snapshot)=>{
          const temp = snapshot.val();
          setNiftyData(temp);
        })
 
 
        dbRef=ref(db,"1rh1Ta-8dqZKmh1xy5ans2lOqReoiVAT81WyDKqRaxl0/Sensex");
        onValue(dbRef,(snapshot)=>{
          const temp = snapshot.val();
          setSensexData(temp);
        })
      };
      fetchData();
    }, []);
 
 
  return (
 
    <ThemeProvider theme={light ? themeDark : themeLight}>
      <Box
        sx={{ flexGrow: 1, alignItems:"baseline" }}
        ml={5} mr={5} pt={3} mt={3} mb={3}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end">
        <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
          justifyContent="center"
          alignItems="center" marginLeft={8} marginRight={1} mt={4} width='100%'>
 
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
          />
 
        </Grid>
        <Tooltip title="toggle between light and dark mode">
          <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
        </Tooltip>
      </Box>
 
      <CssBaseline />
 
      <Grid
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        ml={16}
 
 
      >
        <Typography variant="body3">Market Summary</Typography>
      </Grid>
 
 
 
 
      <Box sx={{ flexGrow: 1 }} display="flex"
        justifyContent="center"
        alignItems="center" marginLeft={8} marginRight={1} mt={2}>
        <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
          justifyContent="center"
          alignItems="center" >
 
          <Grid item xs={2} sm={4} md={4} lg={5} >
            <Item><Grid alignItems="left"><Typography color="#949494" variant="body2"  sx={{fontSize:22}}>NIFTY 50</Typography></Grid>
              <NiftyPoints /></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4} lg={5}>
            <Item><Grid><Typography color="#949494" variant="body2"  sx={{fontSize:22}}>BSE SENSEX</Typography></Grid><SensexPoints /></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4} lg={5} >
            <Item><Grid><Typography color="#949494" variant="body2"  sx={{fontSize:22}}>DIRECTION</Typography></Grid><MarketDirection /></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4} lg={5}>
            <Item><Grid><Typography color="#949494" variant="body2"  sx={{fontSize:22}}>LEADER INDEX</Typography></Grid><LeaderIndex /></Item>
          </Grid>
 
        </Grid>
 
      </Box>
 
 
      <Box sx={{ flexGrow: 1 }} display="flex"
        justifyContent="center"
        alignItems="center" marginLeft={8} marginRight={1} mt={2.5}>
        <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 16 }} display="flex"
          justifyContent="center"
          alignItems="center" >
 
          <Grid item xs={2} sm={4} md={4} lg={7.3} sx={{ alignContent: "center" }} >
            <Item ><Grid><Typography variant="body1">NIFTY 50 </Typography></Grid>
              <Nifty50 dataset={niftyData} /> </Item>
          </Grid>
 
          <Grid item xs={2} sm={4} md={4} lg={7.3}>
            <Item alignItems="center"><Grid><Typography variant="body1">BSE SENSEX </Typography></Grid>
            <Sensex dataset={sensexData}/>
              </Item>
          </Grid>
 
        </Grid>
 
      </Box>
 
      <Box sx={{ flexGrow: 3 }} display="flex"
        justifyContent="center"
        alignItems="center" marginLeft={8} marginRight={1} mt={2.5}>
        <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 16 }} display="flex"
          justifyContent="center"
          alignItems="center" >
 
          <Grid item xs={2} sm={4} md={6} lg={7.3} >
            <Item><Grid ><Typography variant="body1">TOP GAINERS <ArrowUpwardIcon /></Typography></Grid>
              <BiggestGainers /></Item>
          </Grid>
 
 
          <Grid item xs={2} sm={4} md={6} lg={7.3} >
            <Item><Grid><Typography variant="body1">TOP LOSERS <ArrowDownwardIcon /></Typography></Grid>
              <Losers /></Item></Grid>
 
        </Grid>
 
      </Box>
</ThemeProvider>
 
  );
};
 
 
