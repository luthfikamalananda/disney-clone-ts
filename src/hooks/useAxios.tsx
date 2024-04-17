import { useEffect } from "react";
import instance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { CredentialState, saveCredential } from "../redux/reducer/userSlice";

export default function useAxios() {

  const dispatch = useDispatch()

  useEffect(() => {
    const resIntercept = instance.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err.response.status === 401) {
            const payloadUser: CredentialState = {
                uId: null,
                phone: null,
                isLogged: false,
                loading: 'succeeded'
            }
          dispatch(saveCredential(payloadUser))
        }
        return Promise.reject(err);
      }
    );
    return () => {
      instance.interceptors.response.eject(resIntercept);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return instance;
}