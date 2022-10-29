import { useState } from 'react';
import TaskForm from '../../components/task-form/task-form';
import TaskList from '../../components/task-list/task-list';
import { Task } from '../../interfaces/task.interface';
import './to-do-list.scss';

const ToDoList = (): JSX.Element => {
	const [list, setList] = useState<Task[]>([]);

	const addTask = (description: string): void => {
		setList([...list, { description, id: list.length }]);
	};

	const handleEdit = (targetId: number, newValue: string): void => {
		setList(
			list.map(item => (item.id !== targetId ? item : { ...item, description: newValue }))
		);
	};

	const removeTask = (id: number): void => {
		setList(list.filter(item => item.id !== id));
	};

	return (
		<div className="to-do-list" data-testid="to-do-list">
			<TaskForm addTask={addTask} />
			<TaskList list={list} editTask={handleEdit} removeTask={removeTask} />
		</div>
	);
};

export default ToDoList;
