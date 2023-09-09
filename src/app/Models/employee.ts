import { Experience } from "./experience";

export interface Employee{
    employeeId:number,
    Name:string,
    IsActive:boolean,
    JoinDate:string,
    ImageName:string,
    ImageUrl: File| null,
    Experiences:Experience[]
}