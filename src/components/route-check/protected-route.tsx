import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { SESSION_COOKIE_KEY } from '../../constants/login';
import { LOGIN_PATH } from '../../constants/route-paths';

const ProtectedRoute = (): JSX.Element => {
	const [cookies] = useCookies([SESSION_COOKIE_KEY]);
	return cookies && cookies[SESSION_COOKIE_KEY] ? <Outlet /> : <Navigate to={LOGIN_PATH} replace />;
};

export default ProtectedRoute;
