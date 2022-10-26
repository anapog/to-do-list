export interface Task {
	description: string;
	id: number;
}

export interface TaskListProps {
	list: Task[];
	removeTask: (id: number) => void;
	editTask: (id: number) => void;
}

export interface TaskFormProps {
	addTask: (description: string) => void;
}
