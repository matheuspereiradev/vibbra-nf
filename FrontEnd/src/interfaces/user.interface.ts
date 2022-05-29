export interface IUser {
    id: number,
    email: string,
    name: string,
    surname: string,
    isOwner:boolean,
    company:ICompany
}

export interface ICompany{
    id: number,
    cnpj:string,
    name:string,
    corporateName:string

}