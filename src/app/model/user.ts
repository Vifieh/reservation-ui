import {Role} from "../enum/role.enum";

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role[];
}

export interface RegisterPayload {
  email: string;
  password: string;
  role: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}
