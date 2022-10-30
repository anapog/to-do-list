import { FormEvent, useState } from 'react';
import { TaskFormProps } from '../../interfaces/task-form.interface';
import './task-form.scss';

const TaskForm = ({ addTask }: TaskFormProps): JSX.Element => {
	const [description, setDescription] = useState('');

	const handleSubmit = (event: FormEvent) => {
		addTask(description);
		setDescription('');
		event.preventDefault();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setDescription(event.target.value);

	return (
		<form className="task-form" onSubmit={handleSubmit} data-testid="task-form">
			<input
				type="text"
				className="form-input"
				value={description}
				placeholder="New task..."
				onChange={handleChange}
				data-testid="task-form-input"
			/>
			<button
				className="form-button"
				type="submit"
				disabled={!description}
				data-testid="task-form-button"
			>
				Add
			</button>
		</form>
	);
};

export default TaskForm;
