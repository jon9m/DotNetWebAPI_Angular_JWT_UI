import { AppUserAuth } from './app-user-auth';

export const LOGIN_MOCKS: AppUserAuth[] = [
  {
    userName: 'kuruwita',
    bearerToken: 'kui39ewr3ewrw3ew',
    isAuthenticated: true,
    canAccessProducts: true,
    canAddProduct: true,
    canSaveProduct: true,
    canAccessCategories: true,
    canAddCatagory: false
  },
  {
    userName: 'siripala',
    bearerToken: 'sii39ewr3ewrw3ew',
    isAuthenticated: true,
    canAccessProducts: false,
    canAddProduct: false,
    canSaveProduct: false,
    canAccessCategories: true,
    canAddCatagory: true
  }
];
