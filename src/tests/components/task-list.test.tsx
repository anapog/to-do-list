import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import TaskList from '../../components/task-list/task-list';

const MOCK_LIST = [
	{ description: 'first description', id: 0 },
	{ description: 'second description', id: 1 },
];
const EDITED_VALUE = 'edited description';
const removeTask = jest.fn();
const editTask = jest.fn();
const MOCK_DATA = { list: MOCK_LIST, removeTask, editTask };
const EMPTY_MOCK_DATA = { list: [], removeTask, editTask };

const emptyListSetup = () => {
	render(<TaskList {...EMPTY_MOCK_DATA} />);
	const listContainer = screen.queryByTestId('task-list');
	const listItems = screen.queryByTestId('task-list-item');
	const actionsContainer = screen.queryByTestId('task-list-actions');
	const removeButton = screen.queryByTestId('actions-remove');
	const editButton = screen.queryByTestId('actions-edit-save');
	const emptyMessage = screen.getByText('Sorry, there are no items to be displayed');

	return {
		listContainer,
		listItems,
		actionsContainer,
		removeButton,
		editButton,
		emptyMessage,
	};
};

const initialListSetup = () => {
	render(<TaskList {...MOCK_DATA} />);
	const listContainer = screen.getByTestId('task-list');
	const listItems = within(screen.getByRole('list')).getAllByRole('listitem');
	const actionsContainer = screen.getAllByTestId('task-list-actions');
	const removeButton = screen.getAllByTestId('actions-remove');
	const editButton = screen.getAllByTestId('actions-edit-save');
	const editedItem = screen.queryByTestId('task-list-item-input');
	return {
		listContainer,
		listItems,
		actionsContainer,
		removeButton,
		editButton,
		editedItem,
	};
};

describe('<TaskList /> test suite', () => {
	afterEach(cleanup);

	test('should render empty message when no item list length', () => {
		const {
			listContainer,
			listItems,
			actionsContainer,
			removeButton,
			editButton,
			emptyMessage,
		} = emptyListSetup();
		expect(listContainer).toBeInTheDocument();
		expect(listItems).toBe(null);
		expect(actionsContainer).toBe(null);
		expect(removeButton).toBe(null);
		expect(editButton).toBe(null);
		expect(emptyMessage).toBeInTheDocument();
	});

	test('should render list of items when item list has length', () => {
		const { listContainer, listItems, actionsContainer, removeButton, editButton, editedItem } =
			initialListSetup();
		const editInput = screen.queryByTestId('task-list-item-input');
		expect(listContainer).toBeInTheDocument();
		expect(listItems).toHaveLength(MOCK_LIST.length);
		expect(editInput).not.toBeInTheDocument();
		expect(actionsContainer).toHaveLength(MOCK_LIST.length);
		expect(removeButton).toHaveLength(MOCK_LIST.length);
		expect(editButton).toHaveLength(MOCK_LIST.length);
		expect(editedItem).toBe(null);
	});

	describe('handle action button events', () => {
		test('should call removeTask when user clicks on remove icon', async () => {
			const { removeButton } = initialListSetup();
			fireEvent.click(removeButton[0]);
			expect(removeTask).toHaveBeenCalledWith(0);
		});

		test('should not call editTask when user clicks on edition icon', () => {
			const { editButton } = initialListSetup();
			fireEvent.click(editButton[0]);
			expect(editTask).not.toHaveBeenCalled();
		});

		test('should call editTask when user saves edited item through click', () => {
			const { editButton } = initialListSetup();
			fireEvent.click(editButton[0]);
			fireEvent.click(editButton[0]);
			expect(editTask).toHaveBeenCalled();
		});

		test('should call editTask when user saves edited item through enter key', () => {
			const { editButton } = initialListSetup();
			fireEvent.click(editButton[0]);
			const editInput = screen.getByTestId('task-list-item-input');
			fireEvent.keyDown(editInput, { key: 'Enter', code: 'Enter', charCode: 13 });
			expect(editTask).toHaveBeenCalled();
		});
	});

	describe('handle view on edition and save', () => {
		test('should display edition input with its value when edit is clicked', () => {
			const { editButton } = initialListSetup();
			fireEvent.click(editButton[0]);
			const editInput = screen.getByTestId('task-list-item-input');
			expect(editInput).toBeInTheDocument();
			expect(editInput.getAttribute('value')).toBe(MOCK_LIST[0].description);
		});

		test('should change edition input value when user edits and writes', () => {
			const { editButton } = initialListSetup();
			fireEvent.click(editButton[0]);
			const editInput = screen.getByTestId('task-list-item-input');
			fireEvent.change(editInput, { target: { value: EDITED_VALUE } });
			expect(editInput.getAttribute('value')).toBe(EDITED_VALUE);
		});

		test('should hide edition input when saving', () => {
			const { editButton } = initialListSetup();
			fireEvent.click(editButton[0]);
			const editInput = screen.getByTestId('task-list-item-input');
			fireEvent.click(editButton[0]);
			expect(editInput).not.toBeInTheDocument();
		});

		test('should change icon class when changing between edition and save', () => {
			const { editButton } = initialListSetup();
			expect(editButton[0]).toHaveClass('edit');
			fireEvent.click(editButton[0]);
			expect(editButton[0]).toHaveClass('save');
		});
	});
});
