import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  employees:Employee[]=[];
  baseApiUrl:string="http://localhost:5073";
  imageBaseUrl:string=this.baseApiUrl+'';
  constructor(private service:EmployeeService){  }
  ngOnInit(): void {
   this.getAllEmployee();
  }
  getAllEmployee(){
this.service.getAllEmployee().subscribe({
  next:(res)=>{this.employees=res;},
  error:(res)=>{console.log(res)}
})
  }
}
