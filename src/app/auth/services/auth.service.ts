import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.BASE_URL;

@Injectable({providedIn: 'root'})
export class AuthService {

    private _authStatus = signal<AuthStatus>('checking')
    private _user = signal<User|null>(null);
    private _token = signal<string|null>(localStorage.getItem('token'));

    checkStatusResource = rxResource({
        loader: () => this.checkStatus()
    })

    private http = inject(HttpClient);

    authStatus = computed<AuthStatus>(() => {
        if(this._authStatus() === 'checking') return 'checking';
        if(this._user()){
            return 'authenticated'
        }
        return 'not-authenticated';
    });

    user = computed<User|null>(() => this._user())
    token = computed(this._token);

    login(email: string, password: string): Observable<boolean>{
        return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
            email: email,
            password: password,
        }).pipe(
            map((resp) => this.handleAuthSuccess(resp)),
            catchError((error: any) => this.handleAuthError(error))
        )
    }

    register(email: string, password: string, fullName: string): Observable<boolean>{
        return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, {
            email: email,
            password: password,
            fullName: fullName,
        }).pipe(
            map((resp) => this.handleAuthSuccess(resp)),
            catchError((error: any) => this.handleAuthError(error))
        )
    }

    checkStatus(): Observable<boolean>{
        const token = localStorage.getItem('token');
        if(!token){
            return of(false)
        }
        return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {

        }).pipe(
            map((resp) => this.handleAuthSuccess(resp)),
            catchError((error: any) => this.handleAuthError(error))
        )
    }
    logout(){
        this._authStatus.set('not-authenticated');
        this._user.set(null);
        this._token.set(null);

        localStorage.removeItem('token');
    }

    private handleAuthSuccess({token, user}: AuthResponse){
        this._authStatus.set('authenticated');
        this._user.set(user);
        this._token.set(token);

        localStorage.setItem('token', token);

        return (true);
    }

    private handleAuthError(error: any){
        this.logout();
        return of(false);
    }
}