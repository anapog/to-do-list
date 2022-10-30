import { Navigate, Route, Routes } from 'react-router-dom';
import ToDoList from './pages/to-do-list/to-do-list';
import ProtectedRoute from './components/route-check/protected-route';
import AuthenticationRoute from './components/route-check/authentication-route';
import Login from './pages/login/login';
import { HOME_PATH, LOGIN_PATH } from './constants/route-paths';
import './App.scss';

const App = (): JSX.Element => {
	return (
		<div className="app" data-testid="app">
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route path={HOME_PATH} element={<ToDoList />} />
				</Route>
				<Route element={<AuthenticationRoute />}>
					<Route path={LOGIN_PATH} element={<Login />} />
				</Route>
				<Route path="*" element={<Navigate to={HOME_PATH} replace />} />
			</Routes>
		</div>
	);
};

export default App;
