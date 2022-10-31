import { render, screen } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth';
import { AuthProvider, useAuthContext } from '../../providers/auth.provider';

jest.mock('../../hooks/useAuth');
const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
mockedUseAuth.mockReturnValue({
	user: { username: 'user', password: 'pass' },
	login: jest.fn(),
	logout: jest.fn(),
});

const ProviderTestingComponent = () => {
	const { user } = useAuthContext();

	return (
		<>
			<p>{user?.username}</p>
			<p>{user?.password}</p>
		</>
	);
};

describe('<AuthProvider />', () => {
	test('provides expected useAuth information to children', () => {
		render(
			<AuthProvider>
				<ProviderTestingComponent />
			</AuthProvider>
		);
		const userName = screen.getByText('user');
		const password = screen.getByText('pass');
		expect(userName).toBeInTheDocument();
		expect(password).toBeInTheDocument();
	});
});
