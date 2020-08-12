import { Privilege } from './privilege.interface';

export interface UserModel {
    firstName:string;
    lastName:string;
    middleName:string;
    emailId:string;
    id:string;
    userName:string;
    privileges:Array<Privilege>;
}