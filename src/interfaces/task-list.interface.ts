import { Task } from "./task.interface";

export interface TaskListProps {
	list: Task[];
	removeTask: (id: number) => void;
	editTask: (id: number, newValue: string) => void;
}
