import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import Card from '@mui/material/Card';
import { Alert } from "@mui/material";
import { Navigate } from 'react-router-dom';

export default function EnterEmail() {

  const { resetPassword } = useAuth();

  const [email, setEmail] = React.useState("");
  //const [formValues, setValue] = useState(initialvalues);
  const [formError, setError] = useState("");
  const [redirect, setRedirect] = React.useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value)
    //setValue({ ...formValues, [props]: e.target.value });
    //console.log(formValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "") {
      setError("");
    }
    else {
      setError("Email is required");
    }

    try {
      var res = await resetPassword(email);
      console.log(res);
      window.alert("An email has been to your email address to reset the password");
      setRedirect(true);
    }
    catch (error) {
      console.log(error);
    }

  };

  React.useEffect(() => {
    setRedirect(false);
  }, []);

  if(!redirect) {
  return (
    <Grid container sx={{ color: "white", minHeight: "100vh", backgroundImage: "url(https://imageio.forbes.com/specials-images/imageserve/5f2b139cc5d1415541643908/0x0.jpg?format=jpg&width=1200)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
    <Grid item xs={3} md={4} />
      <Grid item xs={6} md={4}>
      <CssBaseline />
      <Card
        sx={{
          //marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "white",
          padding: 5,
        }}
      >
        <Avatar src="https://cdn2.vectorstock.com/i/1000x1000/67/86/mobile-stock-market-business-logo-icon-design-vector-22926786.jpg" alt="logo" sx={{ width: 112, height: 112, m:1, alignSelf: "center" }} />
        <Typography component="h1" variant="h5">
          ENTER EMAIL ADDRESS TO RESET PASSWORD
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item sx={{display: 'grid'}}>
            <TextField
              id="filled-basic"
              fullWidth
              onChange={handleChange}
              label="Enter email address"
              variant="filled" />
            {formError !== "" && (
              <Grid item xs={12} sx={{ color: "red", justifySelf: 'left' }}>
                {" "}
                {formError}{" "}
              </Grid>
            )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            width="35ch"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Card>
      </Grid>
      <Grid item xs={3} md={4} />
    </Grid >
  );
  }
  else {
    return (
      <Navigate to="/login" />
    )
  }
}
