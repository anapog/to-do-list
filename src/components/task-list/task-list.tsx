import { TaskListProps } from '../../interfaces/task.interface';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './task-list.scss';

const TaskList = ({ list, removeTask, editTask }: TaskListProps): JSX.Element => {
	const handleEdit = (id: number) => (): void => {
		editTask(id);
	};

	const handleRemove = (id: number) => (): void => {
		removeTask(id);
	};

	return (
		<ul className="task-list">
			{list?.length ? (
				list.map(({ description, id }) => (
					<li className="task-container" key={id}>
						<p className='description'>{description}</p>
						<div className="actions">
							<div className='edit' onClick={handleEdit(id)}>
								<FaEdit />
							</div>
							<div className='remove' onClick={handleRemove(id)}>
								<FaTrashAlt />
							</div>
						</div>
					</li>
				))
			) : (
				<p>Sorry, there are no items to be displayed</p>
			)}
		</ul>
	);
};

export default TaskList;
