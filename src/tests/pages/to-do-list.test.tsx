import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ToDoList from '../../pages/to-do-list/to-do-list';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigate,
}));

const initialSetup = () => {
	render(
		<BrowserRouter>
			<ToDoList />
		</BrowserRouter>
	);
};
describe('<ToDoList /> test suite', () => {
	afterEach(cleanup);

	test('should render to-do-list container', () => {
		initialSetup();
		const listContainer = screen.getByTestId('to-do-list');
		expect(listContainer).toBeInTheDocument();
	});

	test('should render a header', () => {
		initialSetup();
		const header = screen.getByTestId('app-header');
		expect(header).toBeInTheDocument();
	});

	test('should render a form', () => {
		initialSetup();
		const form = screen.getByTestId('task-form');
		expect(form).toBeInTheDocument();
	});

	test('should render a list', () => {
		initialSetup();
		const list = screen.getByTestId('task-list');
		expect(list).toBeInTheDocument();
	});
});
