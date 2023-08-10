import React, { useState } from "react";
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Typography,
    Avatar,
    Box,
    Card,
    InputAdornment,
    Menu,
    InputLabel,
    Select,
    NativeSelect,
    OutlinedInput,
    MenuItem,
    FormControl,
    Modal,
    IconButton,
    Link,
    Tooltip
} from "@mui/material";
import { validateCallback } from "@firebase/util";
import { auth } from "../../firebase";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AddIcon from '@mui/icons-material/Add';
import apiCall from "../../apiCall/apiCall";
import { routes } from "../../config/serverconfig";
const PROD_SERV_ADDRESS_API = routes.PROD_SERV_ADDRESS_API;

export default function IpoForm({ open, handleOpen, handleClose }) {

    const fields = [
        {
            label: "Company Name",
            name: "companyName",
            type: "text",
            subtype: "",
            error: "companyNameErr"
        },
        {
            label: "Exchanges Listed",
            name: "exchangesListed",
            type: "dropdown",
            options: ["NSE", "BSE"],
            subtype: "multiple",
            error: "exchangesListedErr"

        },
        {
            label: "Security Type",
            name: "securityType",
            type: "dropdown",
            options: ["Equity", "SME"],
            subtype: "single",
            error: "securityTypeErr"
        },
        {
            label: "Issue Start Date",
            name: "issueStart",
            type: "date",
            subtype: ""
        },
        {
            label: "Issue End Date",
            name: "issueEnd",
            type: "date",
            subtype: ""
        },
        {
            label: "Issue Price",
            name: "issuePrice",
            type: "text",
            subtype: "number"
        },
        {
            label: "Issue Size",
            name: "issueSize",
            type: "text",
            subtype: "number"
        },
        {
            label: "Lot Size",
            name: "marketLot",
            type: "text",
            subtype: "number"
        },
        {
            label: "Issue Type",
            name: "issueType",
            type: "dropdown",
            options: ["Fixed Price", "Book Building"],
            subtype: "single"
        },
        {
            label: "Symbol",
            name: "symbol",
            type: "text",
            subtype: ""
        },
        {
            label: "Face Value",
            name: "faceValue",
            type: "text",
            subtype: "number",
        },
        {
            label: "Sponsor Bank",
            name: "sponsorBank",
            type: "text",
            subtype: ""
        },
        {
            label: "Registrar",
            name: "registrar",
            type: "text",
            subtype: ""
        },
        {
            label: "Download Link",
            name: "prospectusGidDownloadLink",
            type: "text",
            subtype: ""
        },
        {
            label: "About Company",
            name: "aboutCompany",
            type: "text",
            subtype: ""
        },
    ]

    const companyFinancialsFields = [
        {
            label: "Period Ended",
            name: "periodEnded",
            type: "dropdown",
            subtype: "single",
            options: ["December 31, 2021", "March 31 ,2021", "December 31, 2020", "March 31, 2020", "March 31, 2019"]
        },
        {
            label: "Total Assets",
            name: "totalAssets",
            type: "text",
            subtype: "number"
        },
        {
            label: "Total Revenue",
            name: "totalRevenue",
            type: "text",
            subtype: "number"
        },
        {
            label: "Profit After Tax",
            name: "profitAfterTax",
            type: "text",
            subtype: "number"
        }
    ]

    const [companyFinancials, SetCompanyFinancials] = React.useState([{ companyFinancialsFields }]);
    // let companyFinancials = [{ companyFinancialsFields }];
    const todaysDate = new Date();
    const year = todaysDate.getFullYear();
    var month = todaysDate.getMonth() + 1;
    var day = todaysDate.getDate();

    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    //month = ('0' + month).slice(-2)
    const date = year + "-" + month + "-" + day;


    const initialvalues = {
        companyName: "",
        exchangesListed: [],
        securityType: "",
        issueStart: date,
        issueEnd: date,
        issuePrice: 0,
        issueSize: 0,
        marketLot: 0,
        issueType: "",
        symbol: "",
        faceValue: "",
        sponsorBank: "",
        registrar: "",
        prospectusGidDownloadLink: "",
        aboutCompany: ""
    };

    const companyFinancialsValue = [{ periodEnded: "December 31, 2021", totalAssets: 0, totalRevenue: 0, profitAfterTax: 0 }]
    const [formValues, setFormValues] = useState(initialvalues);
    const [formErrors, setFormErrors] = useState({})
    // const [open, setOpen] = useState(false);
    const [companyFinancialsValues, SetCompanyFinancialsValues] = React.useState([{ companyFinancialsValue }])

    const handleCompanyFinancialsChange = (e, index, type) => {

        // const arr = { "periodEnded": 0, "totalAssets": 1, "totalRevenue": 2, "profitAfterTax": 3 };
        const { name, value } = e.target;
        // console.log(companyFinancialsValues)
        const temp = companyFinancialsValues[index].companyFinancialsValue
        // console.log(temp[0]);
        if (type === "number") temp[0][name] = parseFloat(value)
        else temp[0][name] = value;
        companyFinancialsValues[index].companyFinancialsValue = temp
        console.log(name);
        console.log(value);
        console.log(companyFinancialsValues);
    }

    const handleChange = (e, type) => {
        const { name, value } = e.target;
        if (type === "number") setFormValues({ ...formValues, [name]: parseFloat(value) });
        else setFormValues({ ...formValues, [name]: value });
        console.log(name, value);
    };

    const handleDateChange = (newValue, name) => {
        const d = new Date(newValue);
        const year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();

        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        //month = ('0' + month).slice(-2)
        const date = year + "-" + month + "-" + day;
        setFormValues({ ...formValues, [name]: date });
        console.log(date);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validate(formValues);
        console.log(formErrors);
        console.log(formValues);

        let res = formValues;
        res["companyFinancials"] = [];
        companyFinancialsValues.forEach((value) => {
            console.log(value.companyFinancialsValue);
            res["companyFinancials"].push(value.companyFinancialsValue[0])
        })
        console.log(res);

        try {
            const result = await apiCall(
                `${PROD_SERV_ADDRESS_API}/Ipo/add`,
                "POST",
                res
            );
            console.log(result);
            if (result.status === 200) {
                // setOpen(false);
                handleClose();
            }
            alert(result.data.message);
            window.location.reload();
        }
        catch(err) {
            alert(err.response.data.message);
        }
    };

    const validate = (values) => {
        const errors = {};
        if (values.companyName === "") {
            errors.companyNameErr = "Company Name is required";
        }
        if (values.exchangesListed === "") {
            errors.exchangesListedErr = "Exchanged Listed is required";
        }
        if (values.securityType === "") {
            errors.securityTypeErr = "Security Type is required";
        }
        setFormErrors(errors);
    };

    const handlePlusClick = () => {
        if (companyFinancials.length < 5) {
            let temp = companyFinancials.slice();
            temp.push({ "companyFinancialsFields": companyFinancialsFields });
            SetCompanyFinancials(temp);
            console.log(temp);
            let temp2 = companyFinancialsValues.slice();
            temp2.push({ "companyFinancialsValue": companyFinancialsValue });
            SetCompanyFinancialsValues(temp2);
        }
    }

    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    return (
        <main>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal open={open} onClose={handleClose} style={{ overflow: "scroll", width: "90%", marginLeft: "auto", marginRight: "auto" }}>
                <Box
                    sx={{
                        background: "white",
                        padding: 2,
                    }}
                >
                    <Grid container>
                        <Grid item xs={10}
                            style={{
                                alignSelf: "center",
                                justifyContent: "center"
                            }}
                        >
                            <CssBaseline />
                            <Typography component="h1" variant="h5" textAlign="center"> IPO Details Form</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button onClick={handleClose} style={{
                                borderRadius: "15px",
                                padding: "15px",
                                width: "100px",
                                color: "black",
                                float: "right"
                            }}>
                                <CloseSharpIcon />
                            </Button>
                        </Grid>

                        <Box component="form">
                            <Grid container>
                                {fields.map((field, index) => {
                                    if (field.type === "text" & field.subtype === "") {
                                        return (
                                            <Grid item xs={5} key={index} style={{
                                                marginRight: index % 2 === 0 ? "5%" : 0,
                                                marginLeft: index % 2 !== 0 ? "5%" : 0,
                                                marginTop: "10px",
                                                marginBottom: "10px"
                                            }}>
                                                <TextField
                                                    label={field.label}
                                                    name={field.name}
                                                    variant="outlined"
                                                    fullWidth
                                                    value={formValues[field.name]}
                                                    onChange={(e) => handleChange(e, "text")}
                                                // style={{
                                                //     border: "1px solid black",
                                                //     borderRadius: "20px",
                                                //     marginTop: "10px",
                                                //     marginBottom: "10px"
                                                // }}
                                                />
                                                {formErrors[field.error] !== "" && (
                                                    <Grid
                                                        item
                                                        sx={{ color: "error.main", justifySelf: "left" }}
                                                    >
                                                        {" "}
                                                        {formErrors[field.error]}{" "}
                                                    </Grid>
                                                )}
                                            </Grid>
                                        )
                                    }
                                    else if (field.type === "text" && field.subtype === "number") {
                                        return (
                                            <Grid item xs={5} key={index} style={{
                                                marginRight: index % 2 === 0 ? "5%" : 0,
                                                marginLeft: index % 2 !== 0 ? "5%" : 0,
                                                marginTop: "10px",
                                                marginBottom: "10px"
                                            }}>
                                                <TextField
                                                    type="number"
                                                    label={field.label}
                                                    name={field.name}
                                                    variant="outlined"
                                                    fullWidth
                                                    value={formValues[field.name]}
                                                    onChange={(e) => handleChange(e, "number")}
                                                // style={{
                                                //     border: "0.25px solid black",
                                                //     marginTop: "10px",
                                                //     marginBottom: "10px"
                                                // }}
                                                />
                                                {formErrors[field.error] !== "" && (
                                                    <Grid
                                                        item
                                                        sx={{ color: "error.main", justifySelf: "left" }}
                                                    >
                                                        {" "}
                                                        {formErrors[field.error]}{" "}
                                                    </Grid>
                                                )}
                                            </Grid>
                                        )
                                    }
                                    else if (field.type === "dropdown" && field.subtype === "single") {
                                        return (
                                            <Grid item xs={5} key={index} style={{
                                                marginRight: index % 2 === 0 ? "5%" : 0,
                                                marginLeft: index % 2 !== 0 ? "5%" : 0,
                                                marginTop: "10px",
                                                marginBottom: "10px"
                                            }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id={field.name}> {field.label} </InputLabel>
                                                    <Select
                                                        labelId={field.name}
                                                        label={field.label}
                                                        value={formValues[field.name]}
                                                        name={field.name}
                                                        fullWidth
                                                        onChange={(e) => handleChange(e, "drop-sin")}
                                                    >
                                                        {
                                                            field.options.map((iterator, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={iterator}>{iterator}</MenuItem>
                                                                )
                                                            })
                                                        }

                                                    </Select>
                                                    {formErrors[field.error] !== "" && (
                                                        <Grid
                                                            item
                                                            xs={5}
                                                            sx={{ color: "error.main", justifySelf: "left" }}
                                                        >
                                                            {" "}
                                                            {formErrors[field.error]}{" "}
                                                        </Grid>)}
                                                </FormControl>
                                            </Grid>
                                        )
                                    }
                                    else if (field.type === "dropdown" && field.subtype === "multiple") {
                                        return (
                                            <Grid item xs={5} key={index} style={{
                                                marginRight: index % 2 === 0 ? "5%" : 0,
                                                marginLeft: index % 2 !== 0 ? "5%" : 0,
                                                marginTop: "10px",
                                                marginBottom: "10px"
                                            }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id={field.name}> {field.label} </InputLabel>
                                                    <Select
                                                        labelId={field.name}
                                                        label={field.label}
                                                        name={field.name}
                                                        multiple
                                                        fullWidth
                                                        onChange={(e) => handleChange(e, "drop-mul")}
                                                        value={formValues[field.name]}
                                                    >
                                                        {
                                                            field.options.map((iterator) => (
                                                                <MenuItem key={iterator} value={iterator}>{iterator}</MenuItem>
                                                            ))
                                                        }

                                                    </Select>
                                                    {formErrors[field.error] !== "" && (
                                                        <Grid
                                                            item
                                                            xs={5}
                                                            sx={{ color: "error.main", justifySelf: "left" }}
                                                        >
                                                            {" "}
                                                            {formErrors[field.error]}{" "}
                                                        </Grid>)}
                                                </FormControl>
                                            </Grid>
                                        )
                                    }
                                    else if (field.type === "date") {
                                        return (
                                            <Grid item xs={5} key={index} style={{
                                                marginRight: index % 2 === 0 ? "5%" : 0,
                                                marginLeft: index % 2 !== 0 ? "5%" : 0,
                                                marginTop: "10px",
                                                marginBottom: "10px"
                                            }}>
                                                {/* <Typography>{field.label}</Typography> */}
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        name={field.name}
                                                        label={field.label}
                                                        variant="outlined"
                                                        value={formValues[field.name]}
                                                        onChange={(newValue) => handleDateChange(newValue, field.name)}
                                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                {formErrors[field.err] !== "" && (
                                                    <Grid
                                                        item
                                                        xs={5}
                                                        sx={{ color: "error.main", justifySelf: "left" }}
                                                    >
                                                        {" "}
                                                        {formErrors[field.err]}{" "}
                                                    </Grid>
                                                )}
                                                <br />
                                            </Grid>
                                        )
                                    }
                                    else {
                                        return null;
                                    }

                                })}
                            </Grid>

                            <Grid container>
                                {companyFinancials.map((companyFinancialsField, index) => {
                                    return (
                                        companyFinancialsField.companyFinancialsFields.map((field, idx) => {
                                            if (field.type === "text" & field.subtype === "number") {
                                                return (
                                                    <Grid item xs={2} key={field.name} style={{
                                                        marginRight: idx !== companyFinancialsField.companyFinancialsFields.length - 1 ? "5%" : 0,
                                                        // marginLeft: index % 2 !== 0 ? "5%" : 0,
                                                        marginTop: "10px",
                                                        marginBottom: "10px"
                                                    }}>
                                                        <TextField
                                                            label={field.label}
                                                            name={field.name}
                                                            variant="outlined"
                                                            fullWidth
                                                            defaultValue={companyFinancialsValues[index].companyFinancialsValue[field.name]}
                                                            value={companyFinancialsValues[index].companyFinancialsValue[field.name]}
                                                            onChange={(e) => handleCompanyFinancialsChange(e, index, "number")}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                            else if (field.type === "dropdown" && field.subtype === "single") {
                                                return (
                                                    <Grid item xs={3} key={field.name} style={{
                                                        marginRight: "5%",
                                                        // marginLeft: index % 2 !== 0 ? "5%" : 0,
                                                        marginTop: "10px",
                                                        marginBottom: "10px"
                                                    }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id={field.label}> {field.label} </InputLabel>
                                                            <Select
                                                                label={field.label}
                                                                labelId={field.label}
                                                                name={field.name}
                                                                fullWidth
                                                                defaultValue={field.options[0]}
                                                                value={companyFinancialsValues[index].companyFinancialsValue[field.name]}
                                                                onChange={(e) => handleCompanyFinancialsChange(e, index, "dropdown")}
                                                            >
                                                                {
                                                                    field.options.map((iterator, index) =>
                                                                        <MenuItem key={index} value={iterator}>{iterator}</MenuItem>
                                                                    )
                                                                }

                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                )
                                            }
                                            else {
                                                return null;
                                            }
                                        })
                                    )
                                })}
                                {companyFinancials.length < 5 ? <Grid item xs={1} style={{ alignSelf: "center", marginLeft: "1%" }}>
                                    <Tooltip title="Add financial details">
                                        <AddIcon onClick={handlePlusClick} style={{ cursor: "pointer" }} aria-label="Add financial details" />
                                    </Tooltip>
                                </Grid> : null
                                }
                            </Grid>

                        </Box>

                    </Grid>

                    <Grid item xs={12}
                        sm={6}
                        md={12}
                        style={{

                        }}>
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: "1rem",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                mt: 3,
                                mb: 3
                            }}
                            type="submit"
                            fullWidth
                            size="large"
                            onClick={handleSubmit}
                        >
                            SUBMIT
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </main>
    );
}