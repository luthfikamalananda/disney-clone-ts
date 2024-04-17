import { useDispatch } from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import { useEffect, useState } from "react";
import { CredentialState, getCredential, saveCredential } from "../redux/reducer/userSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import { AppDispatch } from "../redux/store/store";

export default function ProtectedRoutes() {
    // const [isLoading, setIsLoading] = useState(true)

    const credential = useAppSelector((state): CredentialState => state.user)
    const dispatch = useDispatch<AppDispatch>();

    // const getCredential = async () => {
    //     try {
    //         const getData = await fetch('http://localhost:3000/v1/accounts/me', {
    //             credentials: 'include'
    //         })
    //         const token = await getData.json();   
    //         const payloadUser: CredentialState = {
    //             uId: token.data.id,
    //             phone: token.data.phone,
    //             isLogged: true,
    //             loading: 'idle'
    //         }
    //         console.log('tokennnn', token);
            
    //         dispatch(saveCredential(payloadUser))
    //     } catch (error) {
    //         console.log('error', error);
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     try {
    //         setIsLoading(true)
    //         dispatch(getCredential())
    //         console.log(credential)
    //     } catch (error) {
    //         console.log(error);
    //     }finally{
    //         setIsLoading(false)
    //     }
    // },[dispatch])

    // useEffect(() => {
    //     console.log("isLoading => ", isLoading)
    // }, [isLoading])

    useEffect(() => {
        dispatch(getCredential())
    }, [])

    return (
        <>
        {/* {(isLoading ? <h2>loading</h2> : (credential.loading === 'succeeded' ? <Outlet></Outlet> : <Navigate to="/"/>))} */}
         {/* {(isLoading ? <h2>loading</h2> : (credential.isLogged == true ? <Outlet></Outlet> : <Navigate to="/"/>))} */}
         {credential.loading === "pending" ? <h2>Loading</h2> : credential.loading == "succeeded" ? <Outlet></Outlet> : <Navigate to="/"/>}
        </>
        
    )
}