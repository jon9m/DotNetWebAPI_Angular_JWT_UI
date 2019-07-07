import { AppUserClaim } from './app-user-claims';

export class AppUserAuth {
  userName = '';
  bearerToken = '';
  isAuthenticated = false;
  claims: AppUserClaim[] = [];
}
