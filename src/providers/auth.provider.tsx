import { createContext, useContext, useState } from 'react';
import { INITIAL_USER } from '../constants/user';
import { Auth, AuthContext, AuthMethods, UserHook } from '../interfaces/login.interface';
import { User } from '../interfaces/user.interface';

const TodoAuthContext = createContext({} as AuthContext);

export const useAuthContext = () => useContext(TodoAuthContext);

const AuthProvider = ({
	authMethods,
	children,
}: {
	authMethods?: Partial<AuthMethods>;
	children: any;
}) => {
	const [user, setUser] = useState<User>(INITIAL_USER);

	const login = async (userData: User): Promise<User> => {
		setUser(userData);
		return new Promise((resolve, reject) => resolve(userData));
	};

	const logout = async (): Promise<boolean> => {
		setUser(INITIAL_USER);
		return new Promise((resolve, reject) => resolve(true));
	};

	const composedAuthMethods = {
		login: authMethods?.login || login,
		logout: authMethods?.logout || logout,
	};

	return (
		<TodoAuthContext.Provider
			value={{
				user,
				setUser,
				authMethods: composedAuthMethods,
			}}
		>
			<>{children}</>
		</TodoAuthContext.Provider>
	);
};

export const useUser = (): UserHook => {
    const { user, setUser } = useAuthContext();
    return { ...user, setUser };
};

export const useAuth = (): Auth => {
	const { user, authMethods } = useAuthContext();
	return { user, ...authMethods };
};

export default AuthProvider;
