import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Status } from '../Models/status';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseApiUrl: string = 'http://localhost:5073';

  constructor(private http: HttpClient) {}

  addEmployee(data: FormData): Observable<Status> {
    return this.http.post(this.baseApiUrl + '/api/Employees', data, {
      observe: 'response', 
      responseType: 'text' as 'json',
    })
    .pipe(
      map((response: HttpResponse<any>) => {
        const body: any = response.body;
        if (body && body.constructor === Object) {
          return body as Status;
        } else {
          return { statusCode: 0, message: body } as Status;
        }
      })
    );
  }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/Employees');
  }
}
