import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { SESSION_COOKIE_KEY } from '../../constants/login';
import { HOME_PATH } from '../../constants/route-paths';

const AuthenticationRoute = (): JSX.Element => {
	const [cookies] = useCookies([SESSION_COOKIE_KEY]);
	return cookies && cookies[SESSION_COOKIE_KEY] ? <Navigate to={HOME_PATH} replace /> : <Outlet />;
};

export default AuthenticationRoute;
