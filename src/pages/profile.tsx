import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store"

export default function Profile() {

    const credential = useSelector((state: RootState) => ({phone: state.user.phone, uId: state.user.uId}))

    return (
        <>
        <h2>Hello World {credential.phone}</h2>
        </>
    )
}