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
import BasicDatePicker from "./basicdatepicker";
import Country from "./country.js";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
export default function Secondary() {
  const initialvalues = {
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    address5: "",
    phoneNo: "",
  };

  const [formValues, setFormValues] = useState(initialvalues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(formValues);
    console.log(formErrors);
    console.log(formValues);
  };

  const validate = (values) => {
    const errors = {};
    //const regex = "^\+[1-9]{1}[0-9]{7,11}$" ;
    if (!values.address1) {
      errors.address1Err = "Address is required";
    }
    if (!values.address2) {
      errors.address2Err = "Address is required";
    }
    if (!values.address3) {
      errors.address3Err = "City is required";
    }
    if (!values.address4) {
      errors.address4Err = "Pincode is required";
    }
    if (!values.address5) {
      errors.address5Err = "State is required";
    }
    if (!values.phoneNo) {
      errors.phoneNoErr = "Phone No is required";
    } else if (values.phoneNo.length < 10) {
      errors.phoneNoErr = "Phone No must have 10 digits";
    }
    setFormErrors(errors);
  };
  if (auth.currentUser && auth.currentUser.emailVerified) {
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
        <Grid item xs={2} md={4} />
        <Grid item xs={8} md={4}>
          <CssBaseline />
          <Card
            sx={{
              //marginTop: 4,
              display: "flex",
              flexDirection: "column",
              //alignItems: 'center',
              background: "white",
              padding: 5,
              minHeight: "100vh",
            }}
          >
            <Avatar
              src="https://cdn2.vectorstock.com/i/1000x1000/67/86/mobile-stock-market-business-logo-icon-design-vector-22926786.jpg"
              alt="logo"
              sx={{ width: 112, height: 112, m: 1, alignSelf: "center" }}
            />
            <Typography component="h1" variant="h5">
              Enter Secondary Details
            </Typography>

            <Box
              component="form"
              //onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: "grid" }}>
                  <TextField
                    name="address1"
                    required
                    fullWidth
                    id="address"
                    label="Address: (Line 1) "
                    variant="filled"
                    value={formValues.address1}
                    onChange={handleChange}
                  />
                  {formErrors.address1Err !== "" && (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{ color: "error.main", justifySelf: "left" }}
                    >
                      {" "}
                      {formErrors.address1Err}{" "}
                    </Grid>
                  )}
                </Grid>

                <Grid item xs={12} sx={{ display: "grid" }}>
                  <TextField
                    name="address2"
                    required
                    fullWidth
                    label="(Line 2)"
                    variant="filled"
                    value={formValues.address2}
                    autoFocus
                    onChange={handleChange}
                  />

                  {formErrors.address2Err !== "" && (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{ color: "error.main", justifySelf: "left" }}
                    >
                      {" "}
                      {formErrors.address2Err}{" "}
                    </Grid>
                  )}
                </Grid>

                <Grid item xs={12} sx={{ display: "grid" }}>
                  <Country />
                </Grid>

                <Grid item xs={12} sm={6} sx={{ display: "grid" }}>
                  <TextField
                    name="address3"
                    required
                    fullWidth
                    label="City"
                    variant="filled"
                    autoFocus
                    value={formValues.address3}
                    onChange={handleChange}
                  />
                  {formErrors.address3Err !== "" && (
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      sx={{ color: "error.main", justifySelf: "left" }}
                    >
                      {" "}
                      {formErrors.address3Err}{" "}
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: "grid" }}>
                  <TextField
                    name="address5"
                    required
                    fullWidth
                    //id="address"
                    label="State"
                    variant="filled"
                    autoFocus
                    value={formValues.address5}
                    onChange={handleChange}
                  />
                  {formErrors.address5Err !== "" && (
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      sx={{ color: "error.main", justifySelf: "left" }}
                    >
                      {" "}
                      {formErrors.address5Err}{" "}
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={20} sx={{ display: "grid" }}>
                  <TextField
                    name="address4"
                    required
                    fullWidth
                    label="Pincode"
                    variant="filled"
                    autoFocus
                    value={formValues.address4}
                    onChange={handleChange}
                  />
                  {formErrors.address4Err !== "" && (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{ color: "error.main", justifySelf: "left" }}
                    >
                      {" "}
                      {formErrors.address4Err}{" "}
                    </Grid>
                  )}
                </Grid>

                <Grid item xs={12} sx={{ display: "grid" }}>
                  <TextField
                    name="phoneNo"
                    required
                    fullWidth
                    id="phoneNo"
                    label="Phone No."
                    variant="filled"
                    autoFocus
                    value={formValues.phoneNo}
                    onChange={handleChange}
                  />

                  {formErrors.phoneNoErr !== "" && (
                    <Grid
                      item
                      xs={12}
                      sm={9}
                      sx={{ color: "error.main", justifySelf: "left" }}
                    >
                      {" "}
                      {formErrors.phoneNoErr}{" "}
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12} sx={{ display: "grid" }}>
                  <BasicDatePicker />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      required
                    >
                      <FormControlLabel
                        value="female"
                        labelPlacement="bottom"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        labelPlacement="bottom"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        labelPlacement="bottom"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={2} md={4} />
      </Grid>
    );
  } else {
    <Navigate to="/verify-email" />;
  }
}
