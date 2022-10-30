import { getLoginCookieOptions } from '../../utils/authentication.utils';

describe('Authentication utils test suite', () => {
	test('should return useCookies options', () => {
		const expires = new Date();
		expires.setMonth(expires.getMonth() + 1);

		const response = getLoginCookieOptions();
		expect(response?.path).toBe('/');
		expect(response?.expires).toStrictEqual(expires);
	});
});
