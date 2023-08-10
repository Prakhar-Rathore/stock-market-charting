import React, { useState,useEffect } from 'react';
import { Box, Paper, Divider, List, ListItemText, Stack, Grid, Typography, ListItem, Slider, Autocomplete, Table, InputBase, TableContainer, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CssBaseline from "@mui/material/CssBaseline";
import CompanyCompChart from './companyCompChart'
import CompanyComp from './companyComp'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import apiCall from "../../apiCall/apiCall";
import axios from "axios";
import { routes } from "../../config/serverconfig";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useLocation} from 'react-router-dom';


const PROD_SERV_ADDRESS_API = routes.PROD_SERV_ADDRESS_API;



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
      },body4:
      {
        fontWeight: 600,
        fontSize: 25,
      },
    
    },
  
  
  });
  
  const themeDark = createTheme({
    palette: {
      background: {
        default: "#000000"
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

export default function Compare({companyData, setCompanyData}) {
  


  const [light, setLight] = React.useState(true);
  const [allCompanies, setAllCompanies] = React.useState(["Infosys"]);

  const [companyData1, setCompanyData1] = React.useState({});
  const[companyData2,setCompanyData2]=React.useState({});
  const[companyData3,setCompanyData3]=React.useState({});
  const[companyData4,setCompanyData4]=React.useState({});

  const [enteredCompany, setEnteredCompany] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [color, setColor] = React.useState("");

  const [chartData, setChartData] = React.useState();
  const [chartData2, setChartData2] = React.useState();
  const [chartData3, setChartData3] = React.useState();
  const [chartData4, setChartData4] = React.useState();

  const [companyOverview, setCompanyOverview] = React.useState("");
  const [companyOverview2, setCompanyOverview2] = React.useState("");
  const [companyOverview3, setCompanyOverview3] = React.useState("");
  const [companyOverview4, setCompanyOverview4] = React.useState("");


  const [stats, setStats] = React.useState([]);
  const [stats2, setStats2] = React.useState([]);
  const [stats3, setStats3] = React.useState([]);
  const [stats4, setStats4] = React.useState([]);


  const [addCompany,setAddCompany]=React.useState(false);
  var comp=2;
  const [companyCount, setCompanyCount]=React.useState(comp);

  const [tabValue, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
};
const handleClick=()=>{
  if(addCompany===true) {comp=companyCount}
  setAddCompany(true);
  ++comp;
  setCompanyCount(comp);
}



  React.useEffect(() => {
    (async () => {
        const res = await apiCall(
            `${PROD_SERV_ADDRESS_API}/data/getAllCompanyNames`,
            "GET",
            null
        )
        if (res.status === 200) {
          console.log(res.data)
            setAllCompanies(res.data);
        }    
    })();
}, []);




const fetchCompanyData = async (company) => {
  setLoading(true);
  setChartData();
  console.log("inside fetData")
  console.log(company)
  var res;
 // console.log(company)
  setEnteredCompany(company);
  if (company && company !== "") {
      //console.log("Fetch");
      try {
          res = await axios.post("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server/data/getCompanyInfo", {
              NAME: company
          })
          setCompanyData1(res.data[0])
         console.log(res.data[0])
          setMsg("");
          if (res.data[0].changepct > 0) setColor("green")
          else setColor("red")

          let res2 = await axios.get("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server/data/recent?name=" + company + "&se=" + res.data[0].seListed[0]);
          if (res2.data.success) {
           // console.log(res2.data.data);
              setCompanyOverview(res2.data.data);
          }

          res2 = await apiCall("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/analytics/stats/byName?name=" + res.data[0].name, "GET", null);
          if (res2.data.success) {
              // console.log(res.data[0])
              setStats(res2.data.data)
          }
     

          res = await apiCall(
              "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalData?companyName=" + res.data[0].name + "&seCode=NSE&year=2022",
              "GET",
              null
          )
          if (res.status === 200) {
             // console.log(res.data.data);
              setChartData(res.data.data);
          }
         
      }
      catch (err) {
          //console.log(err.response.data);
          setMsg(err.response.data);
      }
      setLoading(false);
  }
  else {
      setCompanyData1({});
  }
}
const[companyOneAlready, setcompanyOneAlready]=React.useState("");
    const navigate = useNavigate();

const location = useLocation();
//console.log(location)


useEffect(() => {
    if (location.state !== null && location.state?.name?.companyName !== companyOneAlready) {
      setcompanyOneAlready(location.state.name.companyName);
    }
  }, [location.state, companyOneAlready]); 

console.log(companyOneAlready)

  useEffect(() => {
    if ( location.state !== null && companyData1?.name !== companyOneAlready) {
      fetchCompanyData(location.state.name.companyName);
    }
  }, []);  

//console.log(companyOneAlready);
//console.log(companyData)
//console.log(Object.keys(companyData).length)

const fetchCompanyData2 = async (company) => {
  setLoading(true);
  setChartData2();
  var res;
 // console.log(company)
  setEnteredCompany(company);
  if (company && company !== "") {
      //console.log("Fetch");
      try {
          res = await axios.post("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server/data/getCompanyInfo", {
              NAME: company
          })
          setCompanyData2(res.data[0])
         //console.log(res.data[0])
          setMsg("");
          if (res.data[0].changepct > 0) setColor("green")
          else setColor("red")

         let res2 = await axios.get("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server/data/recent?name=" + company + "&se=" + res.data[0].seListed[0]);
          if (res2.data.success) {
           // console.log(res2.data.data);
              setCompanyOverview2(res2.data.data);
          }
          res2 = await apiCall("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/analytics/stats/byName?name=" + res.data[0].name, "GET", null);
          if (res2.data.success) {
              // console.log(res.data[0])
              setStats2(res2.data.data)
          }

          res = await apiCall(
              "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalData?companyName=" + res.data[0].name + "&seCode=NSE&year=2022",
              "GET",
              null
          )
          if (res.status === 200) {
             // console.log(res.data.data);
              setChartData2(res.data.data);
          }
         
      }
      catch (err) {
          //console.log(err.response.data);
          setMsg(err.response.data);
      }
      setLoading(false);
  }
  else {
      setCompanyData2({});
  }
}

const fetchCompanyData3 = async (company) => {
  setLoading(true);
  setChartData3();
  var res;
 // console.log(company)
  setEnteredCompany(company);
  if (company && company !== "") {
      //console.log("Fetch");
      try {
          res = await axios.post("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server/data/getCompanyInfo", {
              NAME: company
          })
          setCompanyData3(res.data[0])
        // console.log(res.data[0])
          setMsg("");
          if (res.data[0].changepct > 0) setColor("green")
          else setColor("red")


          let res2 = await axios.get("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server/data/recent?name=" + company + "&se=" + res.data[0].seListed[0]);
          if (res2.data.success) {
            //console.log(res2.data.data);
              setCompanyOverview3(res2.data.data);
          }

          res2 = await apiCall("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/analytics/stats/byName?name=" + res.data[0].name, "GET", null);
          if (res2.data.success) {
              // console.log(res.data[0])
              setStats3(res2.data.data)
          }

          res = await apiCall(
              "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalData?companyName=" + res.data[0].name + "&seCode=NSE&year=2022",
              "GET",
              null
          )
          if (res.status === 200) {
              //console.log(res.data.data);
              setChartData3(res.data.data);
          }
         
      }
      catch (err) {
          //console.log(err.response.data);
          setMsg(err.response.data);
      }
      setLoading(false);
  }
  else {
      setCompanyData3({});
  }
}

const fetchCompanyData4 = async (company) => {
  setLoading(true);
  setChartData4();
  var res;
 // console.log(company)
  setEnteredCompany(company);
  if (company && company !== "") {
      //console.log("Fetch");
      try {
          res = await axios.post("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server/data/getCompanyInfo", {
              NAME: company
          })
          setCompanyData4(res.data[0])
         console.log(res.data[0])
          setMsg("");
          if (res.data[0].changepct > 0) setColor("green")
          else setColor("red")

          let res2 = await axios.get("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server/data/recent?name=" + company + "&se=" + res.data[0].seListed[0]);
          if (res2.data.success) {
            //console.log(res2.data.data);
              setCompanyOverview4(res2.data.data);
          }

          res2 = await apiCall("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/analytics/stats/byName?name=" + res.data[0].name, "GET", null);
          if (res2.data.success) {
              // console.log(res.data[0])
              setStats4(res2.data.data)
          }

          res = await apiCall(
              "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalData?companyName=" + res.data[0].name + "&seCode=NSE&year=2022",
              "GET",
              null
          )
          if (res.status === 200) {
             // console.log(res.data.data);
              setChartData4(res.data.data);
          }
         
      }
      catch (err) {
          //console.log(err.response.data);
          setMsg(err.response.data);
      }
      setLoading(false);
  }
  else {
      setCompanyData4({});
  }
}
if(addCompany===false &&location.state===null)
{
   return(
    <>
    <Header setCompanyData={setCompanyData} />
    <ThemeProvider theme={light ? themeDark : themeLight}>

    <main style={{marginTop: "25px"}}>
    <Box
        sx={{ flexGrow: 1, alignItems:"baseline" }}
        marginRight={5} pt={5}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end">
<Grid marginLeft={12} > 
<Tooltip title="go back to market summary">
        <Button  onClick={() => navigate(-1) } variant="contained" sx={{ height: 40 }}><ChevronLeftIcon/></Button>
        </Tooltip>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
          justifyContent="center"
          alignItems="center" width='100%'>
            <Tooltip  align='center' title="Compare the performance of a maximum of four companies in the form of a table and a line chart">
      <Typography variant='body4'> Company Comparison</Typography>
      </Tooltip>

        </Grid>
        <Grid > 
        <Tooltip title="toggle between light and dark mode">
          <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
        </Tooltip>
        </Grid>

      </Box>
        <CssBaseline />

   <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={0.5}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 12 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                         

                            <Grid item xs={2} sm={8} md={6} lg={12} >

                            <Box sx={{ flexGrow: 3 }} display="flex"
        justifyContent="center"
        alignItems="center" marginLeft={8} marginRight={1} mt={0}>
        <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 16 }} display="flex"
          justifyContent="center"
          alignItems="center" >
           
          <Grid item xs={2} sm={4} md={4} lg={6} >
                        <Grid align='center' sx={{fontSize:17}}> Company 1:</Grid> 
          <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center"  width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }}  {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData1.name}
                    />

                </Grid>


            </Box>
          </Grid>


          <Grid item xs={2} sm={4} md={4} lg={6} >
          <Grid align='center' sx={{fontSize:17}}> Company 2:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center"  width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData2(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData2.name}
                    />

                </Grid>

               
            </Box>
              </Grid>
              
            
        

        </Grid>
      </Box>
      <Grid align='center' marginLeft='60px' mt={0}>
                    <IconButton onClick={handleClick}>
                    <Tooltip title="add a company">
                    <AddCircleIcon/></Tooltip>
                      </IconButton></Grid>
      </Grid>
</Grid>
</Box>
      <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                    variant="fullWidth"
                    centered
                    mt={0}
                    
                >
                    <Tab  label="Company Comparison" />
                    <Tab label="View Comparison Charts" />
                   
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={5} md={6} lg={9} >
                 {(companyOverview && companyData1) &&(companyOverview2 && companyData2) ? <CompanyComp companyOverview={companyOverview} companyOverview2={companyOverview2} companyOverview3={companyOverview3} companyOverview4={companyOverview4} companyData={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4} stats={stats} stats2={stats2} stats3={stats3} stats4={stats4} />:<div align='center' sx={{fontSize:17}}>Choose companies to compare</div>}
                 </Grid>

<Grid item xs={2} sm={5} md={6} lg={9} >

    <TableContainer>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
</Grid>

</Box>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
      
      <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={9} >

                            {(chartData  && companyData1.name && chartData2 && companyData2.name)  ? <CompanyCompChart dataset={chartData}  dataset2={chartData2} dataset3={chartData3} dataset4={chartData4} companyName={companyData1.name} companyName2={companyData2.name} companyName3={companyData3.name} companyName4={companyData4.name}  />:<div align='center'>Choose companies to compare</div>}

                            </Grid>

                            <Grid item xs={2} sm={8} md={6} lg={9} >

                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                    </Box>
</TabPanel>
</main>
</ThemeProvider>
</>
   )
  }

  if(addCompany===false && location.state!==null)
  { 
     return(
      <ThemeProvider theme={light ? themeDark : themeLight}>
  
      <main style={{marginTop: "30px"}}>
      <Header setCompanyData={setCompanyData} />
      <Box
          sx={{ flexGrow: 1, alignItems:"baseline" }}
          marginRight={5} pt={5}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end">
  <Grid marginLeft={12} > 
  <Tooltip title="go back to market summary">
          <Button  onClick={() => navigate(-1) } variant="contained" sx={{ height: 40 }}><ChevronLeftIcon/></Button>
          </Tooltip>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
            justifyContent="center"
            alignItems="center" width='100%'>
      <Tooltip  align='center' title="Compare the performance of a maximum of four companies in the form of a table and a line chart">
        <Typography variant='body4'> Company Comparison</Typography>
        </Tooltip>
          </Grid>
          <Grid > 
          <Tooltip title="toggle between light and dark mode">
            <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
          </Tooltip>
          </Grid>
        </Box>
          <CssBaseline />

  
     <Box sx={{ flexGrow: 1 }} display="flex"
                          justifyContent="center"
                          alignItems="center" marginLeft={4} marginRight={1} mt={1}>
                          <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 12 }} display="flex"
                              justifyContent="center"
                              alignItems="center"
                          >
  
                              <Grid item xs={2} sm={8} md={6} lg={12} >
  
                              <Box sx={{ flexGrow: 3 }} display="flex"
          justifyContent="center"
          alignItems="center" marginLeft={8} marginRight={1} mt={0}>
          <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 16 }} display="flex"
            justifyContent="center"
            alignItems="center" >
  
            <Grid item xs={2} sm={4} md={4} lg={6} >
                          <Grid align='center'> Company 1:</Grid> 
            <Box
                  sx={{ flexGrow: 1, alignItems: "baseline" }}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end">
                  <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                      justifyContent="center"
                      alignItems="center"  width='100%'>
  
                      <Autocomplete
                          id="input"
                          options={allCompanies}
                          renderInput={(params) => {
                              const { InputLabelProps, InputProps, ...rest } = params;
                              return <InputBase placeholder={companyOneAlready} sx={{ color: light ? "white" : "black", width: "100%",fontSize:17}}  />
                        
                          }}
                         
                          color="primary"
                          style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px",padding:"5px" }}
                          defaultValue={companyData1.name}
                      />
                     
                     
  
                  </Grid>
  
  
              </Box>
            </Grid>
  
  
            <Grid item xs={2} sm={4} md={4} lg={6} >
            <Grid align='center'> Company 2:</Grid> 
                      <Box
                  sx={{ flexGrow: 1, alignItems: "baseline" }}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end">
                  <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                      justifyContent="center"
                      alignItems="center" width='100%'>
  
                        <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData2(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData2.name}
                    />
  
                  </Grid>
  
                 
              </Box>
                </Grid>
                
              
          
  
          </Grid>
  
        </Box>
        <Grid align='center' marginLeft='60px'>
                    <IconButton onClick={handleClick}>
                    <Tooltip title="add a company">
                    <AddCircleIcon/></Tooltip>
                      </IconButton></Grid>
        </Grid>
  </Grid>
  </Box>
                  
        <Tabs
                      value={tabValue}
                      onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="secondary tabs example"
                      variant="fullWidth"
                      centered
                  >
                      <Tab label="Company Comparison" />
                      <Tab label="View Comparison Charts" />
                     
                  </Tabs>
                  <TabPanel value={tabValue} index={0}>
                  <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={9} >
                   {(companyOverview && companyData1) &&(companyOverview2 && companyData2) ? <CompanyComp companyOverview={companyOverview} companyOverview2={companyOverview2} companyOverview3={companyOverview3} companyOverview4={companyOverview4} companyData={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4}  stats={stats} stats2={stats2} stats3={stats3} stats4={stats4} />:<div align='center'>Choose companies to compare</div>}
                   </Grid>
  
  <Grid item xs={2} sm={8} md={6} lg={9} >

      <TableContainer>
          <Table>
              <TableBody>
                  <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                  </TableRow>
              </TableBody>
          </Table>
      </TableContainer>
  </Grid>
</Grid>

</Box>
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
        
        <Box sx={{ flexGrow: 1 }} display="flex"
                          justifyContent="center"
                          alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                          <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                              justifyContent="center"
                              alignItems="center"
                          >
  
                              <Grid item xs={2} sm={8} md={6} lg={9} >
  
                              {(chartData  && companyData1.name && chartData2 && companyData2.name)  ? <CompanyCompChart dataset={chartData}  dataset2={chartData2} dataset3={chartData3} dataset4={chartData4} companyName={companyData1.name} companyName2={companyData2.name} companyName3={companyData3.name} companyName4={companyData4.name}  />:<div align='center'>Choose companies to compare</div>}
  
                              </Grid>
  
                              <Grid item xs={2} sm={8} md={6} lg={9} >
  
                                  <TableContainer>
                                      <Table>
                                          <TableBody>
                                              <TableRow>
                                                  <TableCell></TableCell>
                                                  <TableCell></TableCell>
                                              </TableRow>
                                          </TableBody>
                                      </Table>
                                  </TableContainer>
                              </Grid>
                          </Grid>
  
                      </Box>
  </TabPanel>
  </main>
  </ThemeProvider>
     )
    }

   if(addCompany===true && companyCount===3 && location.state===null){
   // setCompanyData4({})
    return(
      <ThemeProvider theme={light ? themeDark : themeLight}>

    <main style={{margin: "30px"}}>
    <Header setCompanyData={setCompanyData} />
    <Box
        sx={{ flexGrow: 1, alignItems:"baseline" }}
        marginRight={5} pt={5}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end">
<Grid marginLeft={12} > 
<Tooltip title="go back to market summary">
        <Button  onClick={() => navigate(-1) } variant="contained" sx={{ height: 40 }}><ChevronLeftIcon/></Button>
        </Tooltip>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
          justifyContent="center"
          alignItems="center" width='100%'>
    <Tooltip  align='center' title="Compare the performance of a maximum of four companies in the form of a table and a line chart">
      <Typography variant='body4'> Company Comparison</Typography>
      </Tooltip>
        </Grid>
        <Grid > 
        <Tooltip title="toggle between light and dark mode">
          <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
        </Tooltip>
        </Grid>
      </Box>
        <CssBaseline />
         <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={1}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 12 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={12} >

                            <Box sx={{ flexGrow: 3 }} display="flex"
        justifyContent="center"
        alignItems="center" marginLeft={8} marginRight={1} mt={0}>
        <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 16 }} display="flex"
          justifyContent="center"
          alignItems="center" >

          <Grid item xs={2} sm={4} md={4} lg={5} >
                        <Grid align='center' sx={{fontSize:17}}> Company 1:</Grid> 
          <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData1.name}
                    />

                </Grid>


            </Box>
          </Grid>


          <Grid item xs={2} sm={4} md={4} lg={5} >
          <Grid align='center' sx={{fontSize:17}}> Company 2:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%" ,fontSize:17}} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData2(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData2.name}
                    />

                </Grid>

                
                    
            </Box>
              </Grid>
              <Grid item xs={2} sm={4} md={4} lg={5} >
          <Grid align='center' sx={{fontSize:17}}> Company 3:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%", fontSize:17}} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData3(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData3.name}
                    />

                </Grid>


            </Box>
              </Grid>
              
            
        

        </Grid>

      </Box>
      <Grid align='center'  marginLeft='60px' mt={0}>
                  <IconButton onClick={handleClick}>
                  <Tooltip title="add a company">
                  <AddCircleIcon/></Tooltip>
                   </IconButton></Grid>
      </Grid>
</Grid>

</Box>

      <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="Company Comparison" />
                    <Tab label="View Comparison Charts" />
                   
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={9} >
                  
                 {(companyOverview && companyData1) &&(companyOverview2 && companyData2)&&(companyOverview3 && companyData3) ? <CompanyComp companyOverview={companyOverview} companyOverview2={companyOverview2} companyOverview3={companyOverview3} companyOverview4={companyOverview4} companyData={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4} stats={stats} stats2={stats2} stats3={stats3} stats4={stats4} theme={light}/>:<div align='center'>Choose companies to compare</div>}
                 </Grid>

<Grid item xs={2} sm={8} md={6} lg={9} >

    <TableContainer>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
</Grid>

</Box>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
      
      <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={9} >

                            {(chartData  && companyData1.name && chartData2 && companyData2.name) && (chartData3  && companyData3.name)  ? <CompanyCompChart dataset={chartData}  dataset2={chartData2} dataset3={chartData3} dataset4={chartData4} companyName={companyData1.name} companyName2={companyData2.name} companyName3={companyData3.name} companyName4={companyData4.name}  />:<div align='center'>Choose companies to compare</div>}

                            </Grid>

                            <Grid item xs={2} sm={8} md={6} lg={9} >

                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                    </Box>
</TabPanel>
</main>
</ThemeProvider>
    )
   
   }
   if(addCompany===true && companyCount===3 && location.state!==null){
    // setCompanyData4({})
     return(
       <ThemeProvider theme={light ? themeDark : themeLight}>
 
     <main style={{margin: "30px"}}>
     <Header setCompanyData={setCompanyData} />
     <Box
         sx={{ flexGrow: 1, alignItems:"baseline" }}
         marginRight={5} pt={5}
         display="flex"
         justifyContent="flex-end"
         alignItems="flex-end">
 <Grid marginLeft={12} > 
 <Tooltip title="go back to market summary">
         <Button  onClick={() => navigate(-1) } variant="contained" sx={{ height: 40 }}><ChevronLeftIcon/></Button>
         </Tooltip>
         </Grid>
         <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
           justifyContent="center"
           alignItems="center" width='100%'>
       <Tooltip  align='center' title="Compare the performance of a maximum of four companies in the form of a table and a line chart">
       <Typography variant='body4'> Company Comparison</Typography>
       </Tooltip>
         </Grid>
         <Grid > 
         <Tooltip title="toggle between light and dark mode">
           <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
         </Tooltip>
         </Grid>
       </Box>
         <CssBaseline />
         <Box sx={{ flexGrow: 1 }} display="flex"
                         justifyContent="center"
                         alignItems="center" marginLeft={4} marginRight={1} mt={1}>
                         <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 12 }} display="flex"
                             justifyContent="center"
                             alignItems="center"
                         >
 
                             <Grid item xs={2} sm={8} md={6} lg={12} >
 
                             <Box sx={{ flexGrow: 3 }} display="flex"
         justifyContent="center"
         alignItems="center" marginLeft={8} marginRight={1} mt={0}>
         <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 16 }} display="flex"
           justifyContent="center"
           alignItems="center" >
 
           <Grid item xs={2} sm={4} md={4} lg={5} >
                         <Grid align='center' sx={{fontSize:17}}> Company 1:</Grid> 
           
 <Box
                  sx={{ flexGrow: 1, alignItems: "baseline" }}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end">
                  <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                      justifyContent="center"
                      alignItems="center" width='100%'>
  
                      <Autocomplete
                          id="input"
                          options={allCompanies}
                          renderInput={(params) => {
                              const { InputLabelProps, InputProps, ...rest } = params;
                              return <InputBase placeholder={companyOneAlready} sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }}  />
                        
                          }}
                         
                          color="primary"
                          style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                          defaultValue={companyData1.name}
                      />
                     
                     
  
                  </Grid>
  
  
              </Box>

           </Grid>
 
 
           <Grid item xs={2} sm={4} md={4} lg={5} >
           <Grid align='center' sx={{fontSize:17}}> Company 2:</Grid> 
                     <Box
                 sx={{ flexGrow: 1, alignItems: "baseline" }}
                 display="flex"
                 justifyContent="flex-end"
                 alignItems="flex-end">
                 <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                     justifyContent="center"
                     alignItems="center"  width='100%'>
 
                     <Autocomplete
                         id="input"
                         options={allCompanies}
                         renderInput={(params) => {
                             const { InputLabelProps, InputProps, ...rest } = params;
                             return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%", fontSize:17}} {...params.InputProps} {...rest} />
                         }}
                         onChange={(event, value) => fetchCompanyData2(value)}
                         color="primary"
                         style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                         defaultValue={companyData2.name}
                     />
 
                 </Grid>
 
                 
                     
             </Box>
               </Grid>
               <Grid item xs={2} sm={4} md={4} lg={5} >
           <Grid align='center' sx={{fontSize:17}}> Company 3:</Grid> 
                     <Box
                 sx={{ flexGrow: 1, alignItems: "baseline" }}
                 display="flex"
                 justifyContent="flex-end"
                 alignItems="flex-end">
                 <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                     justifyContent="center"
                     alignItems="center" width='100%'>
 
                     <Autocomplete
                         id="input"
                         options={allCompanies}
                         renderInput={(params) => {
                             const { InputLabelProps, InputProps, ...rest } = params;
                             return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                         }}
                         onChange={(event, value) => fetchCompanyData3(value)}
                         color="primary"
                         style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                         defaultValue={companyData3.name}
                     />
 
                 </Grid>
 
 
             </Box>
               </Grid>
               
             
         
 
         </Grid>
 
       </Box>
       </Grid>
 </Grid>
 </Box>
                 <Grid align='center'  marginLeft='60px'>
                   <IconButton onClick={handleClick}>
                   <Tooltip title="add a company">
                   <AddCircleIcon/></Tooltip>
                    </IconButton></Grid>
       <Tabs
                     value={tabValue}
                     onChange={handleChange}
                     textColor="primary"
                     indicatorColor="primary"
                     aria-label="secondary tabs example"
                     variant="fullWidth"
                     centered
                 >
                     <Tab label="Company Comparison" />
                     <Tab label="View Comparison Charts" />
                    
                 </Tabs>
                 <TabPanel value={tabValue} index={0}>
                 <Box sx={{ flexGrow: 1 }} display="flex"
                         justifyContent="center"
                         alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                         <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                             justifyContent="center"
                             alignItems="center"
                         >
 
                             <Grid item xs={2} sm={8} md={6} lg={9} >
                   
                  {(companyOverview && companyData1) &&(companyOverview2 && companyData2)&&(companyOverview3 && companyData3) ? <CompanyComp companyOverview={companyOverview} companyOverview2={companyOverview2} companyOverview3={companyOverview3} companyOverview4={companyOverview4} companyData={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4} stats={stats} stats2={stats2} stats3={stats3} stats4={stats4} theme={light}/>:<div align='center'>Choose companies to compare</div>}

                  </Grid>
 
 <Grid item xs={2} sm={8} md={6} lg={9} >

     <TableContainer>
         <Table>
             <TableBody>
                 <TableRow>
                     <TableCell></TableCell>
                     <TableCell></TableCell>
                 </TableRow>
             </TableBody>
         </Table>
     </TableContainer>
 </Grid>
</Grid>

</Box>
                 </TabPanel>
                 <TabPanel value={tabValue} index={1}>
       
       <Box sx={{ flexGrow: 1 }} display="flex"
                         justifyContent="center"
                         alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                         <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                             justifyContent="center"
                             alignItems="center"
                         >
 
                             <Grid item xs={2} sm={8} md={6} lg={9} >
 
                             {(chartData  && companyData1.name && chartData2 && companyData2.name) && (chartData3  && companyData3.name)  ? <CompanyCompChart dataset={chartData}  dataset2={chartData2} dataset3={chartData3} dataset4={chartData4} companyName={companyData1.name} companyName2={companyData2.name} companyName3={companyData3.name} companyName4={companyData4.name}  />:<div align='center'>Choose companies to compare</div>}
 
                             </Grid>
 
                             <Grid item xs={2} sm={8} md={6} lg={9} >
 
                                 <TableContainer>
                                     <Table>
                                         <TableBody>
                                             <TableRow>
                                                 <TableCell></TableCell>
                                                 <TableCell></TableCell>
                                             </TableRow>
                                         </TableBody>
                                     </Table>
                                 </TableContainer>
                             </Grid>
                         </Grid>
 
                     </Box>
 </TabPanel>
 </main>
 </ThemeProvider>
     )
    
    }
   
   if(addCompany===true && companyCount===4 && location.state===null){
    return(
      <ThemeProvider theme={light ? themeDark : themeLight}>

    <main style={{margin: "30px"}}>
    <Header setCompanyData={setCompanyData} />

    <Box
        sx={{ flexGrow: 1, alignItems:"baseline" }}
        marginRight={5} pt={5}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end">
<Grid marginLeft={12} > 
<Tooltip title="go back to market summary">
        <Button  onClick={() => navigate(-1) } variant="contained" sx={{ height: 40 }}><ChevronLeftIcon/></Button>
        </Tooltip>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
          justifyContent="center"
          alignItems="center" width='100%'>
        <Tooltip  align='center' title="Compare the performance of a maximum of four companies in the form of a table and a line chart">
      <Typography variant='body4'> Company Comparison</Typography>
      </Tooltip>
        </Grid>
        <Grid > 
        <Tooltip title="toggle between light and dark mode">
          <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
        </Tooltip>
        </Grid>
      </Box>
        <CssBaseline />
 <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={1}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 12 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={12} >

                            <Box sx={{ flexGrow: 3 }} display="flex"
        justifyContent="center"
        alignItems="center" marginLeft={8} marginRight={1} mt={0}>
        <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 16 }} display="flex"
          justifyContent="center"
          alignItems="center" >

          <Grid item xs={2} sm={4} md={4} lg={4} >
                        <Grid align='center' sx={{fontSize:17}}> Company 1:</Grid> 
          <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData1.name}
                    />

                </Grid>


            </Box>
          </Grid>


          <Grid item xs={2} sm={4} md={4} lg={4} >
          <Grid align='center' sx={{fontSize:17}}> Company 2:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData2(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData2.name}
                    />

                </Grid>

                
                    
            </Box>
              </Grid>
              <Grid item xs={2} sm={4} md={4} lg={4} >
          <Grid align='center' sx={{fontSize:17}}> Company 3:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData3(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData3.name}
                    />

                </Grid>


            </Box>
              </Grid>
              <Grid item xs={2} sm={4} md={4} lg={4} >
          <Grid align='center' sx={{fontSize:17}}> Company 4:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData4(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData4.name}
                    />

                </Grid>


            </Box>
              </Grid>

              
            
        

        </Grid>

      </Box>
      <Grid align='center'  marginLeft='60px' mt={0}>
                  <IconButton onClick={handleClick}>
                  <Tooltip title="add a company">
                  <AddCircleIcon/></Tooltip>
                   </IconButton></Grid>
      </Grid>
</Grid>
</Box>
                

                  
      <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="Company Comparison" />
                    <Tab label="View Comparison Charts" />
                   
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={9} >
                 {(companyOverview && companyData1) &&(companyOverview2 && companyData2)&&(companyOverview3 && companyData3)&&(companyOverview4 && companyData4) ? <CompanyComp companyOverview={companyOverview} companyOverview2={companyOverview2} companyOverview3={companyOverview3} companyOverview4={companyOverview4} companyData={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4} stats={stats} stats2={stats2} stats3={stats3} stats4={stats4} theme={light}/>:<div align='center'>Choose companies to compare</div>}
                 </Grid>

<Grid item xs={2} sm={8} md={6} lg={9} >

    <TableContainer>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
</Grid>

</Box>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
      
      <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={9} >

                            {(chartData  && companyData1.name && chartData2 && companyData2.name) && (chartData3  && companyData3.name) && (chartData4  && companyData4.name ) ? <CompanyCompChart dataset={chartData}  dataset2={chartData2} dataset3={chartData3} dataset4={chartData4} companyName={companyData1.name} companyName2={companyData2.name} companyName3={companyData3.name} companyName4={companyData4.name}  />:<div align='center'>Choose companies to compare</div>}

                            </Grid>

                            <Grid item xs={2} sm={8} md={6} lg={9} >

                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                    </Box>
</TabPanel>
</main>
</ThemeProvider>
    )
   }
   if(addCompany===true && companyCount===4 && location.state!==null){
    return(
      <ThemeProvider theme={light ? themeDark : themeLight}>

    <main style={{margin: "30px"}}>
    <Header setCompanyData={setCompanyData} />

    <Box
        sx={{ flexGrow: 1, alignItems:"baseline" }}
        marginRight={5} pt={5}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end">
<Grid marginLeft={12} > 
<Tooltip title="go back to market summary">
        <Button  onClick={() => navigate(-1) } variant="contained" sx={{ height: 40 }}><ChevronLeftIcon/></Button>
        </Tooltip>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
          justifyContent="center"
          alignItems="center" width='100%'>
    <Tooltip  align='center' title="Compare the performance of a maximum of four companies in the form of a table and a line chart">
      <Typography variant='body4'> Company Comparison</Typography>
      </Tooltip>
        </Grid>
        <Grid > 
        <Tooltip title="toggle between light and dark mode">
          <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
        </Tooltip>
        </Grid>
      </Box>
        <CssBaseline />
 <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={1}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 12 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={12} >

                            <Box sx={{ flexGrow: 3 }} display="flex"
        justifyContent="center"
        alignItems="center" marginLeft={8} marginRight={1} mt={0}>
        <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 16 }} display="flex"
          justifyContent="center"
          alignItems="center" >

          <Grid item xs={2} sm={4} md={4} lg={4} >
                        <Grid align='center' sx={{fontSize:17}}> Company 1:</Grid> 
        
 <Box
                  sx={{ flexGrow: 1, alignItems: "baseline" }}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end">
                  <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                      justifyContent="center"
                      alignItems="center" width='100%'>
  
                      <Autocomplete
                          id="input"
                          options={allCompanies}
                          renderInput={(params) => {
                              const { InputLabelProps, InputProps, ...rest } = params;
                              return <InputBase placeholder={companyOneAlready} sx={{ color: light ? "white" : "black", width: "100%" ,fontSize:17}}  />
                        
                          }}
                         
                          color="primary"
                          style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                          defaultValue={companyData1.name}
                      />
                     
                     
  
                  </Grid>
  
  
              </Box>

          </Grid>


          <Grid item xs={2} sm={4} md={4} lg={4} >
          <Grid align='center' sx={{fontSize:17}}> Company 2:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%" ,fontSize:17}} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData2(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData2.name}
                    />

                </Grid>

                
                    
            </Box>
              </Grid>
              <Grid item xs={2} sm={4} md={4} lg={4} >
          <Grid align='center' sx={{fontSize:17}}> Company 3:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%", fontSize:17 }} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData3(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData3.name}
                    />

                </Grid>


            </Box>
              </Grid>
              <Grid item xs={2} sm={4} md={4} lg={4} >
          <Grid align='center' sx={{fontSize:17}}> Company 4:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData4(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData4.name}
                    />

                </Grid>


            </Box>
              </Grid>

              
            
        

        </Grid>

      </Box>

      <Grid align='center'  marginLeft='60px'>
                  <IconButton onClick={handleClick}>
                  <Tooltip title="add a company">
                  <AddCircleIcon/></Tooltip>
                   </IconButton></Grid>
      </Grid>
</Grid>
</Box>

                  
      <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="Company Comparison" />
                    <Tab label="View Comparison Charts" />
                   
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={9} >
                 {(companyOverview && companyData1) &&(companyOverview2 && companyData2)&&(companyOverview3 && companyData3)&&(companyOverview4 && companyData4) ? <CompanyComp companyOverview={companyOverview} companyOverview2={companyOverview2} companyOverview3={companyOverview3} companyOverview4={companyOverview4} companyData={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4} stats={stats} stats2={stats2} stats3={stats3} stats4={stats4} theme={light}/>:<div align='center'>Choose companies to compare</div>}
                 </Grid>

<Grid item xs={2} sm={8} md={6} lg={9} >

    <TableContainer>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
</Grid>

</Box>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
      
      <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={9} >

                            {(chartData  && companyData1.name && chartData2 && companyData2.name) && (chartData3  && companyData3.name) && (chartData4  && companyData4.name ) ? <CompanyCompChart dataset={chartData}  dataset2={chartData2} dataset3={chartData3} dataset4={chartData4} companyName={companyData1.name} companyName2={companyData2.name} companyName3={companyData3.name} companyName4={companyData4.name}  />:<div align='center'>Choose companies to compare</div>}

                            </Grid>

                            <Grid item xs={2} sm={8} md={6} lg={9} >

                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                    </Box>
</TabPanel>
</main>
</ThemeProvider>
    )
   }

   if(addCompany===true && companyCount>=4 && location.state===null){
    return(
      <ThemeProvider theme={light ? themeDark : themeLight}>

    <main style={{margin: "30px"}}>
    <Header setCompanyData={setCompanyData} />

    <Box
        sx={{ flexGrow: 1, alignItems:"baseline" }}
        marginRight={5} pt={5}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end">
<Grid marginLeft={12} > 
<Tooltip title="go back to market summary">
        <Button  onClick={() => navigate(-1) } variant="contained" sx={{ height: 40 }}><ChevronLeftIcon/></Button>
        </Tooltip>
        </Grid>
        <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
          justifyContent="center"
          alignItems="center" width='100%'>
        <Tooltip  align='center' title="Compare the performance of a maximum of four companies in the form of a table and a line chart">
      <Typography variant='body4'> Company Comparison</Typography>
      </Tooltip>
        </Grid>
        <Grid > 
        <Tooltip title="toggle between light and dark mode">
          <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
        </Tooltip>
        </Grid>
      </Box>
        <CssBaseline />
                    <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={1}>
                        <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 12 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={6} lg={12} >

                            <Box sx={{ flexGrow: 3 }} display="flex"
        justifyContent="center"
        alignItems="center" marginLeft={8} marginRight={1} mt={0}>
        <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 16 }} display="flex"
          justifyContent="center"
          alignItems="center" >

          <Grid item xs={2} sm={4} md={4} lg={4} >
                        <Grid align='center' sx={{fontSize:17}}> Company 1:</Grid> 
          <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%", fontSize:17}} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData1.name}
                    />

                </Grid>


            </Box>
          </Grid>


          <Grid item xs={2} sm={4} md={4} lg={4} >
          <Grid align='center' sx={{fontSize:17}}> Company 2:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData2(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData2.name}
                    />

                </Grid>

                
                    
            </Box>
              </Grid>
              <Grid item xs={2} sm={4} md={4} lg={4} >
          <Grid align='center' sx={{fontSize:17}}> Company 3:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%", fontSize:17}} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData3(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData3.name}
                    />

                </Grid>


            </Box>
              </Grid>
              <Grid item xs={2} sm={4} md={4} lg={4} >
          <Grid align='center' sx={{fontSize:17}}> Company 4:</Grid> 
                    <Box
                sx={{ flexGrow: 1, alignItems: "baseline" }}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
                <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                    justifyContent="center"
                    alignItems="center" width='100%'>

                    <Autocomplete
                        id="input"
                        options={allCompanies}
                        renderInput={(params) => {
                            const { InputLabelProps, InputProps, ...rest } = params;
                            return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                        }}
                        onChange={(event, value) => fetchCompanyData4(value)}
                        color="primary"
                        style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                        defaultValue={companyData4.name}
                    />

                </Grid>


            </Box>
              </Grid>

              
            
        

        </Grid>

      </Box>
      <Grid align='center'  marginLeft='60px'>
                  <IconButton onClick={handleClick}>
                  <Tooltip title="add a company">
                  <AddCircleIcon/></Tooltip>
                   </IconButton></Grid>
      </Grid>
</Grid>
</Box>
                

                    <Grid align='center'  marginLeft='60px'  sx={{fontSize:17}}>(Max. 4 companies only)</Grid>

      <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="Company Comparison" />
                    <Tab label="View Comparison Charts" />
                   
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                        <Grid container spacing={{ xs: 1, md: 1, lg: 1 }} columns={{ xs: 2, sm: 2, md: 10, lg: 10 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={9} lg={9} >
                 {(companyOverview && companyData1) &&(companyOverview2 && companyData2)&&(companyOverview3 && companyData3)&&(companyOverview4 && companyData4) ? <CompanyComp companyOverview={companyOverview} companyOverview2={companyOverview2} companyOverview3={companyOverview3} companyOverview4={companyOverview4} companyData={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4}  stats={stats} stats2={stats2} stats3={stats3} stats4={stats4}theme={light}/>:<div align='center'>Choose companies to compare</div>}
                 </Grid>

<Grid item xs={2} sm={8} md={6} lg={9} >

    <TableContainer>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
</Grid>

</Box>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
      <Box sx={{ flexGrow: 1 }} display="flex"
                        justifyContent="center"
                        alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                        <Grid container spacing={{ xs: 1, md: 1, lg: 1 }} columns={{ xs: 2, sm: 2, md: 10, lg: 10 }} display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={2} sm={8} md={9} lg={9} >

                            {(chartData  && companyData1.name && chartData2 && companyData2.name) && (chartData3  && companyData3.name) && (chartData4  && companyData4.name ) ? <CompanyCompChart dataset={chartData}  dataset2={chartData2} dataset3={chartData3} dataset4={chartData4} companyName={companyData1.name} companyName2={companyData2.name} companyName3={companyData3.name} companyName4={companyData4.name}  />:<div align='center'>Choose companies to compare</div>}

                            </Grid>

                            <Grid item xs={2} sm={8} md={6} lg={9} >

                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                    </Box>
      
</TabPanel>
</main>
</ThemeProvider>
    )}
    if(addCompany===true && companyCount>=4 && location.state!==null){
        return(
          <ThemeProvider theme={light ? themeDark : themeLight}>
    
        <main style={{margin: "30px"}}>
        <Header setCompanyData={setCompanyData} />
    
        <Box
            sx={{ flexGrow: 1, alignItems:"baseline" }}
            marginRight={5} pt={5}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end">
    <Grid marginLeft={12} > 
    <Tooltip title="go back to market summary">
            <Button  onClick={() => navigate(-1) } variant="contained" sx={{ height: 40 }}><ChevronLeftIcon/></Button>
            </Tooltip>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
              justifyContent="center"
              alignItems="center" width='100%'>
            <Tooltip  align='center' title="Compare the performance of a maximum of four companies in the form of a table and a line chart">
          <Typography variant='body4'> Company Comparison</Typography>
          </Tooltip>
            </Grid>
            <Grid > 
            <Tooltip title="toggle between light and dark mode">
              <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
            </Tooltip>
            </Grid>
          </Box>
            <CssBaseline />

    
                        <Box sx={{ flexGrow: 1 }} display="flex"
                            justifyContent="center"
                            alignItems="center" marginLeft={4} marginRight={1} mt={1}>
                            <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 12 }} display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
    
                                <Grid item xs={2} sm={8} md={6} lg={12} >
    
                                <Box sx={{ flexGrow: 3 }} display="flex"
            justifyContent="center"
            alignItems="center" marginLeft={8} marginRight={1} mt={0}>
            <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 16 }} display="flex"
              justifyContent="center"
              alignItems="center" >
    
              <Grid item xs={2} sm={4} md={4} lg={4} >
                            <Grid align='center' sx={{fontSize:17}}> Company 1:</Grid> 
            
 <Box
                  sx={{ flexGrow: 1, alignItems: "baseline" }}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end">
                  <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                      justifyContent="center"
                      alignItems="center" width='100%'>
  
                      <Autocomplete
                          id="input"
                          options={allCompanies}
                          renderInput={(params) => {
                              const { InputLabelProps, InputProps, ...rest } = params;
                              return <InputBase placeholder={companyOneAlready} sx={{ color: light ? "white" : "black", width: "100%" ,fontSize:17}}  />
                        
                          }}
                         
                          color="primary"
                          style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                          defaultValue={companyData1.name}
                      />
                     
                     
  
                  </Grid>
  
  
              </Box>

              </Grid>
    
    
              <Grid item xs={2} sm={4} md={4} lg={4} >
              <Grid align='center' sx={{fontSize:17}}> Company 2:</Grid> 
                        <Box
                    sx={{ flexGrow: 1, alignItems: "baseline" }}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end">
                    <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                        justifyContent="center"
                        alignItems="center" width='100%'>
    
                        <Autocomplete
                            id="input"
                            options={allCompanies}
                            renderInput={(params) => {
                                const { InputLabelProps, InputProps, ...rest } = params;
                                return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                            }}
                            onChange={(event, value) => fetchCompanyData2(value)}
                            color="primary"
                            style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                            defaultValue={companyData2.name}
                        />
    
                    </Grid>
    
                    
                        
                </Box>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4} lg={4} >
              <Grid align='center' sx={{fontSize:17}}> Company 3:</Grid> 
                        <Box
                    sx={{ flexGrow: 1, alignItems: "baseline" }}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end">
                    <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                        justifyContent="center"
                        alignItems="center" width='100%'>
    
                        <Autocomplete
                            id="input"
                            options={allCompanies}
                            renderInput={(params) => {
                                const { InputLabelProps, InputProps, ...rest } = params;
                                return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                            }}
                            onChange={(event, value) => fetchCompanyData3(value)}
                            color="primary"
                            style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                            defaultValue={companyData3.name}
                        />
    
                    </Grid>
    
    
                </Box>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4} lg={4} >
              <Grid align='center' sx={{fontSize:17}}> Company 4:</Grid> 
                        <Box
                    sx={{ flexGrow: 1, alignItems: "baseline" }}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end">
                    <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
                        justifyContent="center"
                        alignItems="center" width='100%'>
    
                        <Autocomplete
                            id="input"
                            options={allCompanies}
                            renderInput={(params) => {
                                const { InputLabelProps, InputProps, ...rest } = params;
                                return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%",fontSize:17 }} {...params.InputProps} {...rest} />
                            }}
                            onChange={(event, value) => fetchCompanyData4(value)}
                            color="primary"
                            style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "5px" }}
                            defaultValue={companyData4.name}
                        />
    
                    </Grid>
    
    
                </Box>
                  </Grid>
    
                  
                
            
    
            </Grid>
    
          </Box>
          <Grid align='center'  marginLeft='60px'>
                      <IconButton onClick={handleClick}>
                      <Tooltip title="add a company">
                      <AddCircleIcon/></Tooltip>
                       </IconButton></Grid>
          </Grid>
    </Grid>
    </Box>
                    
    
                        <Grid align='center'  marginLeft='60px' sx={{fontSize:17}}>(Max. 4 companies only)</Grid>
    
          <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                        variant="fullWidth"
                        centered
                    >
                        <Tab label="Company Comparison" />
                        <Tab label="View Comparison Charts" />
                       
                    </Tabs>
                    <TabPanel value={tabValue} index={0}>
                    <Box sx={{ flexGrow: 1 }} display="flex"
                            justifyContent="center"
                            alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                            <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
    
                                <Grid item xs={2} sm={8} md={6} lg={9} >
                     {(companyOverview && companyData1) &&(companyOverview2 && companyData2)&&(companyOverview3 && companyData3)&&(companyOverview4 && companyData4) ? <CompanyComp companyOverview={companyOverview} companyOverview2={companyOverview2} companyOverview3={companyOverview3} companyOverview4={companyOverview4} companyData={companyData1} companyData2={companyData2} companyData3={companyData3} companyData4={companyData4} stats={stats} stats2={stats2} stats3={stats3} stats4={stats4} theme={light}/>:<div align='center'>Choose companies to compare</div>}
                     </Grid>
    
    <Grid item xs={2} sm={8} md={6} lg={9} >

        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Grid>
</Grid>

</Box>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
          <Box sx={{ flexGrow: 1 }} display="flex"
                            justifyContent="center"
                            alignItems="center" marginLeft={4} marginRight={1} mt={2.5}>
                            <Grid container spacing={{ xs: 1, md: 2, lg: 1 }} columns={{ xs: 2, sm: 2, md: 12, lg: 10 }} display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
    
                                <Grid item xs={2} sm={8} md={6} lg={9} >
    
                                {(chartData  && companyData1.name && chartData2 && companyData2.name) && (chartData3  && companyData3.name) && (chartData4  && companyData4.name ) ? <CompanyCompChart dataset={chartData}  dataset2={chartData2} dataset3={chartData3} dataset4={chartData4} companyName={companyData1.name} companyName2={companyData2.name} companyName3={companyData3.name} companyName4={companyData4.name}  />:<div align='center'>Choose companies to compare</div>}
    
                                </Grid>
    
                                <Grid item xs={2} sm={8} md={6} lg={9} >
    
                                    <TableContainer>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
    
                        </Box>
          
    </TabPanel>
    </main>
    </ThemeProvider>
        )}
}

function TabPanel(props) {
  const { children, value, index } = props;
  return (<div>
      {
          value === index && (<h3>{children} </h3>)
      }
  </div>)
}