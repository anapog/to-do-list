import { useState } from 'react';
import TaskForm from '../../components/task-form/task-form';
import TaskList from '../../components/task-list/task-list';
import './to-do-list.scss';

// TODO component testing

const ToDoList = (): JSX.Element => {
	const [list, setList] = useState([
		{ description: 'description', id: 0 },
		{ description: 'second description', id: 1 },
	]);

	const addTask = (description: string) => {
		setList([...list, { description, id: list.length }]);
	};

	const handleEdit = (targetId: number, newValue: string) => {
		const updatedList = list.map(item => (item.id !== targetId ? item : { ...item, description: newValue }));
		setList(updatedList);
	};

	const removeTask = (id: number) => {
		setList(list.filter(item => item.id !== id));
	};

	return (
		<div className="to-do-list">
			<TaskForm addTask={addTask} />
			<TaskList list={list} editTask={handleEdit} removeTask={removeTask} />
		</div>
	);
};

export default ToDoList;
