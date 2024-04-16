import { useAppSelector } from "../hooks/useAppSelector";
import { CredentialState } from "../redux/reducer/userSlice";

export default function Profile() {

    const credential = useAppSelector((state): CredentialState => state.user)

    return (
        <>
        <h2>Hello World {credential.phone}</h2>
        </>
    )
}