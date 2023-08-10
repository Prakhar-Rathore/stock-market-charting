import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { routes } from "../../config/serverconfig";
import { auth } from "../../firebase";
import apiCall from "../../apiCall/apiCall";
import Header from "../User/Header";
import { Grid} from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from "@mui/material/CssBaseline";
import {  InputBase, TextField } from "@mui/material";
import Switch from '@mui/material/Switch';
 import UploadCsv from './uploadCsv';
 import axios from "axios";
// import ModalInfo from "./modalInfo";
 
 
 
 
 
 
 
 
 
   
 
 
 
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
      fontWeight: 400,
      fontSize: 14,
 
    },
    body2:
    {
      fontWeight: 300,
      fontSize: 14,
    },
    body3:
    {
      fontWeight: 500,
      fontSize: 14,
    }
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
      fontWeight: 400,
      fontSize: 14,
 
    },
    body2:
    {
      fontWeight: 300,
      fontSize: 14,
    },
    body3:
    {
      fontWeight: 500,
      fontSize: 14,
    }
 
  },
 
 
 
});
 
const PROD_SERV_ADDRESS_API = routes.PROD_SERV_ADDRESS_API;
const DEV_SERV_ADDRESS_API = routes.DEV_SERV_ADDRESS_API;
 
const columns = [
 
 
  {
    id: "name",
    label: "Name",
    minWidth: 150,
    align: "center"
  },
  {
    id: "enabled",
    label: "Enabled",
    minWidth: 100,
    align: "center"
  },
];
 
export default function ManageCompanies() {
  const [rows, setRows] = useState([]);
  const [disRows, setDisRows] = useState([]);
  const [totalRows,setTotalRows]= useState([]);
 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [idToken, setIdToken] = useState(null);
  const[userEmail, setuserEmail] = useState([]);
 
 
 
 
   useEffect(() => {
   
 
    (async () => {
     
      const response = await apiCall(
        `${PROD_SERV_ADDRESS_API}/data/getEnableDisabled`,
        "GET",
        null,
       
      );
   
    // if (response.status === 200) {
      
        console.log(response.data.enabled);
        console.log(response.data.disabled);
        setRows(response.data.enabled);

        setDisRows(response.data.disabled);
        
        
      
    
    // }
    // // //   var tempUsers=[];
    // // //   response.data.users.forEach((user)=>{
    // // //       tempUsers.push(user.email);
    // // //   })
     
    // // //   setuserEmail(tempUsers);
 
//     setTotalRows([...rows, ...disRows]);
    
// console.log(totalRows);
    // setTotalRows(rows.concat(disRows));
    })();
    
    // setTotalRows([...rows, ...disRows]); 
    
  }, []);

//   rows=[
//     "abc",
//     "acc",
//     "bac",
//     "cab",

//   ];
//   disRows=[
//     "def",
//     "edf",
//     "dfe",
//     "fed",
//   ];


  const [light, setLight] = React.useState(true);
 
 
  const Item = styled(Paper)(({ theme }) => ({
    border: theme.palette.mode === 'dark' ? '#fff' : '#222',
    borderRadius: "2",
    backgroundColor: theme.palette.mode === 'dark' ? '#1F1F1F' : '#d3d3d3',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.primary,
  }));
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [selectedUsers, setSelectedUsers] = useState([]);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  const funSearch = async (e) => {
    e.preventDefault();
    const temp=e.target.value;
    if(temp.length!=0){
    console.log(temp);
      if(userEmail.includes(temp)) {
        const token = await auth.currentUser.getIdToken();
        setIdToken(token);
        const response = await apiCall(
          `${PROD_SERV_ADDRESS_API}/admin/searchUsersByEmail?email=${temp}`,
          "GET",
          null,
          token
        );
        console.log(response);
        console.log(response.data.user);
        setRows(response.data.user);
      }
    }
    else {
     
    (async () => {
      const token = await auth.currentUser.getIdToken();
      setIdToken(token);
      const response = await apiCall(
        `${PROD_SERV_ADDRESS_API}/admin/getUsers`,
        "GET",
        null,
        token
      );
      setRows(response.data.users);
     
    })();
    }
  };
  // const [open, setOpen] = React.useState(false);
 
  // const handleClose = () => setOpen(false);
 
  // const handleClick = (e) =>{
  //   const handleOpen = () => setOpen(true);
  //   <ModalInfo open={open} handleclose={handleClose}/>
  // }
 
 
  const [selectedSwitch, setSelectedSwitch] = React.useState([]);
 
  const composeToken = (token) => (token ? { Authorization: ` ${token}` } : {});
  const onIndividualSwitch = (idx) => {
    
    console.log(idx);
    var tempUsers = [...selectedSwitch];
    if (!tempUsers.includes(idx)) {
      tempUsers = [...selectedSwitch, idx];
    } else {
      var temp = tempUsers.indexOf(idx);
      tempUsers.splice(temp, 1);
    }
      
      rows.push(idx);
      var temp = disRows.indexOf(idx);
      disRows.splice(temp, 1);

      setTotalRows(rows.concat(disRows));

      (async () => {    
        

      const token = await auth.currentUser.getIdToken();
      axios({
        method: 'put',
        url:  `${PROD_SERV_ADDRESS_API}/admin/enableCompany`,
        data: null, // you are sending body instead
        headers: {
          ...composeToken(token),
          companyname: {idx}
        },
      
      })
      .then((response) => {
        console.log(response);
        })
    .catch((error) => {
       alert(error)
      })
      // const response = await apiCall(
      //   `${PROD_SERV_ADDRESS_API}/admin/enableCompany`,
      //   "PUT",
      //   null,
      //   token,
      
      // );
      // console.log(response);
 
    })();

    // disUsers.pop(r);
    // console.log(tempUsers);
    // setSelectedSwitch(tempUsers);
    // r.disabled=(!r.disabled);
    // (async () => {
    //   const token = await auth.currentUser.getIdToken();
    //   const response = await apiCall(
    //     `${PROD_SERV_ADDRESS_API}/admin/enableUser?uid=${idx}`,
    //     "PUT",
    //     null,
    //     token
    //   );
    //   console.log(response);
 
    // })();
 
  };
 
  const onIndividualDeSwitch = (idx) => {
    
    console.log(idx);
    var tempUsers = [...selectedSwitch];
    if (!tempUsers.includes(idx)) {
      tempUsers = [...selectedSwitch, idx];
    } else {
      var temp = tempUsers.indexOf(idx);
      tempUsers.splice(temp, 1);
    }
    // var temp = tempUsers.indexOf(idx);
    // disUsers.splice(temp, 1);
    disRows.push(idx);
    var temp = rows.indexOf(idx);
    rows.splice(temp, 1);
    setTotalRows(rows.concat(disRows));
    // console.log(tempUsers);
    // setSelectedSwitch(tempUsers);
    // r.disabled=(!r.disabled);

   
    (async () => {    
        

      const token = await auth.currentUser.getIdToken();
      axios({
        method: 'put',
        url:  `${PROD_SERV_ADDRESS_API}/admin/disableCompany`,
        data: null, // you are sending body instead
        headers: {
          ...composeToken(token),
          companyname: {idx}
        },
      
      })
      .then((response) => {
        console.log(response);
        })
    .catch((error) => {
       alert(error)
      })
      // const response = await apiCall(
      //   `${PROD_SERV_ADDRESS_API}/admin/enableCompany`,
      //   "PUT",
      //   null,
      //   token,
      
      // );
      // console.log(response);
 
    })();

 
  };
 
 
     
 
  const onIndividualSelect = (idx) => {
    console.log(idx);
    var tempUsers = [...selectedUsers];
    if (!tempUsers.includes(idx)) {
      tempUsers = [...selectedUsers, idx];
    } else {
      var temp = tempUsers.indexOf(idx);
      tempUsers.splice(temp, 1);
    }
    console.log(tempUsers);
    setSelectedUsers(tempUsers);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    selectedUsers.forEach((user) => {
      (async () => {
        const token = await auth.currentUser.getIdToken();
        const response = await apiCall(
          `${PROD_SERV_ADDRESS_API}/admin/removeUser?uid=${user}`,
          "DELETE",
          null,
          token
        );
        console.log(response);
        console.log(response.data.users);
        setRows(response.data.users);
      })();
    });
  };
  return (
    <ThemeProvider theme={light ? themeDark : themeLight}>
 
 
    <Header />
   
    <Box
 sx={{ flexGrow: 1, alignItems:"baseline" }}
 ml={12}
 mt={5} pt={5}
 mr={5}
 display="flex"
 justifyContent="flex-end"
 alignItems="flex-end">
 
 
{/* <Box
sx={{
   
   
 marginLeft:"30px",
 marginRight:"30px",
 display: "flex",
 justifyContent: "center",
 flexDirection: "column",
 alignItems: "center",
 marginTop:"10px"
 
}}> */}
{/* < Grid container>
  <Grid item  sm={3}>
                     <Grid  align="left">
                         <Typography variant="h4" width="600px" fontWeight="600" paddingBottom="5px" paddingTop="10px" marginTop="20px"  mrginBottom="5px" fontSize="32px" align="left">Users</Typography></Grid>
 
   </Grid>  
 
  <Grid item  sm={5}   >
    <Grid
    marginLeft="20px"
    align="right">
    <SearchIcon style={{ coSelf: "center", marginTop: "35px",marginLeft:"50px"  }} />    
    </Grid>
   </Grid>
  <Grid item  sm={4}>
    <Grid
    marginTop="30px"
    align="left"
>
    <input
    style={{  backgroundColor: light ?"black" :  "white",color: light ? "white":"black"  ,border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", padding: "10px" }}
         // sx={{  width: "100%" }}
         type="text"
         placeholder="Search"
         // paddingBottom="30px"
         onChange={funSearch}
         // size="60"
         // marginBottom="30px"
         align="left"
         size="45"
       
         />
    </Grid>
 </Grid>
 
 
 
</Grid> */}
 
<Grid container
// spacing={2}
// ml={15} mr={10}
>
 
<Grid item xs={1} md={1}>
 
</Grid>
<Grid item xs={3} md={3} paddingTop={1}>
{/* <Item>xs=4 md=8</Item> */}
<Typography variant="h4"  fontWeight="600"   fontSize="32px" align="left" marginLeft={3} >Companies</Typography>
</Grid>
 
{/* <Grid item xs={2} md={2}>
 
</Grid> */}
 
<Grid item xs={1} md={1}>
 
</Grid>
{/* <Grid item xs={2} md={2} align="right">
<SearchIcon style={{ coSelf: "center", marginTop: "10px"  }} />    
</Grid> */}
{/* <Grid item xs={5} md={5} align="right" >
<SearchIcon style={{ coSelf: "center", marginTop: "10px" ,paddingTop:"5px" }} />
<input
    style={{  backgroundColor: light ?"black" :  "white",color: light ? "white":"black"  ,border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", marginTop:"0px" ,padding: "10px" }}
         // sx={{  width: "100%" }}
       
         type="text"
         placeholder="Search"
         // paddingBottom="30px"
         onChange={funSearch}
         // size="60"
         // marginBottom="30px"
         align="center"
         size="32"
       
         />
</Grid> */}
 
<Grid item xs={5} md={5} paddingTop={1}>
 
</Grid>
{/* <Grid item  xs={2} md={2}
// sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }}
//  display="flex"
   justifyContent="center"
   alignItems="center"
   //  marginRight={10}
    mt={1}
     width='100%'
     >
   <Tooltip title="toggle between light and dark mode">
 
   <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
 </Tooltip>
 
    </Grid> */}
 
 
</Grid>
</Box>
      <CssBaseline />
 
     
     
       
      {/* <Avatar sx={{ m: 1, bgcolor: "#282A37" }}>
        <PersonIcon />
      </Avatar>
      <Grid item xs={8}>
      <Typography component="h1" variant="h5" align="center">
        Users
      </Typography>
      </Grid>
      <Tooltip title="toggle between light and dark mode">
          <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
        </Tooltip> */}
     <Grid container
      xs={12}
      md={12}
      lg={12}

      sx={{
        m: 3,
        marginLeft: 7,
        marginTop: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
       
        padding: 5,
      }}
    >
      {/* <Paper sx={{ width: "80%", overflow: "hidden", m:0}}> */}

      <Paper sx={{width: "80%", overflow: "hidden",m:0}}>
        <TableContainer 
        sx={{ 
          // overflowX: "hidden",
          maxHeight: 400,
           m: 0 }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center"
                style={{background:"#89CFF0" ,fontSize:20 }}>
                  {/* <Checkbox
                    color="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                   
                  /> */}
                  S.No
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth , background:"#89CFF0" ,fontSize:20}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
 
            <TableBody>
            {[...rows,...disRows] && [...rows,...disRows]
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      // style={
                      //   index % 2
                      //     ? { background: "#B24BF3" }
                      //     : { background: "#D7A1F9" }
                      // }
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell align="center">
                        {/* <Checkbox
                        //   checked={selectedUsers.includes(row.uid)}
                        //   onChange={() => onIndividualSelect(row.uid)}
                          color="primary"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        /> */}
                        {index+1}
                      </TableCell>
                      <TableCell align="center" >{row}</TableCell>
 
                      {/* <TableCell align="center">{row.firstName}</TableCell>
                      <TableCell align="center">{row.lastName}</TableCell> */}
                      <TableCell align="center">
                        {/* {row.disabled==true?0:1} */}
                        <Switch
                          checked={!disRows.includes(row)}
                        //   // selectedSwitch.includes(row.uid)
                          onChange ={disRows.includes(row)==true?() =>onIndividualSwitch(row) :() =>onIndividualDeSwitch(row)}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        </TableCell>
                       
                    </TableRow>
                  );
                })}
                
             
                
            </TableBody>
          </Table>
        </TableContainer>
 
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows || disRows?(rows.length+disRows.length):0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 1,
            mb: 1,
            width: "100px",
            borderRadius: "30px",
            backgroundColor: "red",
          }}
          onClick={handleSubmit}
        >
          Delete
        </Button> */}
      </Paper>
   
  </Grid>
 
    </ThemeProvider>
 
  );
}
 
 
