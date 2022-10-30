import { Navigate, Route, Routes } from 'react-router-dom';
import ToDoList from './pages/to-do-list/to-do-list';
import ProtectedRoute from './components/protected-route/protected-route';
import Login from './pages/login/login';
import './App.scss';

const App = (): JSX.Element => {
	// TODO get session cookie
	const isAuth = true;

	return (
		<div className="app" data-testid="app">
			<Routes>
				{/* TODO add guard to check auth creds */}
				<Route path="/login" element={isAuth ? <Navigate to="/to-do-list" /> : <Login />} />
				<Route element={<ProtectedRoute auth={isAuth} />}>
					<Route path="/to-do-list" element={<ToDoList />} />
				</Route>
				<Route path="*" element={<Navigate to="/to-do-list" replace />} />
			</Routes>
		</div>
	);
};

export default App;
