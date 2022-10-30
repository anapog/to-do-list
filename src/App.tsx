import { Navigate, Route, Routes } from 'react-router-dom';
import ToDoList from './pages/to-do-list/to-do-list';
import Login from './pages/login/login';
import './App.scss';

const App = (): JSX.Element => {
	return (
		<div className="app" data-testid="app">
			<Routes>
				{/* TODO add guard to check auth creds */}
				<Route path="/login" element={<Login />} />
				<Route path="/to-do-list" element={<ToDoList />} />
				<Route path="*" element={<Navigate to="/to-do-list" replace />} />
			</Routes>
		</div>
	);
};

export default App;
