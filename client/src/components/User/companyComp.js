import React, { useState,useEffect } from 'react';
import { Box, Paper, Divider, List, ListItemText, Stack, Grid, Typography, ListItem, Slider, Autocomplete, Table, InputBase, TableContainer, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Tooltip from '@mui/material/Tooltip';
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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
//import { writeFile,utils } from 'xlsx';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import * as XLSX from 'xlsx';
const PROD_SERV_ADDRESS_API = routes.PROD_SERV_ADDRESS_API;

const themeLight = createTheme({
    palette: {
      background: {
        default: "#FFFFFF",
        primary: "#000000",
        secondary: "#FFFFFF",
        tertiary:"#303030"
      },
      text: {
        primary: "#000000",
        secondary: "#FFFFFF"
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
        default: "#000000",
        primary: "#ffffff",
        secondary:"#000000",
        tertiary:"#303030"
      },
      text: {
        primary: "#ffffff",
        secondary:"#000000"
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

export default function CompanyCompare({companyOverview, companyOverview2, companyOverview3, companyOverview4,companyData,companyData2, companyData3,companyData4, stats,stats2,stats3,stats4,theme}) {
  

  var companyNames=[]
  companyNames.push(companyData.name)
  companyNames.push(companyData2.name)
  if(typeof companyData3.name!=='undefined')   {companyNames.push(companyData3.name)}
  if(typeof companyData4.name!=='undefined')   {companyNames.push(companyData4.name)}
  //console.log(typeof companyNames)


const [light, setLight] = React.useState(true);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
    fontWeight:600,
    border:0
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize:16
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode==='light'?theme.palette.action.hover:'#181818',
    color: theme.palette.mode==='light'?"	#000000":"#FFFFFF"

  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.mode==='light'?"	#B8B8B8":"#303030",

  },
  "&:hover": {
    backgroundColor:  theme.palette.mode==='light'?"#909090 !important":"#989898 !important"
  },
  '&:first-child td, &:firstt-child th': {
    border: "1px solid #FFF",
    borderBottom: 4,
  },
 
}));
const navigate = useNavigate();


var data={
  dataset:[
    {
      label:[],
      data: [],
      slabel:[],
      stats:[]
    },
    {
      label:[],
      data: [],
      slabel:[],
      stats:[]
    },
    {
      label:[],
      data: [],
      slabel:[],
      stats:[]
    },
    {
      label:[],
      data: [],
      slabel:[],
      stats:[]
    }
   ]
}

companyData && Object.keys(companyData).length !== 0 && Object.keys(companyData).forEach((datapoint) => {
  if(datapoint==='name'){
  data.dataset[0].label.push(datapoint)
  data.dataset[0].data.push(companyData[datapoint])
  }
})
companyData2 && Object.keys(companyData2).length !== 0 && Object.keys(companyData2).forEach((datapoint) => {
  if(datapoint==='name'){
  data.dataset[1].label.push(datapoint)
  data.dataset[1].data.push(companyData2[datapoint])
  }
})
companyData3 && Object.keys(companyData3).length !== 0 && Object.keys(companyData3).forEach((datapoint) => {
  if(datapoint==='name'){
  data.dataset[2].label.push(datapoint)
  data.dataset[2].data.push(companyData3[datapoint])
  }
})
companyData4 && Object.keys(companyData4).length !== 0 && Object.keys(companyData4).forEach((datapoint) => {
  if(datapoint==='name'){
  data.dataset[3].label.push(datapoint)
  data.dataset[3].data.push(companyData4[datapoint])
  }
})




companyOverview && Object.keys(companyOverview).length !== 0 && Object.keys(companyOverview).forEach((datapoint) => {
  if(datapoint==='ticker'||datapoint==='price open'||datapoint==='high'||datapoint==='low'||datapoint==='low52'||datapoint==='changepct'||datapoint==='high52'||datapoint==='priceclose'||datapoint==='marketcap'||datapoint==='volume'){
  data.dataset[0].label.push(datapoint)
  data.dataset[0].data.push(companyOverview[datapoint])
  }
})

companyOverview2 && Object.keys(companyOverview2).length !== 0 && Object.keys(companyOverview2).forEach((datapoint) => {
  if(datapoint==='ticker'||datapoint==='price open'||datapoint==='high'||datapoint==='low'||datapoint==='low52'|| datapoint==='changepct' ||datapoint==='high52'||datapoint==='priceclose'||datapoint==='marketcap'||datapoint==='volume'){
  data.dataset[1].label.push(datapoint)
  data.dataset[1].data.push(companyOverview2[datapoint])
  }
})
companyOverview3 && Object.keys(companyOverview3).length !== 0 && Object.keys(companyOverview3).forEach((datapoint) => {
  if(datapoint==='ticker'||datapoint==='price open'||datapoint==='high'||datapoint==='low'||datapoint==='low52'||datapoint==='changepct'||datapoint==='high52'||datapoint==='priceclose'||datapoint==='marketcap'||datapoint==='volume'){
  data.dataset[2].label.push(datapoint)
  data.dataset[2].data.push(companyOverview3[datapoint])
  }
})
companyOverview4 && Object.keys(companyOverview4).length !== 0 && Object.keys(companyOverview4).forEach((datapoint) => {
  if(datapoint==='ticker'||datapoint==='price open'||datapoint==='high'||datapoint==='low'||datapoint==='low52'||datapoint==='changepct'||datapoint==='high52'||datapoint==='priceclose'||datapoint==='marketcap'||datapoint==='volume'){
  data.dataset[3].label.push(datapoint)
  data.dataset[3].data.push(companyOverview4[datapoint])
  }
})


stats && Object.keys(stats).length !== 0 && Object.keys(stats).forEach((datapoint) => {
//console.log(datapoint);
data.dataset[0].slabel.push(datapoint);
data.dataset[0].stats.push(stats[datapoint])
})

stats2 && Object.keys(stats2).length !== 0 && Object.keys(stats2).forEach((datapoint) => {
  data.dataset[1].slabel.push(datapoint);
  data.dataset[1].stats.push(stats2[datapoint])
  })

stats3 && Object.keys(stats3).length !== 0 && Object.keys(stats3).forEach((datapoint) => {
  data.dataset[2].slabel.push(datapoint);
data.dataset[2].stats.push(stats3[datapoint])
})

stats4 && Object.keys(stats4).length !== 0 && Object.keys(stats4).forEach((datapoint) => {
  data.dataset[3].slabel.push(datapoint);
  data.dataset[3].stats.push(stats4[datapoint])
  })

console.log(data)
const obj={}
const obj2={}
const obj3={}
const obj4={}

data.dataset[0].data && data.dataset[0].label &&  Object.keys(data.dataset[0].data).length!==0 &&  Object.keys(data.dataset[0].data).forEach((index)=> {
 obj[data.dataset[0].label[index]]=data.dataset[0].data[index];
})

data.dataset[1].data && data.dataset[1].label &&  Object.keys(data.dataset[1].data).length!==0 &&  Object.keys(data.dataset[1].data).forEach((index)=> {
  obj2[data.dataset[1].label[index]]=data.dataset[1].data[index];
 })
 data.dataset[2].data && data.dataset[2].label &&  Object.keys(data.dataset[2].data).length!==0 &&  Object.keys(data.dataset[2].data).forEach((index)=> {
  obj3[data.dataset[2].label[index]]=data.dataset[2].data[index];
 })
 data.dataset[3].data && data.dataset[3].label &&  Object.keys(data.dataset[3].data).length!==0 &&  Object.keys(data.dataset[3].data).forEach((index)=> {
  obj4[data.dataset[3].label[index]]=data.dataset[3].data[index];
 })

 const sobj={}
 const sobj2={}
 const sobj3={}
 const sobj4={}

 data.dataset[0].stats && data.dataset[0].slabel &&  Object.keys(data.dataset[0].stats).length!==0 &&  Object.keys(data.dataset[0].stats).forEach((index)=> {
  sobj[data.dataset[0].slabel[index]]=data.dataset[0].stats[index];
 })

 data.dataset[1].stats && data.dataset[1].slabel &&  Object.keys(data.dataset[1].stats).length!==0 &&  Object.keys(data.dataset[1].stats).forEach((index)=> {
  sobj2[data.dataset[1].slabel[index]]=data.dataset[1].stats[index];
 })
 data.dataset[2].stats && data.dataset[2].slabel &&  Object.keys(data.dataset[2].stats).length!==0 &&  Object.keys(data.dataset[2].stats).forEach((index)=> {
  sobj3[data.dataset[2].slabel[index]]=data.dataset[1].stats[index];
 }) 
 data.dataset[3].stats && data.dataset[3].slabel &&  Object.keys(data.dataset[3].stats).length!==0 &&  Object.keys(data.dataset[3].stats).forEach((index)=> {
  sobj4[data.dataset[3].slabel[index]]=data.dataset[3].stats[index];
 })

console.log(sobj);
console.log(sobj['Financial Highlights'])
  const handleClick=()=>{
    // navigate('/download',{state:{id:1,name:{data}}}); //<div style={{display:'none'}} id='download'><DownloadContent /></div>
    
      const input = document.getElementById('download');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'p', // landscape
          unit: 'pt', // points, pixels won't work properly
          format: [canvas.width, canvas.height] // set needed dimensions for any element
    });
        
      // pdf.setFillColor(0,0,0,0);
      // pdf.rect(10, 10,300, 300, "F")

        pdf.addImage(imgData, 'PNG', 0,0,canvas.width, canvas.height);
       // document.body.appendChild(canvas)
         //pdf.output('dataurlnewwindow');
         pdf.save("download.pdf");
         //pdf.output('datauristring');  
      })
   }
   return(

 <ThemeProvider theme={theme}>

    <div style={{ padding: "1px" }}></div>
    <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end" marginRight={2} >
    <Button variant='contained' 
    sx={{ '&:hover':{
      backgroundColor: '#505050',
      boxShadow:'none',
    },
    fontSize: 12 }} onClick={handleClick} startIcon={<FileDownloadIcon/>}>
  Export as PDF
    </Button>
    </Box>
    <div style={{ padding: "1px" }}></div>

    <div id='download'>
    <Grid ><Typography sx={{fontWeight: 600 ,fontSize: 20}} align='left' marginLeft={2}> Company comparison across various metrics </Typography></Grid>
    <Grid ><Typography sx={{fontWeight: 600 ,fontSize: 25}} align='left' marginLeft={2}> Performance </Typography></Grid>
    <div style={{ padding: "3px" }}></div>
        <Box  sx={{ flexGrow: 3 }} display="flex"
  justifyContent="center"
  alignItems="center"marginLeft={2.5} marginRight={1}  mt={2.5} marginBottom={0}>
      <Grid container spacing={{ xs: 1, md: 2,lg:2}} columns={{ xs: 0.3, sm: 0.3, md: 16 ,lg:16}} display="flex"
  justifyContent="center"
  alignItems="center" >
<TableContainer  style={{width:1200,height:600}}> 
<Table style={{border: "2px solid #808080", borderBottom: "2px solid #808080"}}
sx={{alignItems: "center",}} >
          

    <TableHead  style={{border: "3px solid #808080", borderBottom: "1px solid #808080"}}
sx={{alignItems: "center",}}>
        <StyledTableRow >
            <StyledTableCell align="center"> Company </StyledTableCell>
            <StyledTableCell  align="center">{companyData.name} </StyledTableCell>
            <StyledTableCell  align="center">{companyData2.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData3.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData4.name} </StyledTableCell>
        </StyledTableRow>
    </TableHead>
    <TableBody  sx={{backgroundColor: "",}} >

                <StyledTableRow >
                <StyledTableCell align="center"> Open </StyledTableCell>
                <StyledTableCell align="center"> {companyOverview['price open']} </StyledTableCell>
                <StyledTableCell align="center"> {companyOverview2['price open']} </StyledTableCell>
                <StyledTableCell  align="center"> {companyOverview3['price open']}  </StyledTableCell>
                <StyledTableCell  align="center"> {companyOverview4['price open']}  </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow>
                    <StyledTableCell  align="center"> High </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview.high} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview2.high} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview3.high} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview4.high} </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow >
                    <StyledTableCell  align="center"> Low </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview.low} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview2.low} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview3.low} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview4.low} </StyledTableCell>
    </StyledTableRow>
                
    <StyledTableRow >
                    <StyledTableCell  align="center"> Close </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview.priceclose?companyOverview.priceclose.toFixed(2):companyOverview.priceclose} </StyledTableCell>
                   <StyledTableCell align="center"> {companyOverview2.priceclose?companyOverview2.priceclose.toFixed(2):companyOverview2.priceclose} </StyledTableCell>
                   <StyledTableCell align="center"> {companyOverview3.priceclose?companyOverview3.priceclose.toFixed(2):companyOverview3.priceclose} </StyledTableCell>
                   <StyledTableCell align="center"> {companyOverview4.priceclose?companyOverview4.priceclose.toFixed(2):companyOverview4.priceclose} </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow hover>
                    <StyledTableCell  align="center"> % Change </StyledTableCell>
                    <StyledTableCell sx={{color:companyOverview.changepct<0 ? 'red' : 'green',}}align="center"> {companyOverview.changepct?companyOverview.changepct.toFixed(2):companyOverview.changepct}                                    
                    {companyOverview.changepct?(companyOverview.changepct > 0 ? <ArrowUpwardIcon style={{ color: "green", height: "100%" }} /> : <ArrowDownwardIcon fontSize="medium" style={{ color: "red", height: "100%" }}/>): ""}
                    </StyledTableCell>
                    <StyledTableCell sx={{color:companyOverview2.changepct<0 ? 'red' : 'green',}}align="center"> {companyOverview2.changepct?companyOverview2.changepct.toFixed(2):companyOverview2.changepct}
                    {companyOverview2.changepct?(companyOverview2.changepct > 0 ? <ArrowUpwardIcon style={{ color: "green", height: "100%" }} /> : <ArrowDownwardIcon fontSize="medium" style={{ color: "red", height: "100%" }}/>): ""}
                    </StyledTableCell>
                    <StyledTableCell sx={{color:companyOverview3.changepct<0 ? 'red' : 'green',}}align="center"> {companyOverview3.changepct?companyOverview3.changepct.toFixed(2):companyOverview3.changepct} 
                    {companyOverview3.changepct?(companyOverview3.changepct > 0 ? <ArrowUpwardIcon style={{ color: "green", height: "100%" }} /> : <ArrowDownwardIcon fontSize="medium" style={{ color: "red", height: "100%" }}/>): ""}
                    </StyledTableCell>
                    <StyledTableCell sx={{color:companyOverview4.changepct<0 ? 'red' : 'green',}}align="center"> {companyOverview4.changepct?companyOverview4.changepct.toFixed(2):companyOverview4.changepct}
                    {companyOverview4.changepct?(companyOverview4.changepct > 0 ? <ArrowUpwardIcon style={{ color: "green", height: "100%" }} /> : <ArrowDownwardIcon fontSize="medium" style={{ color: "red", height: "100%" }}/>): ""}
                    </StyledTableCell>  
      </StyledTableRow>
    <StyledTableRow >
                    <StyledTableCell  align="center"> 52 Week High </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview.high52} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview2.high52} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview3.high52} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview4.high52} </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow >
                    <StyledTableCell  align="center">  52 Week Low </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview.low52} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview2.low52} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview3.low52} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview4.low52} </StyledTableCell>
     </StyledTableRow>
      <StyledTableRow >
                    <StyledTableCell  align="center"> Volume </StyledTableCell>
                    <StyledTableCell align="center"> 
                    {companyOverview.volume >= 1000000000000 ? (companyOverview.volume / 1000000000000).toFixed(2) + ' T' : companyOverview.volume >= 1000000000 ? (companyOverview.volume / 1000000000).toFixed(2) + ' B' : companyOverview.volume >= 1000000 ? (companyOverview.volume / 1000000).toFixed(2) + ' M' : companyOverview.volume}
                    </StyledTableCell>
                    <StyledTableCell align="center"> 
                    {companyOverview.volume2 >= 1000000000000 ? (companyOverview2.volume/ 1000000000000).toFixed(2) + ' T' : companyOverview2.volume >= 1000000000 ? (companyOverview2.volume / 1000000000).toFixed(2) + ' B' : companyOverview2.volume >= 1000000 ? (companyOverview2.volume / 1000000).toFixed(2) + ' M' : companyOverview2.volume}
                    </StyledTableCell>
                    <StyledTableCell align="center"> 
                    {companyOverview.volume >= 1000000000000 ? (companyOverview3.volume / 1000000000000).toFixed(2) + ' T' : companyOverview3.volume >= 1000000000 ? (companyOverview3.volume / 1000000000).toFixed(2) + ' B' : companyOverview3.volume >= 1000000 ? (companyOverview3.volume / 1000000).toFixed(2) + ' M' : companyOverview3.volume}
                    </StyledTableCell>
                    <StyledTableCell align="center"> 
                    {companyOverview4.volume >= 1000000000000 ? (companyOverview4.volume / 1000000000000).toFixed(2) + ' T' : companyOverview4.volume >= 1000000000 ? (companyOverview4.volume / 1000000000).toFixed(2) + ' B' : companyOverview4.volume >= 1000000 ? (companyOverview4.volume / 1000000).toFixed(2) + ' M' : companyOverview4.volume}
                    </StyledTableCell>
        </StyledTableRow>
                
                
            
  
    </TableBody>
    </Table>
</TableContainer>
</Grid>

</Box>

<Grid ><Typography sx={{fontWeight: 600 ,fontSize: 25}} align='left' marginLeft={2}> Statistics </Typography></Grid>
<Grid ><Typography sx={{fontWeight: 600 ,fontSize: 20}} align='left' marginLeft={2}> Valuation Measures </Typography></Grid>
    <div style={{ padding: "3px" }}></div>
        <Box  sx={{ flexGrow: 3 }} display="flex"
  justifyContent="center"
  alignItems="center"marginLeft={2.5} marginRight={1}  mt={2.5}>
      <Grid container spacing={{ xs: 1, md: 2,lg:2}} columns={{ xs: 0.3, sm: 0.3, md: 16 ,lg:16}} display="flex"
  justifyContent="center"
  alignItems="center" >
<TableContainer  style={{width:1200,height:500}}> 
<Table style={{border: "2px solid #808080", borderBottom: "2px solid #808080"}}
sx={{alignItems: "center",}} >
          

    <TableHead  style={{border: "3px solid #808080", borderBottom: "1px solid #808080"}}
sx={{alignItems: "center",}}>
          <StyledTableRow >
            <StyledTableCell align="center"> Company </StyledTableCell>
            <StyledTableCell  align="center">{companyData.name} </StyledTableCell>
            <StyledTableCell  align="center">{companyData2.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData3.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData4.name} </StyledTableCell>
        </StyledTableRow>
       
    </TableHead>
    <TableBody  sx={{backgroundColor: "",}} >
      

    <StyledTableRow >
                    <StyledTableCell  align="center"> Market Cap. </StyledTableCell>
                    <StyledTableCell align="center"> 
                    {companyOverview.marketcap >= 1000000000000 ? (companyOverview.marketcap / 1000000000000).toFixed(2) + ' T' : companyOverview.marketcap >= 1000000000 ? (companyOverview.marketcap / 1000000000).toFixed(2) + ' B' : companyOverview.marketcap >= 1000000 ? (companyOverview.marketcap / 1000000).toFixed(2) + ' M' : companyOverview.marketcap}
                    </StyledTableCell>
                    <StyledTableCell align="center"> 
                    {companyOverview2.marketcap >= 1000000000000 ? (companyOverview2.marketcap / 1000000000000).toFixed(2) + ' T' : companyOverview2.marketcap >= 1000000000 ? (companyOverview2.marketcap / 1000000000).toFixed(2) + ' B' : companyOverview2.marketcap >= 1000000 ? (companyOverview2.marketcap / 1000000).toFixed(2) + ' M' : companyOverview2.marketcap}
                    </StyledTableCell>
                    <StyledTableCell align="center"> 
                    {companyOverview3.marketcap >= 1000000000000 ? (companyOverview3.marketcap / 1000000000000).toFixed(2) + ' T' : companyOverview3.marketcap >= 1000000000 ? (companyOverview3.marketcap / 1000000000).toFixed(2) + ' B' : companyOverview3.marketcap >= 1000000 ? (companyOverview3.marketcap / 1000000).toFixed(2) + ' M' : companyOverview3.marketcap}
                    </StyledTableCell>
                    <StyledTableCell align="center"> 
                    {companyOverview4.marketcap >= 1000000000000 ? (companyOverview4.marketcap / 1000000000000).toFixed(2) + ' T' : companyOverview4.marketcap >= 1000000000 ? (companyOverview4.marketcap / 1000000000).toFixed(2) + ' B' : companyOverview4.marketcap >= 1000000 ? (companyOverview4.marketcap / 1000000).toFixed(2) + ' M' : companyOverview4.marketcap}
                    </StyledTableCell>
        </StyledTableRow>

                <StyledTableRow >
                <StyledTableCell align="center"> P/E Ratio</StyledTableCell>
                <StyledTableCell align="center"> {companyOverview.pe} </StyledTableCell>
                <StyledTableCell align="center"> {companyOverview2.pe} </StyledTableCell>
                <StyledTableCell  align="center"> {companyOverview3.pe}  </StyledTableCell>
                <StyledTableCell  align="center"> {companyOverview4.pe}  </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow>
                    <StyledTableCell  align="center">P/B Ratio </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview.pb} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview2.pb} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview3.pb} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview4.pb} </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow >
                    <StyledTableCell  align="center"> Sector PE </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview.sectorpe} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview2.sectorpe} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview3.sectorpe} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview4.sectorpe} </StyledTableCell>

    </StyledTableRow>
                
    <StyledTableRow >
                    <StyledTableCell  align="center"> Div. Yield</StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview.divyield} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview2.divyield} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview3.divyield} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview4.divyield} </StyledTableCell>

    </StyledTableRow>
    <StyledTableRow hover>
                    <StyledTableCell  align="center"> Book Value </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview.bookval} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview2.bookval} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview3.bookval} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview4.bookval} </StyledTableCell>

      </StyledTableRow>
    <StyledTableRow >
                    <StyledTableCell  align="center"> Face Value </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview.faceval} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview2.faceval} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview3.faceval} </StyledTableCell>
                    <StyledTableCell align="center"> {companyOverview4.faceval} </StyledTableCell>

    </StyledTableRow>
  
  
    </TableBody>
    </Table>
</TableContainer>
</Grid>

</Box>


<Grid ><Typography sx={{fontWeight: 600 ,fontSize: 20}} align='left' marginLeft={2}> Financial Highlights </Typography></Grid>
<Grid ><Typography sx={{fontWeight: 600 ,fontSize: 18}} align='left' marginLeft={2}> Fiscal Year </Typography></Grid>
    <div style={{ padding: "3px" }}></div>
        <Box  sx={{ flexGrow: 3 }} display="flex"
  justifyContent="center"
  alignItems="center"marginLeft={2.5} marginRight={1}  mt={2.5}>
      <Grid container spacing={{ xs: 1, md: 2,lg:2}} columns={{ xs: 0.3, sm: 0.3, md: 16 ,lg:16}} display="flex"
  justifyContent="center"
  alignItems="center" >
<TableContainer  style={{width:1200,height:270}}> 
<Table style={{border: "2px solid #808080", borderBottom: "2px solid #808080",}}
sx={{alignItems: "center",}} >
          

    <TableHead  style={{border: "3px solid #808080", borderBottom: "1px solid #808080"}}
sx={{alignItems: "center",}}>
          <StyledTableRow >
            <StyledTableCell align="center"> Company </StyledTableCell>
            <StyledTableCell  align="center">{companyData.name} </StyledTableCell>
            <StyledTableCell  align="center">{companyData2.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData3.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData4.name} </StyledTableCell>
        </StyledTableRow>
       
    </TableHead>
    {stats?.['Financial Highlights']?.['Fiscal Year'] &&stats2?.['Financial Highlights']?.['Fiscal Year'] && typeof stats3?.['Financial Highlights']?.['Fiscal Year']==='undefined' && typeof stats4?.['Financial Highlights']?.['Fiscal Year']==='undefined' ? <TableBody>      
                <StyledTableRow >
                <StyledTableCell align="center"> Fiscal Year Ends </StyledTableCell>
                <StyledTableCell align="center"> {stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends']} </StyledTableCell>
                <StyledTableCell align="center"> {stats2['Financial Highlights']['Fiscal Year']['Fiscal Year Ends'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends']} </StyledTableCell>
                <StyledTableCell align="center">  </StyledTableCell>
                <StyledTableCell align="center">  </StyledTableCell>


               
    </StyledTableRow>
    <StyledTableRow>
                    <StyledTableCell  align="center">Most Recent Quarter (mrq) </StyledTableCell>
                    <StyledTableCell align="center"> {stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)']} </StyledTableCell>
                    <StyledTableCell align="center"> {stats2['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)']} </StyledTableCell>
                    <StyledTableCell align="center">  </StyledTableCell>
                    <StyledTableCell align="center">  </StyledTableCell>

    </StyledTableRow>
  
    </TableBody> : 
    stats?.['Financial Highlights']?.['Fiscal Year'] &&stats2?.['Financial Highlights']?.['Fiscal Year'] && stats3?.['Financial Highlights']?.['Fiscal Year'] && typeof stats4?.['Financial Highlights']?.['Fiscal Year']==='undefined' ? <TableBody>      
                <StyledTableRow >
                <StyledTableCell align="center"> Fiscal Year Ends </StyledTableCell>
                <StyledTableCell align="center"> {stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends']} </StyledTableCell>
                <StyledTableCell align="center"> {stats2['Financial Highlights']['Fiscal Year']['Fiscal Year Ends'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends']} </StyledTableCell>
                <StyledTableCell align="center"> {stats3['Financial Highlights']['Fiscal Year']['Fiscal Year Ends'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends']} </StyledTableCell>
                <StyledTableCell align="center">  </StyledTableCell>

               
    </StyledTableRow>
    <StyledTableRow>
                    <StyledTableCell  align="center">Most Recent Quarter (mrq) </StyledTableCell>
                    <StyledTableCell align="center"> {stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)']} </StyledTableCell>
                    <StyledTableCell align="center"> {stats2['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)']} </StyledTableCell>
                    <StyledTableCell align="center"> {stats3['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)']} </StyledTableCell>
                    <StyledTableCell align="center">  </StyledTableCell>

    </StyledTableRow>
  
    </TableBody> : 

    stats?.['Financial Highlights']?.['Fiscal Year'] &&stats2?.['Financial Highlights']?.['Fiscal Year'] && stats3?.['Financial Highlights']?.['Fiscal Year'] && stats4?.['Financial Highlights']?.['Fiscal Year'] ? <TableBody>      
                <StyledTableRow >
                <StyledTableCell align="center"> Fiscal Year Ends </StyledTableCell>
                <StyledTableCell align="center"> {stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends']} </StyledTableCell>
                <StyledTableCell align="center"> {stats2['Financial Highlights']['Fiscal Year']['Fiscal Year Ends'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends']} </StyledTableCell>
                <StyledTableCell align="center"> {stats3['Financial Highlights']['Fiscal Year']['Fiscal Year Ends'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends']} </StyledTableCell>
                <StyledTableCell align="center"> {stats4['Financial Highlights']['Fiscal Year']['Fiscal Year Ends'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Fiscal Year Ends']} </StyledTableCell>
               
    </StyledTableRow>
    <StyledTableRow>
                    <StyledTableCell  align="center">Most Recent Quarter (mrq) </StyledTableCell>
                    <StyledTableCell align="center"> {stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)']} </StyledTableCell>
                    <StyledTableCell align="center"> {stats2['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)']} </StyledTableCell>
                    <StyledTableCell align="center"> {stats3['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)']} </StyledTableCell>
                    <StyledTableCell align="center"> {stats4['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)'] === null ? "N/A" : stats['Financial Highlights']['Fiscal Year']['Most Recent Quarter (mrq)']} </StyledTableCell>
    </StyledTableRow>
  
    </TableBody> : "Loading"}




    </Table>
</TableContainer>
</Grid>

</Box>


<Grid ><Typography sx={{fontWeight: 600 ,fontSize: 18}} align='left' marginLeft={2}> Profitability </Typography></Grid>
    <div style={{ padding: "3px" }}></div>
        <Box  sx={{ flexGrow: 3 }} display="flex"
  justifyContent="center"
  alignItems="center"marginLeft={2.5} marginRight={1}  mt={2.5}>
      <Grid container spacing={{ xs: 1, md: 2,lg:2}} columns={{ xs: 0.3, sm: 0.3, md: 16 ,lg:16}} display="flex"
  justifyContent="center"
  alignItems="center" >
<TableContainer  style={{width:1200,height:270}}> 
<Table style={{border: "2px solid #808080", borderBottom: "2px solid #808080",}}
sx={{alignItems: "center",}} >
          

    <TableHead  style={{border: "3px solid #808080", borderBottom: "1px solid #808080"}}
sx={{alignItems: "center",}}>
          <StyledTableRow >
            <StyledTableCell align="center"> Company </StyledTableCell>
            <StyledTableCell  align="center">{companyData.name} </StyledTableCell>
            <StyledTableCell  align="center">{companyData2.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData3.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData4.name} </StyledTableCell>
        </StyledTableRow>
       
    </TableHead>
    {stats?.['Financial Highlights']?.['Profitability'] && stats2?.['Financial Highlights']?.['Profitability'] && typeof  stats3?.['Financial Highlights']?.['Profitability']==='undefined' && typeof stats4?.['Financial Highlights']?.['Profitability']==='undefined' ? <TableBody>
      
      <StyledTableRow >
      <StyledTableCell align="center"> Operating Margin (ttm) </StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Profitability']['Operating Margin (ttm)'] === null ? "N/A" : stats['Financial Highlights']['Profitability']['Operating Margin (ttm)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Profitability']['Operating Margin (ttm)'] === null ? "N/A" : stats2['Financial Highlights']['Profitability']['Operating Margin (ttm)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>


</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Profit Margin</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Profitability']['Profit Margin'] === null ? "N/A" : stats['Financial Highlights']['Profitability']['Profit Margin']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Profitability']['Profit Margin'] === null ? "N/A" : stats2['Financial Highlights']['Profitability']['Profit Margin']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>

</TableBody> : 

    stats?.['Financial Highlights']?.['Profitability'] && stats2?.['Financial Highlights']?.['Profitability'] && stats3?.['Financial Highlights']?.['Profitability'] && typeof stats4?.['Financial Highlights']?.['Profitability']==='undefined' ? <TableBody>
      
      <StyledTableRow >
      <StyledTableCell align="center"> Operating Margin (ttm) </StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Profitability']['Operating Margin (ttm)'] === null ? "N/A" : stats['Financial Highlights']['Profitability']['Operating Margin (ttm)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Profitability']['Operating Margin (ttm)'] === null ? "N/A" : stats2['Financial Highlights']['Profitability']['Operating Margin (ttm)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Profitability']['Operating Margin (ttm)'] === null ? "N/A" : stats3['Financial Highlights']['Profitability']['Operating Margin (ttm)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>


</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Profit Margin</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Profitability']['Profit Margin'] === null ? "N/A" : stats['Financial Highlights']['Profitability']['Profit Margin']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Profitability']['Profit Margin'] === null ? "N/A" : stats2['Financial Highlights']['Profitability']['Profit Margin']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Profitability']['Profit Margin'] === null ? "N/A" : stats3['Financial Highlights']['Profitability']['Profit Margin']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>

</TableBody> : 

    stats?.['Financial Highlights']?.['Profitability'] && stats2?.['Financial Highlights']?.['Profitability'] && stats3?.['Financial Highlights']?.['Profitability'] && stats4?.['Financial Highlights']?.['Profitability']? <TableBody>
      
                <StyledTableRow >
                <StyledTableCell align="center"> Operating Margin (ttm) </StyledTableCell>
                <StyledTableCell align="center"> {stats['Financial Highlights']['Profitability']['Operating Margin (ttm)'] === null ? "N/A" : stats['Financial Highlights']['Profitability']['Operating Margin (ttm)']} </StyledTableCell>
                <StyledTableCell align="center"> {stats2['Financial Highlights']['Profitability']['Operating Margin (ttm)'] === null ? "N/A" : stats2['Financial Highlights']['Profitability']['Operating Margin (ttm)']} </StyledTableCell>
                <StyledTableCell align="center"> {stats3['Financial Highlights']['Profitability']['Operating Margin (ttm)'] === null ? "N/A" : stats3['Financial Highlights']['Profitability']['Operating Margin (ttm)']} </StyledTableCell>
                <StyledTableCell align="center"> {stats4['Financial Highlights']['Profitability']['Operating Margin (ttm)'] === null ? "N/A" : stats4['Financial Highlights']['Profitability']['Operating Margin (ttm)']} </StyledTableCell>         
    </StyledTableRow>
    <StyledTableRow>
                    <StyledTableCell  align="center">Profit Margin</StyledTableCell>
                    <StyledTableCell align="center"> {stats['Financial Highlights']['Profitability']['Profit Margin'] === null ? "N/A" : stats['Financial Highlights']['Profitability']['Profit Margin']} </StyledTableCell>
                    <StyledTableCell align="center"> {stats2['Financial Highlights']['Profitability']['Profit Margin'] === null ? "N/A" : stats2['Financial Highlights']['Profitability']['Profit Margin']} </StyledTableCell>
                    <StyledTableCell align="center"> {stats3['Financial Highlights']['Profitability']['Profit Margin'] === null ? "N/A" : stats3['Financial Highlights']['Profitability']['Profit Margin']} </StyledTableCell>
                    <StyledTableCell align="center"> {stats4['Financial Highlights']['Profitability']['Profit Margin'] === null ? "N/A" : stats4['Financial Highlights']['Profitability']['Profit Margin']} </StyledTableCell>

    </StyledTableRow>
  
    </TableBody> : ""}






    </Table>
</TableContainer>
</Grid>

</Box>


<Grid ><Typography sx={{fontWeight: 600 ,fontSize: 18}} align='left' marginLeft={2}>Management Effectiveness </Typography></Grid>
    <div style={{ padding: "3px" }}></div>
        <Box  sx={{ flexGrow: 3 }} display="flex"
  justifyContent="center"
  alignItems="center"marginLeft={2.5} marginRight={1}  mt={2.5}>
      <Grid container spacing={{ xs: 1, md: 2,lg:2}} columns={{ xs: 0.3, sm: 0.3, md: 16 ,lg:16}} display="flex"
  justifyContent="center"
  alignItems="center" >
<TableContainer  style={{width:1200,height:270}}> 
<Table style={{border: "2px solid #808080", borderBottom: "2px solid #808080", }}
sx={{alignItems: "center",}} >
          

    <TableHead  style={{border: "3px solid #808080", borderBottom: "1px solid #808080"}}
sx={{alignItems: "center",}}>
          <StyledTableRow >
            <StyledTableCell align="center"> Company </StyledTableCell>
            <StyledTableCell  align="center">{companyData.name} </StyledTableCell>
            <StyledTableCell  align="center">{companyData2.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData3.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData4.name} </StyledTableCell>
        </StyledTableRow>
       
    </TableHead>
    {stats?.['Financial Highlights']?.['Management Effectiveness'] && stats2?.['Financial Highlights']?.['Management Effectiveness'] && typeof  stats3?.['Financial Highlights']?.['Management Effectiveness']==='undefined' && typeof stats4?.['Financial Highlights']?.['Management Effectiveness']==='undefined' ? <TableBody>
      
      <StyledTableRow >
      <StyledTableCell  align="center">Return on Assets (ttm)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)']} </StyledTableCell>
      <StyledTableCell align="center">   {stats2['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)'] === null ? 'N/A' : stats2['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>


</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Return on Equity (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>

</TableBody> : 

    stats?.['Financial Highlights']?.['Management Effectiveness'] && stats2?.['Financial Highlights']?.['Management Effectiveness'] && stats3?.['Financial Highlights']?.['Management Effectiveness'] && typeof stats4?.['Financial Highlights']?.['Management Effectiveness']==='undefined' ? <TableBody>
      
      <StyledTableRow >
      <StyledTableCell  align="center">Return on Assets (ttm)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)']} </StyledTableCell>
      <StyledTableCell align="center">   {stats2['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)'] === null ? 'N/A' : stats2['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)']} </StyledTableCell>
      <StyledTableCell align="center">   {stats3['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)'] === null ? 'N/A' : stats3['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>

</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Return on Equity (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats3['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>

          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>

</TableBody> : 

    stats?.['Financial Highlights']?.['Management Effectiveness'] && stats2?.['Financial Highlights']?.['Management Effectiveness'] && stats3?.['Financial Highlights']?.['Management Effectiveness'] && stats4?.['Financial Highlights']?.['Management Effectiveness']? <TableBody>
      
    <StyledTableRow >
                <StyledTableCell align="center"> Return on Assets (ttm) </StyledTableCell>
                <StyledTableCell align="center"> {stats['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)']} </StyledTableCell>
                <StyledTableCell align="center"> {stats2['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)'] === null ? 'N/A' : stats2['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)']} </StyledTableCell>
                <StyledTableCell align="center"> {stats3['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)'] === null ? 'N/A' : stats3['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)']} </StyledTableCell>
                <StyledTableCell align="center"> {stats4['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)'] === null ? 'N/A' : stats4['Financial Highlights']['Management Effectiveness']['Return on Assets (ttm)']} </StyledTableCell>

    </StyledTableRow>
    <StyledTableRow>
                    <StyledTableCell  align="center">Return on Equity (ttm)</StyledTableCell>
                    <StyledTableCell align="center"> {stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats3['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats4['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats4['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>


    </StyledTableRow>
  
    </TableBody> : ""}






    </Table>
</TableContainer>
</Grid>

</Box>



<Grid ><Typography sx={{fontWeight: 600 ,fontSize: 18}} align='left' marginLeft={2}>Income Statement </Typography></Grid>
    <div style={{ padding: "3px" }}></div>
        <Box  sx={{ flexGrow: 3 }} display="flex"
  justifyContent="center"
  alignItems="center"marginLeft={2.5} marginRight={1}  mt={2.5}>
      <Grid container spacing={{ xs: 1, md: 2,lg:2}} columns={{ xs: 0.3, sm: 0.3, md: 16 ,lg:16}} display="flex"
  justifyContent="center"
  alignItems="center" >
<TableContainer  style={{width:1200,height:630}}> 
<Table style={{border: "2px solid #808080", borderBottom: "2px solid #808080",}}
sx={{alignItems: "center",}} >
          

    <TableHead  style={{border: "3px solid #808080", borderBottom: "1px solid #808080"}}
sx={{alignItems: "center",}}>
          <StyledTableRow >
            <StyledTableCell align="center"> Company </StyledTableCell>
            <StyledTableCell  align="center">{companyData.name} </StyledTableCell>
            <StyledTableCell  align="center">{companyData2.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData3.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData4.name} </StyledTableCell>
        </StyledTableRow>
       
    </TableHead>
    {stats?.['Financial Highlights']?.['Income Statement'] && stats2?.['Financial Highlights']?.['Income Statement'] && typeof  stats3?.['Financial Highlights']?.['Income Statement']==='undefined' && typeof stats4?.['Financial Highlights']?.['Income Statement']==='undefined' ? <TableBody>
      
      <StyledTableRow >
      <StyledTableCell  align="center">Diluted EPS (ttm)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Diluted EPS (ttm)']}</StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Diluted EPS (ttm)']}</StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>


</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">EBITDA</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['EBITDA'] === null ? 'N/A' : stats['Financial Highlights']['Income Statement']['EBITDA']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['EBITDA'] === null ? 'N/A' : stats2['Financial Highlights']['Income Statement']['EBITDA']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Gross Profit (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Gross Profit (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Gross Profit (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Net Income Avi to Common (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Quarterly Earnings Growth (yoy)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Net Income Avi to Common (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Net Income Avi to Common (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Quarterly Revenue Growth (yoy)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Revenue (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Revenue (ttm)']}</StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Revenue (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Revenue Per Share (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Revenue Per Share (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Financial Highlights']['Income Statement']['Revenue Per Share (ttm)']}  </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>
</StyledTableRow>

</TableBody> : 

    stats?.['Financial Highlights']?.['Income Statement'] && stats2?.['Financial Highlights']?.['Income Statement'] && stats3?.['Financial Highlights']?.['Income Statement'] && typeof stats4?.['Financial Highlights']?.['Income Statement']==='undefined' ? <TableBody>
      
      <StyledTableRow >
      <StyledTableCell  align="center">Diluted EPS (ttm)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Diluted EPS (ttm)']}</StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Diluted EPS (ttm)']}</StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Diluted EPS (ttm)']}</StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>


</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">EBITDA</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['EBITDA'] === null ? 'N/A' : stats['Financial Highlights']['Income Statement']['EBITDA']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['EBITDA'] === null ? 'N/A' : stats2['Financial Highlights']['Income Statement']['EBITDA']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['EBITDA'] === null ? 'N/A' : stats3['Financial Highlights']['Income Statement']['EBITDA']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Gross Profit (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Gross Profit (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Gross Profit (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Gross Profit (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Net Income Avi to Common (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats3['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Quarterly Earnings Growth (yoy)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Net Income Avi to Common (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Net Income Avi to Common (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Net Income Avi to Common (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Quarterly Revenue Growth (yoy)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)'] === null ? "N/A" :stats3['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Revenue (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Revenue (ttm)']}</StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Revenue (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Revenue (ttm)']}</StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Revenue Per Share (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Revenue Per Share (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Financial Highlights']['Income Statement']['Revenue Per Share (ttm)']}  </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Revenue Per Share (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">  </StyledTableCell>
</StyledTableRow>

</TableBody> : 

    stats?.['Financial Highlights']?.['Income Statement'] && stats2?.['Financial Highlights']?.['Income Statement'] && stats3?.['Financial Highlights']?.['Income Statement'] && stats4?.['Financial Highlights']?.['Income Statement']? <TableBody>
      
      <StyledTableRow >
      <StyledTableCell  align="center">Diluted EPS (ttm)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Diluted EPS (ttm)']}</StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Diluted EPS (ttm)']}</StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Diluted EPS (ttm)']}</StyledTableCell>
      <StyledTableCell align="center"> {stats4['Financial Highlights']['Income Statement']['Diluted EPS (ttm)']}</StyledTableCell>


</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">EBITDA</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['EBITDA'] === null ? 'N/A' : stats['Financial Highlights']['Income Statement']['EBITDA']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['EBITDA'] === null ? 'N/A' : stats2['Financial Highlights']['Income Statement']['EBITDA']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['EBITDA'] === null ? 'N/A' : stats3['Financial Highlights']['Income Statement']['EBITDA']} </StyledTableCell>
          <StyledTableCell align="center"> {stats4['Financial Highlights']['Income Statement']['EBITDA'] === null ? 'N/A' : stats4['Financial Highlights']['Income Statement']['EBITDA']} </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Gross Profit (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Gross Profit (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Gross Profit (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Gross Profit (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats4['Financial Highlights']['Income Statement']['Gross Profit (ttm)']} </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Net Income Avi to Common (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats2['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats3['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats4['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)'] === null ? "N/A" : stats3['Financial Highlights']['Management Effectiveness']['Return on Equity (ttm)']} </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Quarterly Earnings Growth (yoy)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Net Income Avi to Common (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Net Income Avi to Common (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Net Income Avi to Common (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats4['Financial Highlights']['Income Statement']['Net Income Avi to Common (ttm)']} </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Quarterly Revenue Growth (yoy)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)'] === null ? "N/A" :stats3['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats4['Financial Highlights']['Income Statement']['Quarterly Revenue Growth (yoy)']} </StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Revenue (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Revenue (ttm)']}</StyledTableCell>
          <StyledTableCell align="center"> {stats2['Financial Highlights']['Income Statement']['Revenue (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Revenue (ttm)']}</StyledTableCell>
          <StyledTableCell align="center"> {stats4['Financial Highlights']['Income Statement']['Revenue (ttm)']}</StyledTableCell>



</StyledTableRow>
<StyledTableRow>
          <StyledTableCell  align="center">Revenue Per Share (ttm)</StyledTableCell>
          <StyledTableCell align="center"> {stats['Financial Highlights']['Income Statement']['Revenue Per Share (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Financial Highlights']['Income Statement']['Revenue Per Share (ttm)']}  </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Financial Highlights']['Income Statement']['Revenue Per Share (ttm)']} </StyledTableCell>
          <StyledTableCell align="center"> {stats4['Financial Highlights']['Income Statement']['Revenue Per Share (ttm)']} </StyledTableCell>
</StyledTableRow>
    </TableBody> : ""}






    </Table>
</TableContainer>
</Grid>

</Box>




<Grid ><Typography sx={{fontWeight: 600 ,fontSize: 18}} align='left' marginLeft={2}>Balance Sheet </Typography></Grid>
<div style={{ padding: "3px" }}></div>
<Box  sx={{ flexGrow: 3 }} display="flex"
  justifyContent="center"
  alignItems="center"marginLeft={2.5} marginRight={1}  mt={2.5}>
      <Grid container spacing={{ xs: 1, md: 2,lg:2}} columns={{ xs: 0.3, sm: 0.3, md: 16 ,lg:16}} display="flex"
  justifyContent="center"
  alignItems="center" >
<TableContainer  style={{width:1200,height:500}}> 
<Table style={{border: "2px solid #808080", borderBottom: "2px solid #808080", }}
sx={{alignItems: "center",}} >
          

    <TableHead  style={{border: "3px solid #808080", borderBottom: "1px solid #808080"}}
sx={{alignItems: "center",}}>
          <StyledTableRow >
            <StyledTableCell align="center"> Company </StyledTableCell>
            <StyledTableCell  align="center">{companyData.name} </StyledTableCell>
            <StyledTableCell  align="center">{companyData2.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData3.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData4.name} </StyledTableCell>
        </StyledTableRow>
       
    </TableHead>
    {stats?.['Financial Highlights']?.['Balance Sheet'] && stats2?.['Financial Highlights']?.['Balance Sheet'] && typeof  stats3?.['Financial Highlights']?.['Balance Sheet']==='undefined' && typeof stats4?.['Financial Highlights']?.['Balance Sheet']==='undefined' ? <TableBody>
      
    <StyledTableRow >
      <StyledTableCell  align="center">Book Value Per Share (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)'] === null ? 'N/A' : stats2['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow >
      <StyledTableCell  align="center">Current Ratio (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)'] === null ? 'N/A' : stats2['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow >
      <StyledTableCell  align="center">Total Cash (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Cash (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Cash (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Total Cash Per Share (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Cash Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Cash Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Total Debt (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Debt (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Debt (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>

    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Total Debt/Equity (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)'] === null ? 'N/A' : stats2['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
    </StyledTableRow>



</TableBody> : 

    stats?.['Financial Highlights']?.['Balance Sheet'] && stats2?.['Financial Highlights']?.['Balance Sheet'] && stats3?.['Financial Highlights']?.['Balance Sheet'] && typeof stats4?.['Financial Highlights']?.['Balance Sheet']==='undefined' ? <TableBody>
    <StyledTableRow >
      <StyledTableCell  align="center">Book Value Per Share (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)'] === null ? 'N/A' : stats2['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)'] === null ? 'N/A' : stats3['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>

    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Current Ratio (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)'] === null ? 'N/A' : stats2['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)'] === null ? 'N/A' : stats3['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Total Cash (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Cash (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Cash (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Total Cash (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Total Cash Per Share (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Cash Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Cash Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Total Cash Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Total Debt (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Debt (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Debt (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Total Debt (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>

    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Total Debt/Equity (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)'] === null ? 'N/A' : stats2['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)'] === null ? 'N/A' : stats3['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)']} </StyledTableCell>
      <StyledTableCell align="center">  </StyledTableCell>
    </StyledTableRow>
     

</TableBody> : 

    stats?.['Financial Highlights']?.['Balance Sheet'] && stats2?.['Financial Highlights']?.['Balance Sheet'] && stats3?.['Financial Highlights']?.['Balance Sheet'] && stats4?.['Financial Highlights']?.['Balance Sheet']? <TableBody>
      
    <StyledTableRow >
      <StyledTableCell  align="center">Book Value Per Share (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)'] === null ? 'N/A' : stats2['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)'] === null ? 'N/A' : stats3['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats4['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)'] === null ? 'N/A' : stats4['Financial Highlights']['Balance Sheet']['Book Value Per Share (mrq)']} </StyledTableCell>
    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Current Ratio (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)'] === null ? 'N/A' : stats2['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)'] === null ? 'N/A' : stats3['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats4['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)'] === null ? 'N/A' : stats4['Financial Highlights']['Balance Sheet']['Current Ratio (mrq)']} </StyledTableCell>
    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Total Cash (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Cash (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Cash (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Total Cash (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats4['Financial Highlights']['Balance Sheet']['Total Cash (mrq)']} </StyledTableCell>
    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Total Cash Per Share (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Cash Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Cash Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Total Cash Per Share (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats4['Financial Highlights']['Balance Sheet']['Total Cash Per Share (mrq)']} </StyledTableCell>
    </StyledTableRow>


    <StyledTableRow >
      <StyledTableCell  align="center">Total Debt (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Debt (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Debt (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Total Debt (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats4['Financial Highlights']['Balance Sheet']['Total Debt (mrq)']} </StyledTableCell>
    </StyledTableRow>

    <StyledTableRow >
      <StyledTableCell  align="center">Total Debt/Equity (mrq)</StyledTableCell>
      <StyledTableCell align="center"> {stats['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)'] === null ? 'N/A' : stats['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats2['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)'] === null ? 'N/A' : stats2['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats3['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)'] === null ? 'N/A' : stats3['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)']} </StyledTableCell>
      <StyledTableCell align="center"> {stats4['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)'] === null ? 'N/A' : stats4['Financial Highlights']['Balance Sheet']['Total Debt/Equity (mrq)']} </StyledTableCell>
    </StyledTableRow>
    </TableBody> : ""}






    </Table>
</TableContainer>
</Grid>

</Box>


<Grid ><Typography sx={{fontWeight: 600 ,fontSize: 18}} align='left' marginLeft={2}>Cash Flow Statement </Typography></Grid>
    <div style={{ padding: "3px" }}></div>
        <Box  sx={{ flexGrow: 3 }} display="flex"
  justifyContent="center"
  alignItems="center"marginLeft={2.5} marginRight={1}  mt={2.5}>
      <Grid container spacing={{ xs: 1, md: 2,lg:2}} columns={{ xs: 0.3, sm: 0.3, md: 16 ,lg:16}} display="flex"
  justifyContent="center"
  alignItems="center" >
<TableContainer  style={{width:1200,height:270}}> 
<Table style={{border: "2px solid #808080", borderBottom: "2px solid #808080",}}
sx={{alignItems: "center",}} >
          

    <TableHead  style={{border: "3px solid #808080", borderBottom: "1px solid #808080"}}
sx={{alignItems: "center",}}>
          <StyledTableRow >
            <StyledTableCell align="center"> Company </StyledTableCell>
            <StyledTableCell  align="center">{companyData.name} </StyledTableCell>
            <StyledTableCell  align="center">{companyData2.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData3.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData4.name} </StyledTableCell>
        </StyledTableRow>
       
    </TableHead>
    {stats?.['Financial Highlights']?.['Cash Flow statement'] && stats2?.['Financial Highlights']?.['Cash Flow statement'] && typeof  stats3?.['Financial Highlights']?.['Cash Flow statement']==='undefined' && typeof stats4?.['Financial Highlights']?.['Cash Flow statement']==='undefined' ? <TableBody>
      

    <StyledTableRow>
          <StyledTableCell  align="center">Levered Free Cash Flow (ttm)</StyledTableCell>
          <StyledTableCell align="center">{stats['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)'] === null ? 'N/A' : stats2['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)']} </StyledTableCell>
          <StyledTableCell  align="center"></StyledTableCell>
          <StyledTableCell  align="center"></StyledTableCell>

    </StyledTableRow>
    
    <StyledTableRow>
          <StyledTableCell  align="center">Operating Cash Flow (ttm)</StyledTableCell>
          <StyledTableCell align="center">{stats['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)'] === null ? 'N/A' : stats2['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)']} </StyledTableCell>
          <StyledTableCell  align="center"></StyledTableCell>
          <StyledTableCell  align="center"></StyledTableCell>

    </StyledTableRow>

</TableBody> : 

    stats?.['Financial Highlights']?.['Cash Flow statement'] && stats2?.['Financial Highlights']?.['Cash Flow statement'] && stats3?.['Financial Highlights']?.['Cash Flow statement'] && typeof stats4?.['Financial Highlights']?.['Cash Flow statement']==='undefined' ? <TableBody>
      

      <StyledTableRow>
          <StyledTableCell  align="center">Levered Free Cash Flow (ttm)</StyledTableCell>
          <StyledTableCell align="center">{stats['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)'] === null ? 'N/A' : stats2['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)'] === null ? 'N/A' : stats3['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)']} </StyledTableCell>
          <StyledTableCell  align="center"></StyledTableCell>

    </StyledTableRow>
    
    <StyledTableRow>
          <StyledTableCell  align="center">Operating Cash Flow (ttm)</StyledTableCell>
          <StyledTableCell align="center">{stats['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)'] === null ? 'N/A' : stats2['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)'] === null ? 'N/A' : stats3['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)']} </StyledTableCell>
          <StyledTableCell  align="center"></StyledTableCell>

    </StyledTableRow>

</TableBody> : 

   
stats?.['Financial Highlights']?.['Cash Flow statement'] && stats2?.['Financial Highlights']?.['Cash Flow statement'] && stats3?.['Financial Highlights']?.['Cash Flow statement'] && stats4?.['Financial Highlights']?.['Cash Flow statement'] ? <TableBody>
      

<StyledTableRow>
    <StyledTableCell  align="center">Levered Free Cash Flow (ttm)</StyledTableCell>
    <StyledTableCell align="center">{stats['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)']} </StyledTableCell>
    <StyledTableCell align="center">{stats2['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)'] === null ? 'N/A' : stats2['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)']} </StyledTableCell>
    <StyledTableCell align="center">{stats3['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)'] === null ? 'N/A' : stats3['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)']} </StyledTableCell>
    <StyledTableCell align="center">{stats4['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)'] === null ? 'N/A' : stats4['Financial Highlights']['Cash Flow statement']['Levered Free Cash Flow (ttm)']} </StyledTableCell>

</StyledTableRow>

<StyledTableRow>
    <StyledTableCell  align="center">Operating Cash Flow (ttm)</StyledTableCell>
    <StyledTableCell align="center">{stats['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)'] === null ? 'N/A' : stats['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)']} </StyledTableCell>
    <StyledTableCell align="center">{stats2['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)'] === null ? 'N/A' : stats2['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)']} </StyledTableCell>
    <StyledTableCell align="center">{stats3['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)'] === null ? 'N/A' : stats3['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)']} </StyledTableCell>
    <StyledTableCell align="center">{stats4['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)'] === null ? 'N/A' : stats4['Financial Highlights']['Cash Flow statement']['Operating Cash Flow (ttm)']} </StyledTableCell>

</StyledTableRow>
    </TableBody> : "hi"}






    </Table>
</TableContainer>
</Grid>

</Box>



<Grid ><Typography sx={{fontWeight: 600 ,fontSize: 20}} align='left' marginLeft={2}> Trading Information </Typography></Grid>
<div style={{ padding: "0.5px" }}></div>
<Grid ><Typography sx={{fontWeight: 600 ,fontSize: 18}} align='left' marginLeft={2}> Stock Price History </Typography></Grid>
    <div style={{ padding: "3px" }}></div>
        <Box  sx={{ flexGrow: 3 }} display="flex"
  justifyContent="center"
  alignItems="center"marginLeft={2.5} marginRight={1}  mt={2.5}>
      <Grid container spacing={{ xs: 1, md: 2,lg:2}} columns={{ xs: 0.3, sm: 0.3, md: 16 ,lg:16}} display="flex"
  justifyContent="center"
  alignItems="center" >
<TableContainer  style={{width:1200,height:600}}> 
<Table style={{border: "2px solid #808080", borderBottom: "2px solid #808080"}}
sx={{alignItems: "center",}} >
          

    <TableHead  style={{border: "3px solid #808080", borderBottom: "1px solid #808080"}}
sx={{alignItems: "center",}}>
          <StyledTableRow >
            <StyledTableCell align="center"> Company </StyledTableCell>
            <StyledTableCell  align="center">{companyData.name} </StyledTableCell>
            <StyledTableCell  align="center">{companyData2.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData3.name} </StyledTableCell>
            <StyledTableCell  align="center"> {companyData4.name} </StyledTableCell>
        </StyledTableRow>
       
    </TableHead>
    {stats?.['Trading Information']?.['Stock Price History'] && stats2?.['Trading Information']?.['Stock Price History'] && typeof  stats3?.['Trading Information']?.['Stock Price History']==='undefined' && typeof stats4?.['Trading Information']?.['Stock Price History']==='undefined' 
    ? <TableBody>
      

      <StyledTableRow>
          <StyledTableCell  align="center"> 50-Day Moving Average</StyledTableCell>
          <StyledTableCell align="center"> {stats['Trading Information']['Stock Price History']['50-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Trading Information']['Stock Price History']['50-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>

    <StyledTableRow>
          <StyledTableCell  align="center"> 52 Week High</StyledTableCell>
          <StyledTableCell align="center"> {stats['Trading Information']['Stock Price History']['52 Week High 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Trading Information']['Stock Price History']['52 Week High 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> 52 Week Low</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['52 Week Low 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['52 Week Low 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> 52 Week Change</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['52-Week Change 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> 200-Day Moving Average</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['200-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['200-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> Beta (5Y Monthly)</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['Beta (5Y Monthly)']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['Beta (5Y Monthly)']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center">S&P500 52-Week Change</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['S&P500 52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['S&P500 52-Week Change 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
  
</TableBody> : 

stats?.['Trading Information']?.['Stock Price History'] && stats2?.['Trading Information']?.['Stock Price History'] && typeof  stats3?.['Trading Information']?.['Stock Price History'] && typeof stats4?.['Trading Information']?.['Stock Price History']==='undefined' 
? <TableBody>
      

      <StyledTableRow>
          <StyledTableCell  align="center"> 50-Day Moving Average</StyledTableCell>
          <StyledTableCell align="center"> {stats['Trading Information']['Stock Price History']['50-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Trading Information']['Stock Price History']['50-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Trading Information']['Stock Price History']['50-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>

    <StyledTableRow>
          <StyledTableCell  align="center"> 52 Week High</StyledTableCell>
          <StyledTableCell align="center"> {stats['Trading Information']['Stock Price History']['52 Week High 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Trading Information']['Stock Price History']['52 Week High 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Trading Information']['Stock Price History']['52 Week High 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> 52 Week Low</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['52 Week Low 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['52 Week Low 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['52 Week Low 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> 52 Week Change</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['52-Week Change 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> 200-Day Moving Average</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['200-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['200-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['200-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> Beta (5Y Monthly)</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['Beta (5Y Monthly)']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['Beta (5Y Monthly)']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['Beta (5Y Monthly)']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center">S&P500 52-Week Change</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['S&P500 52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['S&P500 52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['S&P500 52-Week Change 3']} </StyledTableCell>
          <StyledTableCell  align="center"> </StyledTableCell>         
    </StyledTableRow>
  
</TableBody> : 

stats?.['Trading Information']?.['Stock Price History'] && stats2?.['Trading Information']?.['Stock Price History'] && typeof  stats3?.['Trading Information']?.['Stock Price History'] &&  stats4?.['Trading Information']?.['Stock Price History']
? <TableBody>
      

      <StyledTableRow>
          <StyledTableCell  align="center"> 50-Day Moving Average</StyledTableCell>
          <StyledTableCell align="center"> {stats['Trading Information']['Stock Price History']['50-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Trading Information']['Stock Price History']['50-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Trading Information']['Stock Price History']['50-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Trading Information']['Stock Price History']['50-Day Moving Average 3']} </StyledTableCell>
    </StyledTableRow>

    <StyledTableRow>
          <StyledTableCell  align="center"> 52 Week High</StyledTableCell>
          <StyledTableCell align="center"> {stats['Trading Information']['Stock Price History']['52 Week High 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats2['Trading Information']['Stock Price History']['52 Week High 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Trading Information']['Stock Price History']['52 Week High 3']} </StyledTableCell>
          <StyledTableCell align="center"> {stats3['Trading Information']['Stock Price History']['52 Week High 3']} </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> 52 Week Low</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['52 Week Low 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['52 Week Low 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['52 Week Low 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['52 Week Low 3']} </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> 52 Week Change</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['52-Week Change 3']} </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> 200-Day Moving Average</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['200-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['200-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['200-Day Moving Average 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['200-Day Moving Average 3']} </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center"> Beta (5Y Monthly)</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['Beta (5Y Monthly)']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['Beta (5Y Monthly)']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['Beta (5Y Monthly)']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['Beta (5Y Monthly)']} </StyledTableCell>
    </StyledTableRow>
    <StyledTableRow>
          <StyledTableCell  align="center">S&P500 52-Week Change</StyledTableCell>
          <StyledTableCell align="center">{stats['Trading Information']['Stock Price History']['S&P500 52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats2['Trading Information']['Stock Price History']['S&P500 52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['S&P500 52-Week Change 3']} </StyledTableCell>
          <StyledTableCell align="center">{stats3['Trading Information']['Stock Price History']['S&P500 52-Week Change 3']} </StyledTableCell>
    </StyledTableRow>
  
</TableBody> :  ""}
    </Table>
</TableContainer>
</Grid>
</Box>
</div>
</ThemeProvider>
 
   )
}









