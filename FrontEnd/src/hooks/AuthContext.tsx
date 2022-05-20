import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IUser } from "../interfaces/user.interface";
import backendApi from "../services/backend.axios";
import ChildrenProvider from "./ChidreanProvider";
interface AuthContextData {
    login(email: any, password: any): void,
    logout(): void,
    user: IUser | undefined,
    token: string | undefined,
    setUser: any
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: ChildrenProvider) => {
    const token_name = 'token_sabre';
    const [user, setUser] = useState<IUser>()
    const [token, setToken] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            const tokenlocal = localStorage.getItem(token_name);
            if (tokenlocal) {
                backendApi.get(`auth/${tokenlocal}`).then(({ data }) => {
                    setUser(data)
                    setToken(tokenlocal);
                    backendApi.defaults.headers.common['authorization'] = `Bearer ${tokenlocal}`;

                })
            }
        }
    }, [])

    const login = (email: string, password: string): void => {

        backendApi.post('/auth', {
            email,
            password
        }).then(({ data }) => {
            setUser(data.user)
            setToken(data.token)
            backendApi.defaults.headers.common['authorization'] = `Bearer ${data.token}`;
            localStorage.setItem(token_name, data.token);
            navigate('/')
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Login ou senha incorretos.',
                'error'
            )
        })

    }

    const logout = () => {
        setUser(undefined)
        setToken(undefined)
        localStorage.removeItem("token_sabre");
        navigate('/entrar');
    }

    return (
        <AuthContext.Provider value={{ login, user, token, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)