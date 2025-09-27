import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export interface User {
    id?: number;
    name:string
}

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
}

export const createUser = async(user : User) : Promise<User> =>{
    const response = await axios.post<User>(API_URL, user);
    return response.data;
}

export const deleteUser = async(id : number) : Promise<void> =>{
    await axios.delete(`${API_URL}/${id}`)
}