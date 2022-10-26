import { useState } from 'react';
import TaskForm from '../../components/task-form/task-form';
import TaskList from '../../components/task-list/task-list';
import './to-do-list.scss';

// TODO save/recover list to preserve?
// TODO edit item
// TODO styles
// TODO component testing

const ToDoList = (): JSX.Element => {
	const [list, setList] = useState([
		{ description: 'description', id: 0 },
		{ description: 'second description', id: 1 },
	]);

	const addTask = (description: string) => {
		setList([...list, { description, id: list.length }]);
	};

	const removeTask = (id: number) => {
		setList(list.filter(item => item.id !== id));
	};

	return (
		<div className='to-do-list'>
			<TaskForm addTask={addTask} />
			<TaskList
				list={list}
				editTask={(id: number) => console.log('*** editing description')}
				removeTask={removeTask}
			/>
		</div>
	);
};

export default ToDoList;
