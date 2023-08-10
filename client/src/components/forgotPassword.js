import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import Card from "@mui/material/Card";

export default function ResetPassword() {
  const { updatePassword, currentUser } = useAuth();
  const initialvalues = {
    new: "",
    confirm: "",
  };

  const [formValues, setFormValues] = React.useState(initialvalues);
  const [formErrors, setFormErrors] = React.useState({});
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleChange = (props) => (e) => {
    setFormValues({ ...formValues, [props]: e.target.value });
    console.log(formValues);
  };

  const handleSubmit = async (e) => {
    validate(formValues);
    console.log(formErrors);
    console.log(formValues);
    if(formErrors.new && formErrors.confirm) {
      try {
        const res = await updatePassword(formValues.new);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.new) {
      errors.new = "Password is required";
    }
    if (!values.confirm) {
      errors.confirm = "Password is required";
    }
    if (values.new !== values.confirm) {
      errors.confirm = "Password doesn't match";
    }
    setFormErrors(errors);
    //return errors;
  };

  if (currentUser) {
    return (
      <Grid container >
        <Grid item xs={0} sm={3} sx={{
        background: "url(https://imageio.forbes.com/specials-images/imageserve/5f2b139cc5d1415541643908/0x0.jpg?format=jpg&width=1200)",
        backgroundSize: "cover"
      }} />
        <Grid item xs={12} sm={6} sx={{
        background: "radial-gradient(90% 100% at 50% 0%, #2d685a 0%, #050606 100%), radial-gradient(90% 100% at 50% 0%, #a86487 0%, #827878 100%), radial-gradient(110% 215% at 100% 0%, #000AFF 0%, #3A5525 100%), linear-gradient(230deg, #000 0%, #09FF04 100%), linear-gradient(130deg, #2D2929 0%, #C4B6FB 100%)",
        backgroundBlendMode: "overlay, difference, difference, exclusion, normal",
      }}>
        <CssBaseline />
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "none",
            padding: 5,
            minHeight: "100vh",
            color: "white",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Link to="/user-home" style={{
              textDecoration: "none",

            }}>
              <Avatar
                src="https://cdn2.vectorstock.com/i/1000x1000/67/86/mobile-stock-market-business-logo-icon-design-vector-22926786.jpg"
                alt="logo"
                sx={{ width: 112, height: 112, m: 1, alignSelf: "center" }}
              />
            </Link>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>

          <Box component="form" sx={{ mt: 3, color: "white", width: "100%" }}>
            <Grid className="grid" container spacing={2} sx={{
                width: "80%",
                marginLeft: "10%",
                marginRight: "10%"
              }}>
              <Grid item xs={12} sx={{ display: "grid", alignContent: "center" }}>
                <FormControl sx={{ m: 1, ml: 0 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Enter new password
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    type={showNewPassword ? "text" : "password"}
                    value={formValues.new}
                    onChange={handleChange("new")}
                    style={{ background: "#edd7f7" }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          //onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {formErrors.new !== "" && (
                  <Grid
                  item
                  xs={12}
                  sx={{ color: "error.main", justifySelf: "left" }}
                >
                    {" "}
                    {formErrors.new}{" "}
                  </Grid>
                )}
              </Grid>

              <Grid item xs={12} sx={{ display: "grid" }}>
                <FormControl sx={{ m: 1, ml: 0 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Confirm new password
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formValues.confirm}
                    onChange={handleChange("confirm")}
                    style={{ background: "#edd7f7" }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          //onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {formErrors.confirm !== "" && (
                  <Grid
                  item
                  xs={12}
                  sx={{ color: "error.main", justifySelf: "left" }}
                >
                    {" "}
                    {formErrors.confirm}{" "}
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: "5%", width: "60%", ml: "5%", fontSize: "1rem", backgroundImage: "linear-gradient( 111.6deg, rgba(174,68,223,1) 27.3%, rgba(246,135,135,1) 112.7% )" }}
              onClick={handleSubmit}
              size="large"
            >
              Submit
            </Button>
          </Box>
          <Link to="/user-home" style={{ marginLeft: '4px', color: "#5454d4" }}>Go to Dashboard</Link>
        </Card>
        </Grid>
        <Grid item xs={0} sm={3} sx={{
        background: "url(https://imageio.forbes.com/specials-images/imageserve/5f2b139cc5d1415541643908/0x0.jpg?format=jpg&width=1200)",
        backgroundSize: "cover"
      }} />
      </Grid>
    );
  }
  else {
    return <Navigate to="/" />
  }
}
