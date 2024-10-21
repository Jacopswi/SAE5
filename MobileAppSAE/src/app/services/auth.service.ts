import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable,BehaviorSubject} from 'rxjs';
import { lastValueFrom } from 'rxjs';

interface LoginResponse {
  success:boolean;
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  isAuthCheckCompleted: boolean = false;
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string,stayLogged : boolean): Observable<LoginResponse> {

    const userData = {
      email: email,
      password: password,
      stayLoggedIn:stayLogged
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, userData, { withCredentials: true })
      .pipe(
        tap(response  => {
          if (response && response.success) {
            this.isAuthenticatedSubject.next(true);
            this.isAuthCheckCompleted = true;
          } else {
            this.isAuthenticatedSubject.next(false);
            this.isAuthCheckCompleted = true;
          }
        })
      );
  }

  async logout(): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }));
      this.isAuthenticatedSubject.next(false);
      return response;
    } catch (error) {
      console.error('Error logging out', error);
      this.isAuthenticatedSubject.next(true);
      throw error; 
    }
  }

  register(userData : any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

}
