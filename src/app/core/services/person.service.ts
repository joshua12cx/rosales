import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../entities/person.entity';
import { ApiResponse } from '../entities/apiresponse.entity';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:8080/api/persons';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<Person[]>> {
    return this.http.get<ApiResponse<Person[]>>(`${this.apiUrl}/getAll`);
  }

  getById(id: number): Observable<ApiResponse<Person>> {
    return this.http.get<ApiResponse<Person>>(`${this.apiUrl}/getOne/${id}`);
  }

  create(person: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/create`, person);
  }

  update(id: number, person: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/update/${id}`, person);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/delete/${id}`);
  }
}
