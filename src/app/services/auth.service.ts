import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtPayload } from '../Interfaces/JwtPayload.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private tokenKey = environment.tokenKey;

  constructor(private http: HttpClient) { }

  login(credentials: { Username: string; Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem(this.tokenKey, res.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    debugger;
    return !!this.getToken();
  }

  getUserRole(): string | null {
    debugger;
    const token = this.getToken();
    if (!token) return null;

    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role || null;
  }
}
