import { useDispatch, useSelector } from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import type { RootState } from "../redux/store/store"
import { useEffect, useState } from "react";
import { CredentialState, saveCredential } from "../redux/reducer/userSlice";

export default function PublicRoutes() {
    const [isLoading, setIsLoading] = useState(true)

    const credential = useSelector((state: RootState) => ({phone: state.user.phone, uId: state.user.uId, isLogged: state.user.isLogged}))
    console.log(credential);
    
    const dispatch = useDispatch();

    const getCredential = async () => {
        try {
            const getData = await fetch('http://localhost:3000/v1/accounts/me', {
                credentials: 'include'
            })
            const token = await getData.json();    
            const payloadUser: CredentialState = {
                uId: token.data.id,
                phone: token.data.phone,
                isLogged: true
            }
            dispatch(saveCredential(payloadUser))
            console.log('cred',credential);
        } catch (error) {
            console.log('error', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCredential()
    },[])

    return (
        <>
        {(isLoading ? <h2>loading</h2> : (credential.isLogged === true ? <Navigate to="/profile"/> : <Outlet></Outlet>))}
        </>
        
    )
}