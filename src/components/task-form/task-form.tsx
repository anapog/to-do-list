import { FormEvent, useState } from 'react';
import { TaskFormProps } from '../../interfaces/task.interface';
import './task-form.scss';

const TaskForm = ({ addTask }: TaskFormProps): JSX.Element => {
	const [description, setDescription] = useState('');

	const handleSubmit = (event: FormEvent) => {
		addTask(description);
		setDescription('');
		event.preventDefault();
	};

	return (
		<form className="task-form" onSubmit={handleSubmit}>
			<input
				type="text"
				className="form-input"
				value={description}
				placeholder="New task..."
				onChange={e => setDescription(e.target.value)}
			/>
			<button className="form-button" type="submit" disabled={!description}>
				Add
			</button>
		</form>
	);
};

export default TaskForm;
