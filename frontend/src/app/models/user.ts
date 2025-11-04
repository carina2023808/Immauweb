export interface User {
createdAt: any;
  id?: number;
  firstname?: string;
  lastname?: string;
  email: string;
  imageName?: string;
  password: string;
  roles: string[];
  properties?: any[];
}
