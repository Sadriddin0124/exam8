export interface IEmployeePayload{
    _id?: FormDataEntryValue | null
    avatar: FormDataEntryValue | null
    description: FormDataEntryValue | null
    first_name: FormDataEntryValue | null
    last_name: FormDataEntryValue | null
    password: FormDataEntryValue | null
    role: FormDataEntryValue | null
    username: FormDataEntryValue | null
    age: number
}
export interface IEmployee{
    _id?: string;
    avatar: string
    description: string
    first_name: string
    last_name: string
    password: string
    role: string
    username: string
    age: number | string
}