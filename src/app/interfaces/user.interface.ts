
export interface User {
  email: string;
  role: string;
  scopes: string[];
  accessToken: string;
  picture: string;
  expiresAt: number;
  username: string;
  subsidiaryId?: number;
  providerId?: number;
}

export interface CommonGeneralData {
  name: string;
  country: string;
  city: string;
  address: string;
}


export interface CommonContactData {
  name: string;
  phone: string;
  email: string;
  adminEmail: string;
}
