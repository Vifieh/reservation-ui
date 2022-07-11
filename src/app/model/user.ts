import {Role} from "../enum/role";

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
