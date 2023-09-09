import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Models/employee';
import { Experience } from 'src/app/Models/experience';
import { Status } from 'src/app/Models/status';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  constructor(private service: EmployeeService, private fb: FormBuilder) {}

  url: string = '/assets/img/noImage.png';
  imageFile: File | null = null;

  onSelect(event: any) {
    const file = event.target.files[0];
    if (file && file.type.match(/image\/*/)) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log('imageFile:', this.imageFile);
      };
    }
  }

  frm!: FormGroup;
  ngOnInit(): void {
    this.frm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      isActive: [false], 
      joinDate: ['', Validators.required], 
      experiences: [],
    });
  }

  employeeObj: Employee = {
    Name: '',
    ImageName: '',
    employeeId: 0,
    IsActive: false,
    JoinDate: '2023-07-24', 
    ImageUrl: null,
    Experiences: [],
  };

  employeeExObj: Experience = {
    experienceId: 0,
    Title: '',
    Duration: 0,
    employeeId: 0,
  };

  empExperiences: any[] = [];

  addExperience() {
    if (this.employeeExObj.Title !== '' && this.employeeExObj.Duration !== 0) {
      const strExpObj = JSON.stringify(this.employeeExObj);
      const obj = JSON.parse(strExpObj);
      this.empExperiences.unshift(obj);
      this.employeeExObj = {
        experienceId: 0,
        Title: '',
        Duration: 0,
        employeeId: 0,
      };
    }
  }

  deleteExperience(exp: Experience, arry: any[]) {
    const objWithTitle = arry.findIndex((obj) => obj.title == exp.Title);
    if (objWithTitle > -1) {
      arry.splice(objWithTitle, 1);
    }
  }

  get f() {
    return this.frm.controls;
  }

  status!: Status;

  // onPost() {
  //   this.status = { statusId: 0, message: 'wait..........' };
  //   if (this.frm.valid && this.imageFile) {
  //     const formData = new FormData();
  //     formData.append('name', this.frm.get('name')!.value);
  //     formData.append('isActive', this.frm.get('isActive')!.value);
  //     formData.append('joinDate', this.frm.get('joinDate')!.value);
  //     formData.append('imgName', this.imageFile.name);
  //     formData.append('imgFile', this.imageFile);

      
  //     formData.append('experiences', JSON.stringify(this.empExperiences));

  //     this.service.addEmployee(formData).subscribe(
  //       (res) => {
  //         this.status.message = 'Employee added successfully';
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //         this.status = { statusId: 0, message: 'Server Error Occurred!!!!!!' };
  //       }
  //     );
  //   } else if (!this.imageFile) {
  //     this.status = { statusId: 0, message: 'Please select an image' };
  //   } else {
  //     this.status = { statusId: 0, message: 'Please fill in all the required fields' };
  //   }
  // }

  onPost() {
    this.status = { statusCode: 0, message: 'wait..........' };
    if (this.frm.valid && this.imageFile) {
      const formData = new FormData();
      formData.append('Name', this.frm.get('name')!.value);
      formData.append('IsActive', this.frm.get('isActive')!.value);
      formData.append('JoinDate', this.frm.get('joinDate')!.value);
      formData.append('ImageName', this.imageFile.name);
      formData.append('ImageUrl', this.imageFile);

      formData.append('Experiences', JSON.stringify(this.empExperiences));

      this.service.addEmployee(formData).subscribe(
        (res) => {
          this.status.message = 'Employee added successfully';
          this.frm.reset(); 
          this.url = '/assets/img/noImage.png'; 
          this.imageFile = null; 
          this.empExperiences = []; 
        },
        (error) => {
          console.error('Error:', error);
          this.status = { statusCode: 0, message: 'Server Error Occurred!!!!!!' };
        }
      );
    } else if (!this.imageFile) {
      this.status = { statusCode: 0, message: 'Please select an image' };
    } else {
      this.status = { statusCode: 0, message: 'Please fill in all the required fields' };
    }
  }
}
