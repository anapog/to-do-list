import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/route-paths';
import { useAuth } from '../../providers/auth.provider';
import { FiLogOut } from 'react-icons/fi';
import './header.scss';

const Header = (): JSX.Element => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async (): Promise<void> => {
		try {
			await logout();
			navigate(LOGIN_PATH);
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
