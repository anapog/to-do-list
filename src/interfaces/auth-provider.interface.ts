import { User } from './user.interface';

export interface AuthContext {
	user: User;
	login: (user: User) => Promise<void>;
	logout: () => Promise<void>;
}
