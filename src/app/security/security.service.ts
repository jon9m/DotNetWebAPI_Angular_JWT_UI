import { Injectable } from '@angular/core';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators/tap';
import { HttpHeaders, HttpClient } from '@angular/common/http';


const API_URL = 'http://localhost:4200/api/security/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  securityObject: AppUserAuth = new AppUserAuth();

  constructor(private http: HttpClient) { }

  login = (entity: AppUser): Observable<AppUserAuth> => {
    this.resetSecurityObject();

    return this.http.post<AppUserAuth>(API_URL + 'login', entity, httpOptions).pipe(
      tap(resp => {
        Object.assign(this.securityObject, resp);
        localStorage.setItem('bearerToken', this.securityObject.bearerToken);
      })
    );
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];

    localStorage.removeItem('bearerToken');
  }

  hasClaim(claimType: any, claimValue?: any) {
    if (typeof claimType === 'string') {
      return this.isClaimValid(claimType, claimValue);
    } else {
      const claims: string[] = claimType;
      for (const claim of claims) {
        if (this.isClaimValid(claim)) {
          return true;
        }
      }
    }
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret = false;
    let auth: AppUserAuth = null;
    auth = this.securityObject;

    if (auth) {
      if (claimType.indexOf(':') >= 0) {
        const words: string[] = claimType.split(':');
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      } else {
        claimType = claimType.toLowerCase();
        claimValue = claimValue ? claimValue : 'true';
      }

      ret = auth.claims.find(c =>
        c.claimType.toLowerCase() === claimType && c.claimValue === claimValue) != null;
    }
    return ret;
  }
}
