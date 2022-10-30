import { FormEvent, useState } from 'react';
import { INITIAL_USER } from '../../constants/user';
import { User } from '../../interfaces/user.interface';
import './login.scss';

const Login = (): JSX.Element => {
	const [user, setUser] = useState<User>(INITIAL_USER);

	const handleLogin = (event: FormEvent): void => {
		event.preventDefault();
		// TODO call fake request service
		// TODO persistently save token
		setUser(INITIAL_USER);
	};

	const handleInputChange =
		(propertyName: string) =>
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const updatedUser: User = { ...user, [propertyName]: event.target.value };
			setUser({ ...updatedUser });
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
						value={user.username}
						placeholder="Username"
						onChange={handleInputChange('username')}
						data-testid="form-input-username"
					/>
					<input
						type="password"
						className="form-input"
						value={user.password}
						placeholder="Password"
						onChange={handleInputChange('password')}
						data-testid="form-input-password"
					/>
					<button
						className="form-button"
						type="submit"
						disabled={!user.username || !user.password}
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
