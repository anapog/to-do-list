import { act, renderHook } from '@testing-library/react';
import { useCookies } from 'react-cookie';
import { useAuth } from '../../hooks/useAuth';
import { HOME_PATH, LOGIN_PATH } from '../../constants/route-paths';
import { INVENTED_TOKEN, SESSION_COOKIE_KEY } from '../../constants/login';

const TESTING_USER = { username: 'user', password: 'mypass' };
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	useNavigate: () => mockedNavigate,
}));

const mockedSetCookie = jest.fn();
const mockedRemoveCookie = jest.fn();
jest.mock('react-cookie');
const mockedUseCookies = useCookies as jest.MockedFunction<typeof useCookies>;
mockedUseCookies.mockReturnValue([TESTING_USER, mockedSetCookie, mockedRemoveCookie]);

describe('useAuth test suite', () => {
	test('should have initial user data when initializes', () => {
		const { result } = renderHook(() => useAuth());
		expect(result.current.user.username).toEqual(undefined);
		expect(result.current.user.password).toEqual(undefined);
	});

	test('should store a user when login executed', () => {
		const { result } = renderHook(() => useAuth());

		act(() => {
			result.current.login(TESTING_USER);
		});

		expect(result.current.user.username).toEqual(TESTING_USER.username);
		expect(result.current.user.password).toEqual(TESTING_USER.password);
		expect(mockedSetCookie).toHaveBeenCalledWith(SESSION_COOKIE_KEY, INVENTED_TOKEN, {
			path: '/',
			expires: expect.anything(),
		});
		expect(mockedNavigate).toHaveBeenCalledWith(HOME_PATH);
	});

	test('should remove a user when logout executed', () => {
		const { result } = renderHook(() => useAuth());

		act(() => {
			result.current.login(TESTING_USER);
			result.current.logout();
		});

		expect(result.current.user.username).toEqual(undefined);
		expect(result.current.user.password).toEqual(undefined);
		expect(mockedRemoveCookie).toHaveBeenCalledWith(SESSION_COOKIE_KEY, {
			path: '/',
			expires: expect.anything(),
		});
		expect(mockedNavigate).toHaveBeenCalledWith(LOGIN_PATH);
	});
});
