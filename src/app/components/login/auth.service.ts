import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/entities/apiresponse.entity';
import { UserDTO } from '../../core/dto/user.Dto';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users'; // Cambiado al controlador de usuarios

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<ApiResponse<UserDTO>> {
    return this.http.post<ApiResponse<UserDTO>>(`${this.apiUrl}/login`, { username, password });
  }
}
