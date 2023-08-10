import React from "react";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Grid, Autocomplete, InputBase, TextField } from "@mui/material";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import GeneralMarketInfo from "./generalMarketInfo";
import CompanyInfo from "./CompanyInfo";
import apiCall from "../../apiCall/apiCall";
import { routes } from "../../config/serverconfig";
import { get } from "firebase/database";

const PROD_SERV_ADDRESS_API = routes.PROD_SERV_ADDRESS_API;


export default function UserHome({ companyData, setCompanyData }) {

    const [allCompanies, setAllCompanies] = React.useState(["Infosys"]);
    const [enteredCompany, setEnteredCompany] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [Datamsg, setDataMsg] = React.useState("");
    const [OverviewMsg, setOverviewMsg] = React.useState("");
    const [statsMsg, setStatsMsg] = React.useState("");
    const [color, setColor] = React.useState("");
    const [chartData, setChartData] = React.useState();
    const [companyOverview, setCompanyOverview] = React.useState("");
    const [stats, setStats] = React.useState([]);
    React.useEffect(() => {
        (async () => {
            const res = await apiCall(
                `${PROD_SERV_ADDRESS_API}/data/getAllCompanyNames`,
                "GET",
                null
            )
            if (res.status === 200) {
                setAllCompanies(res.data);
            }




        })();
    }, []);

    const fetchCompanyData = async (company) => {
        setLoading(true);
        setChartData();
        var res;
        // console.log(company)
        setEnteredCompany(company);
        if (company && company !== "") {
            //console.log("Fetch");
            let res;
            let res2;
            try {
                res = await axios.post("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server/data/getCompanyInfo", {
                    NAME: company
                })
                setCompanyData(res.data[0])
                console.log(res.data[0])
                setDataMsg("");
                if (res.data[0].changepct > 0) setColor("green")
                else setColor("red")
            }
            catch (err) {
                setDataMsg(err.response.data);
            }

            try {
                res2 = await axios.get("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server/data/recent?name=" + company + "&se=" + res.data[0].seListed[0]);
                if (res2.data.success) {
                    setCompanyOverview(res2.data.data);
                    setOverviewMsg("");
                }
            }
            catch (err) {
                setOverviewMsg(err.response.data)
            }

            try {
                res2 = await apiCall("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/analytics/stats/byName?name=" + res.data[0].name, "GET", null);
                if (res2.data.success) {
                    // console.log(res.data[0])
                    setStats(res2.data.data)
                    setStatsMsg("");
                }
            }
            catch (err) {
                setStatsMsg(err.response.data);
            }

            try {
                res = await apiCall(
                    "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalData?companyName=" + res.data[0].name + "&seCode=NSE&year=2022",
                    "GET",
                    null
                )
                if (res.status === 200) {
                    console.log(res.data.data);
                    setChartData(res.data.data);
                }
            }
            catch(err) {
                console.log(err);
            }
            setLoading(false);
        }
        else {
            setCompanyData({});
        }
    }



    if (!auth.currentUser) {
        return <Navigate to="/" />;
    } else if (auth.currentUser && !auth.currentUser.emailVerified) {
        return <Navigate to="/verify-email" />;
    } else if (Object.keys(companyData).length !== 0) {
        if (Datamsg === "") {
            return (
                <main style={{ position: "absolute", left: "68px", top: "70px" }}>
                    <Header setCompanyData={setCompanyData} />
                    <CompanyInfo companyData={companyData} companyOverview={companyOverview} chartData={chartData} color={color} fetchCompanyData={fetchCompanyData} allCompanies={allCompanies} stats={stats} Datamsg={Datamsg} OverviewMsg={OverviewMsg} statsMsg={statsMsg} />
                </main>
            );
        }
        else {
            return (
                <main style={{ position: "absolute", left: "68px", top: "70px" }}>
                    <Header setCompanyData={setCompanyData} />
                    <div>{Datamsg}</div>
                </main>
            )
        }
    }
    else {
        return (
            <main>
                <Header setCompanyData={setCompanyData} />
                <GeneralMarketInfo fetchCompanyData={fetchCompanyData} allCompanies={allCompanies} />
            </main>
        )
    }
}