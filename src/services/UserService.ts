import api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

export default class UserService {
    //auth mmiddleware
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return api.get<IUser[]>('/users')
    }

    //roles mmiddleware
    static fetchUsers2(): Promise<AxiosResponse<IUser[]>> {
        return api.get<IUser[]>('/usersRoles')
    }
  
}

