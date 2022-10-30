import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH } from '../../constants/route-paths';
import { useAuth } from '../../providers/auth.provider';
import './login.scss';

const Login = (): JSX.Element => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleLogin = async (event: FormEvent): Promise<void> => {
		event.preventDefault();
		try {
			await login({ username, password });
			navigate(HOME_PATH);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setPassword(event.target.value);
	};

	return (
		<div className="login" data-testid="login">
			<header className="form-header" data-testid="form-header">
				To Do List
			</header>
			<div className="form-box">
				<p className="form-intro" data-testid="form-intro">
					Log in to continue:
				</p>
				<form className="login-form" onSubmit={handleLogin} data-testid="login-form">
					<input
						type="text"
						className="form-input"
						value={username}
						placeholder="Username"
						onChange={handleUsernameChange}
						data-testid="form-input-username"
					/>
					<input
						type="password"
						className="form-input"
						value={password}
						placeholder="Password"
						onChange={handlePasswordChange}
						data-testid="form-input-password"
					/>
					<button
						className="form-button"
						type="submit"
						disabled={!username?.length || !password?.length}
						data-testid="login-form-button"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
