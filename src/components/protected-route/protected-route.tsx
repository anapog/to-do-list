import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ auth }: { auth: boolean }): JSX.Element => {
	return auth === true ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
