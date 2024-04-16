import { useDispatch } from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import { useEffect, useState } from "react";
import { CredentialState, saveCredential } from "../redux/reducer/userSlice";
import { useAppSelector } from "../hooks/useAppSelector";

export default function PublicRoutes() {
    const [isLoading, setIsLoading] = useState(true)

    const credential = useAppSelector((state): CredentialState => state.user)
    
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