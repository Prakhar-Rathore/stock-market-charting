import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import {
    collection,
    doc,
    query,
    orderBy,
    limit
} from "firebase/firestore" ;

import {auth} from "../firebase";
import {routes} from "../serverconfig";
//use production server api only when to deploy to firebase or in local server there is bug
const PROD_SERV_ADDRESS_API = routes.PROD_SERV_ADDRESS_API;
// for testing purpose use development api
const DEV_SERV_ADDRESS_API = routes.DEV_SERV_ADDRESS_API;

const performanceContext = React.createContext();

export function usePerformance() {
    return useContext(performanceContext);
}

export const PerformanceProvider = ({children}) => {

    const [best, setbest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [worst, setworst] = useState(null);

    const getBest = async () => {
        try {
            const res = await axios.get(`${PROD_SERV_ADDRESS_API}/bestStocks`);
            setbest(res.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            return error;
        }
    }

    const getWorst = async () => {
        try {
            const res = await axios.get(`${PROD_SERV_ADDRESS_API}/worstStocks`);
            setworst(res.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            return error;
        }
    }

    const value = {
        best,
        loading,
        error,
        worst,
        getBest,
        getWorst
    };

    return (
        <performanceContext.Provider value={value}>
            {children}
        </performanceContext.Provider>
    );
}
