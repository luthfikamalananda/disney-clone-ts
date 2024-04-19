import { useDispatch } from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import { useEffect } from "react";
import { CredentialState, getCredential } from "../redux/reducer/userSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import { AppDispatch } from "../redux/store/store";
import { ClipLoader } from "react-spinners";

export default function PublicRoutes() {
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
    //         dispatch(saveCredential(payloadUser))
    //     } catch (error) {
    //         console.log('error', error);
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     try {
    //         dispatch(getCredential())
    //     } catch (error) {
    //         console.log(error);
    //     }finally{
    //         setIsLoading(false)
    //     }
    // },[dispatch])

    useEffect(() => {
        dispatch(getCredential())
    }, [])

    return (
        <>
        {/* {(isLoading ? <h2>loading</h2> : (credential.isLogged === true ? <Navigate to="/homepage"/> : <Outlet></Outlet>))} */}
        {credential.loading === "pending" ? <div className="flex justify-center items-center h-screen bg-[#101414]"><ClipLoader
                    size={150}
                    color="rgba(227, 239, 236, 1)"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /></div> : credential.isLogged ? <Navigate to="/homepage"/> : <Outlet></Outlet>}
        </>
        
    )
}