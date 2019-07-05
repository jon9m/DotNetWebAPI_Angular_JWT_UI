import { Injectable } from '@angular/core';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
import { Observable, of } from 'rxjs';
import { LOGIN_MOCKS } from './login-mocks';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  securityObject: AppUserAuth = new AppUserAuth();

  constructor() { }

  login(entity: AppUser): Observable<AppUserAuth> {
    this.resetSecurityObject();
    Object.assign(this.securityObject, LOGIN_MOCKS.find(user => {
      return user.userName.toLowerCase() === entity.userName.toLowerCase();
    }));

    if (this.securityObject.userName !== '') {
      localStorage.setItem('bearerToken', this.securityObject.bearerToken);
    }
    return of<AppUserAuth>(this.securityObject);
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.canAccessProducts = false;
    this.securityObject.canAddProduct = false;
    this.securityObject.canSaveProduct = false;
    this.securityObject.canAccessCategories = false;
    this.securityObject.canAddCatagory = false;

    localStorage.removeItem('bearerToken');
  }
}
