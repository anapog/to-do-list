import { render, screen } from '@testing-library/react';
import { useAuth } from '../../providers/auth.provider';

jest.mock('../../providers/auth.provider', () => ({
	useAuth: jest.fn(),
}));
const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
mockedUseAuth.mockReturnValue({
	user: { username: 'user', password: 'pass' },
	login: jest.fn(),
	logout: jest.fn(),
});

const UseAuthTestingComponent = () => {
	const { user } = useAuth();

	return (
		<>
			<p>{user?.username}</p>
			<p>{user?.password}</p>
		</>
	);
};

describe('<AuthProvider />', () => {
	test('provides expected useAuth information to children', () => {
		render(<UseAuthTestingComponent />);
		const userName = screen.getByText('user');
		const password = screen.getByText('pass');
		expect(userName).toBeInTheDocument();
		expect(password).toBeInTheDocument();
	});
});
