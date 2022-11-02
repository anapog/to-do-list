import { FiLogOut } from 'react-icons/fi';
import { useAuthContext } from '../../providers/auth.provider';
import './header.scss';

const Header = (): JSX.Element => {
	const { user, logout } = useAuthContext();

	const handleLogout = async (): Promise<void> => {
		try {
			await logout();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="app-header" data-testid="app-header">
			{user && user.username && <p className='welcome'>Welcome {user.username}</p>}
			<button className="header-logout" onClick={handleLogout} data-testid="header-logout">
				<FiLogOut />
			</button>
		</div>
	);
};

export default Header;
