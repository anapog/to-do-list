import { Dispatch, SetStateAction } from 'react';
import { User } from './user.interface';

export interface AuthMethods {
	login: (user: User) => Promise<User>;
	logout: () => Promise<boolean>;
}

export interface AuthContext {
	user: User;
	setUser: Dispatch<SetStateAction<User>>;
	authMethods: AuthMethods;
}

export interface Auth extends AuthMethods {
	user: User;
}
