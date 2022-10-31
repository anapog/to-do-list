import { User } from './user.interface';

export interface UseAuth {
	user: User;
	login: (userData: User) => Promise<void>;
	logout: () => Promise<void>;
}
