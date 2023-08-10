
 
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
      default: "#2e325f"
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
    id: "email",
    label: "Email",
    minWidth: 150,
    align: "center"
  },
  { id: "Fname", label: "First Name", minWidth: 100 ,align: "center"},
  { id: "Lname", label: "Last Name", minWidth: 100,align: "center" },
 
  {
    id: "enabled",
    label: "Enabled",
    minWidth: 100,
    align: "center"
  },
];
 
export default function ManageUsers() {
  const [rows, setRows] = useState(columns);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [idToken, setIdToken] = useState(null);
  const[userEmail, setuserEmail] = useState([]);
 
 
 
  useEffect(() => {
   
 
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
      console.log(response.data.users);
      var tempUsers=[];
      response.data.users.forEach((user)=>{
          tempUsers.push(user.email);
      })
     
      setuserEmail(tempUsers);
    })();
  }, []);
 
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

 
 
  const [selectedSwitch, setSelectedSwitch] = React.useState([]);
 
 
  const onIndividualSwitch = (r) => {
    var idx=r.uid;
    console.log(idx);
    var tempUsers = [...selectedSwitch];
    if (!tempUsers.includes(idx)) {
      tempUsers = [...selectedSwitch, idx];
    } else {
      var temp = tempUsers.indexOf(idx);
      tempUsers.splice(temp, 1);
    }
    console.log(tempUsers);
    setSelectedSwitch(tempUsers);
    r.disabled=(!r.disabled);
    (async () => {
      const token = await auth.currentUser.getIdToken();
      const response = await apiCall(
        `${PROD_SERV_ADDRESS_API}/admin/enableUser?uid=${idx}`,
        "PUT",
        null,
        token
      );
      console.log(response);
 
    })();
 
  };
 
  const onIndividualDeSwitch = (r) => {
    var idx=r.uid;
    console.log(idx);
    var tempUsers = [...selectedSwitch];
    if (!tempUsers.includes(idx)) {
      tempUsers = [...selectedSwitch, idx];
    } else {
      var temp = tempUsers.indexOf(idx);
      tempUsers.splice(temp, 1);
    }
    console.log(tempUsers);
    setSelectedSwitch(tempUsers);
    r.disabled=(!r.disabled);
    (async () => {
      const token = await auth.currentUser.getIdToken();
      const response = await apiCall(
        `${PROD_SERV_ADDRESS_API}/admin/disableUser?uid=${idx}`,
        "PUT",
        null,
        token
      );
      console.log(response);
 
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

  if( rows===undefined)
{
    return (
        <>
        <Header />
    <main style={{ position: "absolute", left: "68px", top: "70px" }}>
                    <div>loading...</div>
                </main>
    </>
)
}
else{
  return (
    <ThemeProvider theme={light ? themeDark : themeLight}>
 
 
    <Header />
   
    <Box
 
        sx={{ flexGrow: 1, alignItems:"baseline" }}
        ml={4}
        mt={5} pt={5}
        // mr={5}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end">
 
 

 
<Grid container
// spacing={2}
// ml={15} mr={10}
>
 
  <Grid item xs={1} md={1}>
   
  </Grid>
  <Grid item xs={2} md={2} paddingTop={1}>
    {/* <Item>xs=4 md=8</Item> */}
    <Typography variant="h4"  align="left" marginLeft={2}>Users</Typography>
  </Grid>
 
  {/* <Grid item xs={2} md={2}>
   
  </Grid> */}
   
    {/* <Grid item xs={1} md={1}>
   
    </Grid> */}
  {/* <Grid item xs={2} md={2} align="right">
  <SearchIcon style={{ coSelf: "center", marginTop: "10px"  }} />    
  </Grid> */}
  <Grid item xs={2} md={2} align="right" paddingTop="12px">
 
  <SearchIcon style={{ coSelf: "center"}} />
 </Grid>
  <Grid item xs={3} md={3} align="left"  paddingTop="12px">
 
  <input
           style={{  backgroundColor: "transparent",color: light ? "white":"black"  ,border: light ? "1px solid white" : "1px solid black", borderRadius: "15px", marginTop:"0px" ,padding: "7px" }}
                // sx={{  width: "100%" }}
               
                type="text"
                placeholder="Search by Email"
                // paddingBottom="30px"
                onChange={funSearch}
                // size="60"
                // marginBottom="30px"
                align="center"
              
               
                />
 
  </Grid>
  <Grid item  xs={1} md={1}>

  </Grid>
  
 
   {/* sx={{ flexGrow: 1 }} spacing={{ xs: 1, md: 2, lg: 2 }} columns={{ xs: 2, sm: 2, md: 12, lg: 22 }}
  display="flex" */}
  {/* <Grid item  xs={1} md={1}
          justifyContent="left"
          alignItems="left"
           mt={1}
            width='100%'
            >
          <Tooltip title="toggle between light and dark mode">
         
          <Button onClick={() => setLight((prev) => !prev)} variant="contained" color="primary" sx={{ height: 40 }}><DarkModeIcon /></Button>
        </Tooltip>
 
           </Grid> */}

           <Grid item xs={2} md={2} align="center" paddingTop={1}>
  <UploadCsv />
  </Grid>
</Grid>
      </Box>
      <CssBaseline />
 
     
     
       
 
     {/* <Box
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
    > */}
    <Grid container
      xs={12}
      md={12}
      lg={12}

      sx={{
        m: 3,
       marginLeft: 0,
        marginTop: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
       
        padding: 5,
      }}
    >
      <Paper sx={{ width: "80%", overflow: "hidden", m:0, borderRadius: "10px" }}>
        <TableContainer sx={{ maxHeight: 440, m: 0}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                style={{fontSize:20, backgroundColor: "#1b1e3b" }}>
                  <Checkbox
                    // color="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                   
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontSize:20, backgroundColor: "#1b1e3b" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
 
            <TableBody>
             
             {rows && rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      style={
                        index % 2
                          ? { background: "#1f2242" }
                          : { background: "#0f1125" }
                      }
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(row.uid)}
                          onChange={() => onIndividualSelect(row.uid)}
                          color="primary"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </TableCell>
                      <TableCell align="center" >{row.email}</TableCell>
                      <TableCell align="center">{row.firstName}</TableCell>
                      <TableCell align="center">{row.lastName}</TableCell>
                      <TableCell align="center">
                        {/* {row.disabled==true?0:1} */}
                        <Switch
                          checked={!row.disabled}
                          // selectedSwitch.includes(row.uid)
                          onChange ={row.disabled==true?() =>onIndividualSwitch(row) :() =>onIndividualDeSwitch(row)}
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
          count={rows?rows.length:0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ backgroundColor: "#1b1e3b" }}
        />
      </Paper>
      <Button
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
        </Button>
  </Grid>
 
    </ThemeProvider>
 
  );
}
}