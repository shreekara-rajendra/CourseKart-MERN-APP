import { useState,useEffect } from "react";
import { useAuthContext } from "../../context/auth";

//Outlet will Help to create Sub routes within Routes
import { Outlet } from "react-router-dom";

import axios from "axios";
import Spinner from "../Spinner";


export default function PrivateRoute(){
    const[ok,setOk] = useState(false)
    const[auth] = useAuthContext()

    useEffect(()=> {
        const authCheck = async() => {
            const res  = await axios.get('/api/users/user-auth'); 
            if(res.data.ok)
            {
                setOk(true)
            }
            else
            {
                setOk(false)
            }
        }
        if(auth?.token) authCheck()
    },[auth?.token])

    return ok ? <Outlet/>: <Spinner path=''/>
}