export const getLoginCookieOptions = () => {
	const expires = new Date();
	expires.setMonth(expires.getMonth() + 1);

	return {
		path: '/',
		expires,
	};
};
