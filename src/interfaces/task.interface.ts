export interface Task {
	description: string;
	id: number;
}

export interface TaskListProps {
	list: Task[];
	removeTask: (id: number) => void;
	editTask: (id: number, newValue: string) => void;
}

export interface TaskFormProps {
	addTask: (description: string) => void;
}

export interface CheckboxProps {
	id: number;
	label: string;
	value: boolean;
	onChange: (id: number) => void;
	onEdit: (id: number, description: string) => () => void;
}
