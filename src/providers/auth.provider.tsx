import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { SESSION_COOKIE_KEY, INVENTED_TOKEN } from '../constants/login';
import { INITIAL_USER } from '../constants/user';
import { Auth, AuthContext } from '../interfaces/login.interface';
import { User } from '../interfaces/user.interface';
import { getLoginCookieOptions } from '../utils/authentication.utils';

const ToDoListAuthContext = createContext({} as AuthContext);

export const useAuthContext = () => useContext(ToDoListAuthContext);

const AuthProvider = ({ children }: { children: any }) => {
	const [user, setUser] = useState<User>(INITIAL_USER);
	const [, setCookie, removeCookie] = useCookies([SESSION_COOKIE_KEY]);

	const login = async (userData: User): Promise<User> => {
		setUser(userData);
		setCookie(SESSION_COOKIE_KEY, INVENTED_TOKEN, getLoginCookieOptions());
		return new Promise(resolve => resolve(userData));
	};

	const logout = async (): Promise<boolean> => {
		setUser(INITIAL_USER);
		removeCookie(SESSION_COOKIE_KEY, getLoginCookieOptions());
		return new Promise(resolve => resolve(true));
	};

	return (
		<ToDoListAuthContext.Provider
			value={{
				user,
				setUser,
				authMethods: {
					login,
					logout,
				},
			}}
		>
			<>{children}</>
		</ToDoListAuthContext.Provider>
	);
};

export const useAuth = (): Auth => {
	const { user, authMethods } = useAuthContext();
	return { user, ...authMethods };
};

export default AuthProvider;
