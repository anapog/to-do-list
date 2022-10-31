import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { INVENTED_TOKEN, SESSION_COOKIE_KEY } from '../constants/login';
import { HOME_PATH, LOGIN_PATH } from '../constants/route-paths';
import { INITIAL_USER } from '../constants/user';
import { UseAuth } from '../interfaces/useAuth.interface';
import { User } from '../interfaces/user.interface';
import { getLoginCookieOptions } from '../utils/authentication.utils';

export const useAuth = (): UseAuth => {
	const [user, setUser] = useState<User>(INITIAL_USER);
	const [, setCookie, removeCookie] = useCookies([SESSION_COOKIE_KEY]);
	const navigate = useNavigate();

	const login = async (userData: User): Promise<void> => {
		setUser(userData);
		setCookie(SESSION_COOKIE_KEY, INVENTED_TOKEN, getLoginCookieOptions());
		navigate(HOME_PATH);
		return new Promise(resolve => resolve());
	};

	const logout = async (): Promise<void> => {
		setUser(INITIAL_USER);
		removeCookie(SESSION_COOKIE_KEY, getLoginCookieOptions());
		navigate(LOGIN_PATH);
		return new Promise(resolve => resolve());
	};

	return { user, login, logout };
};
