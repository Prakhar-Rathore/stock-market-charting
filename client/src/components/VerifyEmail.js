import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function VerifyEmail() {
  if (auth.currentUser && auth.currentUser.emailVerified) {
    return <Navigate to="/user-home" />;
  }
  if (auth.currentUser) {
    return (
      <Grid
        container
        sx={{
          color: "white",
          minHeight: "100vh",
          backgroundImage:
            "url(https://imageio.forbes.com/specials-images/imageserve/5f2b139cc5d1415541643908/0x0.jpg?format=jpg&width=1200)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Grid item xs={3} md={4} />
        <Grid item xs={6} md={4}>
          <CssBaseline />
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "white",
              padding: 5,
            }}
          >
            <Avatar
              src="https://cdn2.vectorstock.com/i/1000x1000/67/86/mobile-stock-market-business-logo-icon-design-vector-22926786.jpg"
              alt="logo"
              sx={{ width: 112, height: 112, m: 1, alignSelf: "center" }}
            />
            <Typography component="h1" variant="h5">
              VERIFICATION LINK SENT
            </Typography>

            <hr
              style={{
                color: "#000000",
                backgroundColor: "#000000",
                height: 0.5,
                borderColor: "#000000",
                width: "100%",
              }}
            />

            <Typography>
              We've sent account verification link to your email address. Please
              click on the link given in the email to verify your account.
            </Typography>

            <Typography>
              <br />
              If you don't click the verification link in 5 mins, your account
              will be deleted.
            </Typography>

            <Typography>
              <br />
              Please refresh this page after clicking verification link.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={3} md={4} />
      </Grid>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
