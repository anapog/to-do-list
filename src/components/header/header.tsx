import { useAuth } from '../../hooks/useAuth';
import { FiLogOut } from 'react-icons/fi';
import './header.scss';

const Header = (): JSX.Element => {
	const { logout } = useAuth();

	const handleLogout = async (): Promise<void> => {
		try {
			await logout();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="app-header" data-testid="app-header">
			<button className="header-logout" onClick={handleLogout} data-testid="header-logout">
				<FiLogOut />
			</button>
		</div>
	);
};

export default Header;
