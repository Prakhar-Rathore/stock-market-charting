import React,{useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import { Grid, Box,Link,Paper,Stack,SxProps,Table,TableBody,TableCell,TableContainer,TableHead,TableRow, } from '@mui/material';
import { Autocomplete, InputBase } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Typography from '@mui/material/Typography';
import { experimentalStyled as styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import apiCall from "../../apiCall/apiCall";
import { routes } from "../../config/serverconfig";
import Modal from '@mui/material/Modal';
import { ListItemText,ListItem} from "@mui/material";
import Header from "./Header";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { auth } from "../../firebase";
import IpoForm from "../Admin/ipoForm";

const PROD_SERV_ADDRESS_API = routes.PROD_SERV_ADDRESS_API;
 
const style = {
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
width: "60%",
height:"80%",
bgcolor: 'background.paper',
border: '2px solid #000',
boxShadow: 24,
overflow:"scroll",
p: 4,
 
};
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
      fontSize: 16,
    },
    body2:
    {
      fontWeight: 500,
      fontSize: 16,
    }
    ,
    body3:
    {
      fontWeight: 700,
      fontSize: 26,
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
      fontSize: 16,
 
    },
    body2:
    {
      fontWeight: 500,
      fontSize: 16,
    },
    body3:
    {
      fontWeight: 700,
      fontSize: 26,
    }
 
  },
 
 
 
});
 
const tableContainer = {
    border: "1px solid #89CFF0",
    width: "max-content",
    marginLeft: "30px",
    marginRight: "auto",
    marginTop: 4,
    borderRadius: 2,
    maxHeight: 500
  };
 
export default function IpoDashboard({companyData,setCompanyData}) {
 
  const [readMore, setReadMore] = useState(false);
  const link = <a className="read-more-link" style={{
      color: "blue", textDecoration: "underline",
      letterSpacing: "1px", cursor: "pointer"
  }} onClick={() => { setReadMore(!readMore) }}>Read more</a>;
  
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
 

const [allCompaniesIpo,setAllCompaniesIpo] = useState([]);
const [light, setLight] = useState(true);
const [se, setSe] = useState('');
const [curData,setCurData] = React.useState([]);
const [closedData,setClosedData] = React.useState([]);
const [upcomingData,setUpcomingData] = React.useState([]);
const [allData,setAllData] = React.useState([]);
const [companyName, setCompanyName] = useState('');
const [truth,setTruth] = useState(false);
 const [open, setOpen] = useState(false);
 const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
const [datas,setDatas] = useState({});
const [financeData,setFinanceData]=useState([]);
const [isAdmin, setIsAdmin] = React.useState(false);
const [idToken, setIdToken] = React.useState(null);
const [addModalOpen, setAddModalOpen] = React.useState(false);
const handleAddModalOpen = () => setAddModalOpen(true);
const handleAddModalClose = () => setAddModalOpen(false);

const tableHead =  
<TableHead >
<TableRow style={{ backgroundColor: "#191b39" }}>
  <TableCell scope="header" align="center" style={{fontWeight : "bold",textAlign:"center",width:'20%'}}>Company</TableCell>
  <TableCell scope="header" style={{fontWeight : "bold"}}>Exchange</TableCell>
  <TableCell scope="header" style={{fontWeight : "bold"}}>Status</TableCell>
  <TableCell scope="header" style={{fontWeight : "bold"}}>SecurityType</TableCell>
  <TableCell scope="header" style={{fontWeight : "bold"}}>Symbol</TableCell>
  <TableCell scope="header" style={{fontWeight : "bold",width:'40%'}}>Open</TableCell>
  <TableCell scope="header" style={{fontWeight : "bold",width:'40%'}}>Close</TableCell>
  <TableCell scope="header" style={{fontWeight : "bold"}}>IssuePrice(₹)</TableCell>
  <TableCell scope="header" style={{fontWeight : "bold"}}>IssueSize(Rs.Cr)</TableCell>
  <TableCell scope="header" style={{fontWeight : "bold"}}>MarketLot</TableCell>
</TableRow>
</TableHead>;
 
React.useEffect(() => {
  const fetchData = async ()=>{
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
    const res = await apiCall(
      `${PROD_SERV_ADDRESS_API}/Ipo/current`,
      "GET",
      null
  )
  if (res.status === 200) {
    if(res.data.data.length !== 0){
      console.log(res.data.data.length);
      res.data.data.forEach(cur => {
        const temp = {
          company : cur && cur.companyName,
          exchange: cur.exchangesListed.map((d) => (d+" ")),
          status: "Current",
          securitytype: cur && cur.securityType,
          symbol: cur && cur.symbol,
          open:cur && cur.issueStart.split('T')[0], //sliced to ignore timestamp
          close:cur && cur.issueEnd.split('T')[0],
          price:cur && cur.issuePrice,
          size:cur && cur.issueSize.toFixed(2),
          lot:cur && cur.marketLot,
      };
        setCurData(curData => [...curData, temp]);
        setAllData(allData => [...allData, temp]);
        setAllCompaniesIpo(allCompaniesIpo => [...allCompaniesIpo,temp.company]);  
});
          }
    else{
      console.log("curipodetails is empty");
    }
      
  }
  const res1 = await apiCall(
    `${PROD_SERV_ADDRESS_API}/Ipo/recent`,
    "GET",
    null
)
if (res1.status === 200) {
  if(res1.data.data.length !== 0){
    res1.data.data.forEach(closed => {
      const temp1 = {
        company : closed && closed.companyName,
        exchange: closed.exchangesListed.map((d) => (d+" ")),
        status: "Closed",
        securitytype: closed && closed.securityType,
        symbol: closed && closed.symbol,
        open:closed && closed.issueStart.split('T')[0], //sliced to ignore timestamp
        close:closed && closed.issueEnd.split('T')[0],
        price:closed && closed.issuePrice,
        size:closed && closed.issueSize.toFixed(2),
        lot:closed && closed.marketLot,
    };
    setClosedData(closedData => [...closedData,temp1]);
    setAllData(allData => [...allData, temp1]);    
    setAllCompaniesIpo(allCompaniesIpo => [...allCompaniesIpo,temp1.company]);  
    });
}
  else{
    console.log("closedipodetails is empty");
  }
}  
const res2 = await apiCall(
  `${PROD_SERV_ADDRESS_API}/Ipo/upcoming`,
  "GET",
  null
)
if (res2.status === 200) {
  if(res2.data.data.length !== 0){
    res2.data.data.forEach(upcoming => {
      const temp2 = {
        company : upcoming && upcoming.companyName,
        exchange: upcoming.exchangesListed.map((d) => (d+" ")),
        status: "Upcoming",
        securitytype: upcoming && upcoming.securityType,
        symbol: upcoming && upcoming.securityType,
        open:upcoming && upcoming.issueStart.split('T')[0], //sliced to ignore timestamp
        close:upcoming && upcoming.issueEnd.split('T')[0],
        price:upcoming && upcoming.issuePrice,
        size:upcoming && upcoming.issueSize.toFixed(2),
        lot:upcoming && upcoming.marketLot,
    };
      setUpcomingData(upcomingData => [...upcomingData, temp2]);
      setAllData(allData => [...allData, temp2]);
      setAllCompaniesIpo(allCompaniesIpo => [...allCompaniesIpo,temp2.company]);  
  });

  }
  else{
    console.log("upcomingipodetails is empty");
  }
}

  };
   fetchData();
}, []);
 
function Onchangehandler(value){
  if(value === 1){
    setAllData([...closedData, ...curData, ...upcomingData]);
   }
   else if(value === 2){
    setAllData(closedData);
  }
   else if(value === 3){
      setAllData(curData);
  }
   else if(value === 4){
      setAllData(upcomingData);
 }
}
 
 
  const handleOpenModal = async(cmp)=>{
    console.log(cmp);
    const res = await apiCall(
      `${PROD_SERV_ADDRESS_API}/Ipo/details?companyName=`+ cmp,
      "GET",
      null
  )
  if (res.status === 200) {
    console.log(res.data);
     setDatas(res.data.data);
     setFinanceData(res.data.data.companyFinancials)
  }
  handleOpen();
  }
  
const Row=()=>{
 
 return (!truth || companyName==null) ? (
  allData.map((d, index) => (
      <TableRow key={d.company} style={{ backgroundColor: index%2 === 0 ? "#13152c" : "#181b37" }}>
         <Tooltip title="click to know about the company">
        <TableCell scope="row">
     <Button style={{fontSize: "14px",color:(light ?"white":"black" ),fontWeight : "bold",cursor : "pointer", }} onClick={()=>handleOpenModal(d.company)}>{d.company}</Button>
        </TableCell>
        </Tooltip>
        <TableCell style={{fontSize: "16px"}} scope="row">
        <div>{d.exchange}</div>
        </TableCell>
        <TableCell style={{fontSize: "16px"}} scope="row">
        <div>{d.status}</div>
        </TableCell>
        <TableCell style={{fontSize: "16px"}} scope="row">
        <div>{d.securitytype}</div>
        </TableCell>
        <TableCell style={{fontSize: "16px"}} scope="row">
     <div>{d.symbol}</div>
     </TableCell>
        <TableCell style={{fontSize: "16px"}} scope="row">
        <div>{d.open}</div>
        </TableCell>
        <TableCell style={{fontSize: "16px"}} scope="row">
        <div>{d.close}</div>
        </TableCell>
        <TableCell style={{fontSize: "16px"}} scope="row">
        <div style={{ textAlign: "right" }}>{d.price}</div>
        </TableCell>
        <TableCell scope="row">
        <div style={{ textAlign: "right" }}>{d.size}</div>
        </TableCell>
        <TableCell style={{fontSize: "16px"}} scope="row">
        <div style={{ textAlign: "right" }}>{d.lot}</div>
        </TableCell>
      </TableRow>
    )))
    :
    (
      allData.filter(s=> s.company==companyName).map((d) => (
      <TableRow key={d.company}>
      <Tooltip title="click to know about the company">
     <TableCell style={{fontSize: "14px"}} scope="row">
         <Button style={{fontSize: "16px",color:(light ?"white":"black" ),fontWeight : "bold",cursor : "pointer", }} onClick={()=>handleOpenModal(d.company)}>{d.company}</Button>
     </TableCell>
     </Tooltip>
     <TableCell style={{fontSize: "16px"}} scope="row">
     <div>{d.exchange}</div>
     </TableCell>
     <TableCell style={{fontSize: "16px"}} scope="row">
        <div>{d.status}</div>
        </TableCell>
     <TableCell style={{fontSize: "16px"}} scope="row">
     <div>{d.securitytype}</div>
     </TableCell>
     <TableCell style={{fontSize: "16px"}} scope="row">
     <div>{d.symbol}</div>
     </TableCell>
     <TableCell style={{fontSize: "16px"}} scope="row">
     <div>{d.open}</div>
     </TableCell>
     <TableCell style={{fontSize: "16px"}} scope="row">
     <div>{d.close}</div>
     </TableCell>
     <TableCell style={{fontSize: "16px"}} scope="row">
     <div style={{ textAlign: "right" }}>{d.price}</div>
     </TableCell>
     <TableCell style={{fontSize: "16px"}} scope="row">
     <div style={{ textAlign: "right" }}>{d.size}</div>
     </TableCell>
     <TableCell style={{fontSize: "16px"}} scope="row">
     <div style={{ textAlign: "right" }}>{d.lot}</div>
     </TableCell>
   </TableRow>
      )  
      )
    )
     
      }
 
      if(curData===undefined || closedData===undefined || upcomingData===undefined
        )
    {
        return (
            <>
            <Header setCompanyData={setCompanyData}/>
        <main style={{ position: "absolute", left: "68px", top: "70px" }}>
                        <div>loading...</div>
                    </main>
        </>
    )
    }
    else { 
      return (
        <>
        <IpoForm open={addModalOpen} handleOpen={handleAddModalOpen} handleClose={handleAddModalClose} />
        <Header setCompanyData={setCompanyData}/>
        <ThemeProvider theme={light ? themeDark : themeLight}>
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description">
          <div>
            <div>
            <Box sx={style}>
            <Grid container
// spacing={2}
// ml={15} mr={10}
>


<Grid item xs={9} md={9}  >
{/* <Item>xs=4 md=8</Item> */}
<Typography  paddingTop="3px" id="modal-modal-title" variant="h4"   fontWeight="600"   fontSize="32px" align="right" marginLeft={1} style={{fontWeight: 'bold',color:(light ?"#89CFF0":"black"),fontSize:"26px" ,textAlign: 'right'}}>  {datas.companyName}</Typography>
</Grid>
<Grid item xs={2} md={2}>

</Grid>
<Grid item xs={1} md={1} align="right" >
<IconButton  aria-label="close" onClick={handleClose}>
      <CloseIcon />
    </IconButton>
</Grid>



</Grid>
               {/* <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontWeight: 'bold',color:(light ?"#89CFF0":"black"),fontSize:"26px" ,textAlign: 'center'}}>
                 {datas.companyName}
               </Typography>
               <span><IconButton aria-label="close" onClick={handleClose}>
      <CloseIcon />
    </IconButton>
    </span> */}
               <ListItem style={{justifyContent: 'center' }}>
                <ListItemText style={{ align: 'center' }}>
              <a href="#about" style={{fontSize:"26px", fontWeight: "800", textAlign: 'center', textDecoration: "none", color:(light ?"#89CFF0":"black" )}}>About</a>
              </ListItemText>
              </ListItem>   
               <Grid item id="about" xs={12} >
     
              <div component="h4" align="left" style={{ fontWeight: "400",marginLeft: "15px", width: "95%" }}>{datas.aboutCompany}</div>
            </Grid>
               <ListItem style={{ justifyContent: 'center' }}>
                           
               <ListItemText style={{ align: 'center' }}>
          <a href="#about" style={{ fontSize:"26px",fontWeight: "800", textAlign: 'center', textDecoration: "none",color:(light ?"#89CFF0":"black" ) }}>Company Financials</a>
             </ListItemText>
            </ListItem>
           
            <Grid className="grid" container spacing={2} marginLeft={2}>
          <TableContainer sx={tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={1}>
                  <Typography style={{ fontSize:"16px",fontWeight: "bold", textDecoration: "none", color:(light ?"white":"black" ) }}>Particulars</Typography>
                  </TableCell>
                  <TableCell align="center" colSpan={4}>
                  <Typography style={{ fontSize:"16px",fontWeight: "bold", textDecoration: "none", color:(light ?"white":"black" ) }}>For the year / period ended ( ₹ in crores )</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                <TableCell>
    
                </TableCell>
                {financeData && financeData.map((dcf) => {
                  return(
                    <TableCell
                      key={dcf.periodEnded}
                      align="right"
                    >
                    <Typography style={{ fontSize:"14px",fontWeight: "bold", textDecoration: "none",  color:(light ?"white":"black" )}}>{dcf.periodEnded}</Typography>
                    </TableCell>
                ) })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                  <Typography style={{ fontSize:"14px",fontWeight: "bold", textDecoration: "none", color:(light ?"white":"black" ) }}>Total Assets</Typography>
                  </TableCell>
                  {financeData && financeData.map((dcf) => {
                    return(
                    <TableCell
                      key={dcf.totalAssests}
                      align="right"
                    >
                    <Typography style={{ fontSize:"14px",fontWeight: "400", textDecoration: "none", color:(light ?"white":"black" ) }}>{(dcf.totalAssets).toFixed(2)}</Typography>
                    </TableCell>
                    )
                 })}
                  </TableRow>
                  <TableRow>
                  <TableCell>
                  <Typography style={{ fontSize:"14px",fontWeight: "bold", textDecoration: "none", color:(light ?"white":"black" ) }}>Total Revenue</Typography>
                  </TableCell>
                  {financeData && financeData.map((dcf) => {
                    return (
                    <TableCell
                      key={dcf.totalRevenue}
                      align="right"
                    >
                    <Typography style={{ fontSize:"14px",fontWeight: "400", textDecoration: "none", color:(light ?"white":"black" ) }}>{(dcf.totalRevenue).toFixed(2)}</Typography>
                    </TableCell>
                    )
                 })}
                  </TableRow>
                  <TableRow>
                  <TableCell>
                  <Typography style={{ fontSize:"14px",fontWeight: "bold", textDecoration: "none", color:(light ?"white":"black" ) }}>Profit after Tax</Typography>
                  </TableCell>
                  {financeData && financeData.map((dcf) => {
                    return (
                    <TableCell
                      key={dcf.profitAfterTax}
                      align="right"
                    >
                    <Typography style={{ fontSize:"14px",fontWeight: "400", textDecoration: "none", color:(light ?"white":"black" ) }}>{(dcf.profitAfterTax).toFixed(2)}</Typography>
                    </TableCell>
                    )
                 })}
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        
    
    </Grid>


  <Grid container marginTop={3} xs={12} 
  sx={{marginLeft : "10px"}}>

    <Grid item xs={4} sx={{
      //background:"red", 
   // borderRight: 1
    }} style={{ padding: "5px"}}>
   
    <div> 
    <a href="#about" style={{ fontSize:"16px",fontWeight: "800", textAlign: 'center', textDecoration: "none", color:(light ?"#89CFF0":"black" ) }}>
    <span style={{ margin: "5px", color:(light ?"#89CFF0":"black" ) }}>Face Value : </span></a>
      <span style={{ fontWeight: "600", margin: "5px",fontSize:"16px"}}>{datas.faceValue}</span>
    </div>
    <div style={{margin:"5px"}}></div>
<div> 
    <a href="#about" style={{ fontSize:"16px",fontWeight: "800", textDecoration: "none", color:(light ?"#89CFF0":"black" ) }}>
      <span style={{ margin: "5px", color:(light ?"#89CFF0":"black" ) }}>Issue Type : </span></a>
      <span style={{ fontWeight: "600", margin: "5px",fontSize:"16px"}}>{datas.issueType}</span>
      </div>
    </Grid>
    <Grid item xs={8}  style={{ padding: "5px"}}
   // sx={{display:"flex", justifyContent:"center",alignItems:"center"}}
    >
    <div> 
    <a href="#about" style={{ fontSize:"16px",fontWeight: "800",textAlign: 'center', textDecoration: "none", color:(light ?"#89CFF0":"black" ) }}>
      <span style={{ margin: "5px", color:(light ?"#89CFF0":"black" ) }}>Sponsor Bank : </span></a>
      <span style={{ fontWeight: "600", margin: "5px",fontSize:"16px"}}>{datas.sponsorBank}</span>
      </div> 
      <div style={{margin:"5px"}}></div>
      <div> 
    <a href="#about" style={{ fontSize:"16px",fontWeight: "800", textDecoration: "none", color:(light ?"#89CFF0":"black" ) }}>
      <span style={{ margin: "5px", color:(light ?"#89CFF0":"black" ) }}>Registrar : </span></a> 
      <span style={{ fontWeight: "600",fontSize:"16px"}}>{datas.registrar}</span>
  </div>
    </Grid>
    </Grid>
    <Grid item xs={12} style={{ margin: "20px", textAlign: "left" }}>
      <a href="#about" style={{ fontSize:"14px",fontWeight: "800", textAlign: 'center', textDecoration: "none", color:(light ?"#89CFF0":"black" ) }}>
      <span style={{ margin: "5px", color:(light ?"#89CFF0":"black" ) }}>Prospectus Gid Download Link</span></a>
      {datas.prospectusGidDownloadLink!= null ?
    <span style={{ fontWeight: "600", margin: "5px",fontSize:"16px" }}>{datas.prospectusGidDownloadLink}</span>
    :
    <span style={{ fontWeight: "600", margin: "5px",fontSize:"16px" }}>Link Unavailable</span>
    }
      </Grid>


    {/* <Grid item xs={2}></Grid>
    <Grid item xs={4} style={{ margin: "10px", textAlign: "left"}}>
    <a href="#about" style={{ fontSize:"20px",fontWeight: "800", textAlign: 'center', textDecoration: "none", color:(light ?"#89CFF0":"black" ) }}>
      <span style={{ margin: "5px", color:(light ?"#89CFF0":"black" ) }}>Face Value</span></a>
      </Grid>
      <Grid item xs={4} style={{ margin: "10px", textAlign: "left"}}>
      <span style={{ fontWeight: "600", margin: "5px"}}>{datas.faceValue}</span>
      </Grid>
    <Grid item xs={2}></Grid>
    <Grid item xs={4} style={{ margin: "10px", textAlign: "left" }}>
    <a href="#about" style={{ fontSize:"20px",fontWeight: "800", textDecoration: "none", color:(light ?"#89CFF0":"black" ) }}>
      <span style={{ margin: "5px", color:(light ?"#89CFF0":"black" ) }}>Issue Type</span></a>
      </Grid>
      <Grid item xs={4}  style={{ margin: "10px", textAlign: "left"}}>
      <span style={{ fontWeight: "600", margin: "5px",fontSize:"18px"}}>{datas.issueType}</span>
    </Grid>
    <Grid item xs={2}></Grid>
     <Grid item xs={4} style={{ margin: "10px", textAlign: "left" }}>
    <a href="#about" style={{ fontSize:"20px",fontWeight: "800", textDecoration: "none", color:(light ?"#89CFF0":"black" ) }}>
      <span style={{ margin: "5px", color:(light ?"#89CFF0":"black" ) }}>Sponsor Bank</span></a>
     </Grid>
     <Grid item xs={4} style={{ margin: "10px", textAlign: "left" }}>
      <span style={{ fontWeight: "600", margin: "5px",fontSize:"18px"}}>{datas.sponsorBank}</span>
    </Grid>
    <Grid item xs={2}></Grid>
    <Grid item xs={4} style={{ margin: "10px", textAlign: "left" }}>
    <a href="#about" style={{ fontSize:"20px",fontWeight: "800", textDecoration: "none", color:(light ?"#89CFF0":"black" ) }}>
      <span style={{ margin: "5px", color:(light ?"#89CFF0":"black" ) }}>Registrar</span></a>
     </Grid>
     <Grid item xs={4} style={{ margin: "10px", textAlign: "left" }}>
      <span style={{ fontWeight: "600", margin: "5px",fontSize:"18px"}}>{datas.registrar}</span>
    </Grid>
    <Grid item xs={2}></Grid>
    <Grid item xs={12} style={{ margin: "10px", textAlign: "left" }}>
      <a href="#about" style={{ fontSize:"20px",fontWeight: "800", textAlign: 'center', textDecoration: "none", color:(light ?"#89CFF0":"black" ) }}>
      <span style={{ margin: "5px", color:(light ?"#89CFF0":"black" ) }}>Prospectus Gid Download Link</span></a>
      {datas.prospectusGidDownloadLink!= null ?
    <span style={{ fontWeight: "600", margin: "5px",fontSize:"18px" }}>{datas.prospectusGidDownloadLink}</span>
    :
    <span style={{ fontWeight: "600", margin: "5px",fontSize:"18px" }}>Link Unavailable</span>
    }
      </Grid>
     */}
   
            
             </Box>
         </div>
          </div>
         
          </Modal>
     
        <Box
          sx={{ flexGrow: 1, alignItems:"baseline" }}
          m={5} pt={5}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end">
          <Grid item sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }} display="flex"
            justifyContent="center"
            alignItems="center" marginLeft={8} marginRight={1} mt={4} width='100%' marginTop="5px">
       
    <SearchIcon style={{ coSelf: "center", margin: "5px" }} />
            <Autocomplete
            size={"small"} 
           
              id="input"
              options={allCompaniesIpo}
              renderInput={(params) => {
                const { InputLabelProps, InputProps, ...rest } = params;
                return <InputBase placeholder='Search for a company...' sx={{ color: light ? "white" : "black", width: "100%" }} {...params.InputProps} {...rest} />
              }}
               onChange={(event, value) => {setCompanyName(value);
                console.log(companyName);
                setTruth(true);}}
              color="primary"
              style={{ width: "75%", border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "10px" }}
            />
           
          </Grid>
          <Tooltip title="toggle between light and dark mode">
            <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
          </Tooltip>

          {isAdmin && <Tooltip title="Add Ipo">
            <Button variant="contained" color="primary" sx={{ height: 40,margin:"10px" }} onClick={handleAddModalOpen}><AddBusinessIcon /></Button>
          </Tooltip>}
        </Box>
        <CssBaseline />
        <Grid container xs={12} >
        <Grid item
        xs={6}
        spacing={{ xs: 1, md: 2, lg: 2 }}
        columns={{ xs: 2, sm: 2, md: 12, lg: 22 }}
       //sx={{background:"red"}}
       display="flex"
       justifyContent="flex-start"
       alignItems="flex-start" 
      //marginLeft="80px" 
      //marginRight={1} 
      //mt={4} 
      //width='25%'
    
      >
    <FormControl sx={{
      width:"50%",
    marginLeft:"75px",
    backgroundColor: "#181b37"
    }}>
    <InputLabel 
    sx={{
      "& label": {
        "&.Mui-focused": {
          marginRight: "400px"
        }
      },
      color: light ? "white" : "black", width: "50%"
    }}
    id="SE">IPO MainBoard</InputLabel>
    <Select
      labelId="SE"
      id="SE"
      value={se}
      label="SE"
      onChange={(event,value)=>{
        setSe(event.target.value);
        setTruth(false);
      Onchangehandler(event.target.value);
      }}
    >
      <MenuItem value={1}>All IPOs</MenuItem>
      <MenuItem value={2}>Closed IPOs</MenuItem>
      <MenuItem value={3}>Current IPOs</MenuItem>
      <MenuItem value={4}>Upcoming IPOs</MenuItem>
    </Select>
    </FormControl>
    </Grid>
        <Grid 
        xs={6}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start" 
          
          //ml={16}
          
        >
      <Typography variant="body3" 
      style={{ marginTop:"5px" }}
      >IPO DASHBOARD</Typography>
        </Grid>
        
    </Grid>
      <Box sx={{ flexGrow: 1 }} display="flex"
      justifyContent="center"
      alignItems="center" marginLeft={8} marginRight={1} mt={4}>
      <Grid container spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }}
      display="flex"
        justifyContent="center"
        alignItems="center" >
    <Grid container xs={12} justifyContent="center" alignItems="center">
    <TableContainer
          component={Paper}
          sx={tableContainer}
        >
          <Table stickyHeader={true}>
           {tableHead}
            <TableBody
            sx={{backgroundColor: "#1c1f3e"}}
          >
             { (allData.length !==0) ?
             (<Row />)
             :    
                 <TableRow key="1">
                <TableCell scope="row">
              <Typography variant="body">No Data to Display</Typography>
              </TableCell>
              </TableRow>
    }
    </TableBody></Table></TableContainer>
            </Grid>
      </Grid>
    </Box>
     
    <div style={{ padding: "10px" }}></div>
      </ThemeProvider>
      </>
      );            
    };
            }