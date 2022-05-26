import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import backendApi from "../services/backend.axios";
import ChildrenProvider from "./ChidreanProvider";

interface BackendContextData {
    post(route: string, data: any): Promise<void>,
    put(route: string, data: any): Promise<void>
    get(route: string, onGet: (data: any) => void): Promise<void>
}

export const BackendContext = createContext({} as BackendContextData)

export const BackendProvider = ({ children }: ChildrenProvider) => {

    const navigate = useNavigate();

    const post = async (route: string, data: any): Promise<void> => {
        await backendApi.post(route, data).then(({ data }) => {
            Swal.fire(
                'Sucesso!',
                'Cadastro realizado com sucesso!',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao realizar cadastro, se persistir contate o suporte.',
                'error'
            )
        })
    }

    const put = async (route: string, data: any): Promise<void> => {
        await backendApi.put(route, data).then(({ data }) => {
            Swal.fire(
                'Sucesso!',
                'Registro atualizado com sucesso!',
                'success'
            )
            navigate(-1)
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao editar registro, se persistir contate o suporte.',
                'error'
            )
        })
    }

    const get = async (route: string, onGet: (data: any) => void): Promise<void> => {
        backendApi.get(route).then(({ data }) => {
            onGet(data);
        }).catch(() => {
            Swal.fire(
                'Ops!',
                'Ocorreu um erro ao caregar dados, se persistir contate o suporte.',
                'error'
            )
        })
    }


    return (
        <BackendContext.Provider value={{ post, put, get }}>
            {children}
        </BackendContext.Provider>
    )

}

export const useBackend = () => useContext(BackendContext)