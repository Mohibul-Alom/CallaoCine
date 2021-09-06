import { IapiTicket } from "src/app/models/iapi";

export interface IuserData {
    _id: string;
    email: string;
    role: string;
    name: string;
    tickets: IapiTicket[];    
}
