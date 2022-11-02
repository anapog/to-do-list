import { FormEvent, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './login.scss';

const Login = (): JSX.Element => {
	const { login } = useAuth();
	const inputUsernameRef = useRef<HTMLInputElement>(null);
	const inputPasswordRef = useRef<HTMLInputElement>(null);

	const handleLogin = async (event: FormEvent): Promise<void> => {
		event.preventDefault();
		try {
			const username = inputUsernameRef?.current?.value;
			const password = inputPasswordRef?.current?.value;

			if (username) {
				await login({ username, password });
			}
		} catch (error) {
			console.error(error);
		}
	};

	const username = inputUsernameRef?.current?.value?.length;
	const password = inputPasswordRef?.current?.value?.length;

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
						ref={inputUsernameRef}
						className="form-input"
						placeholder="Username"
						data-testid="form-input-username"
					/>
					<input
						type="password"
						ref={inputPasswordRef}
						className="form-input"
						placeholder="Password"
						data-testid="form-input-password"
					/>
					<button
						className="form-button"
						type="submit"
						disabled={!username || !password}
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
