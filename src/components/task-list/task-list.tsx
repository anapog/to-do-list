import React, { useState } from 'react';
import { TaskListProps } from '../../interfaces/task-list.interface';
import { Task } from '../../interfaces/task.interface';
import { FaEdit, FaTrashAlt, FaRegSave } from 'react-icons/fa';
import Checkbox from '../checkbox/checkbox';
import './task-list.scss';

const TaskList = ({ list, removeTask, editTask }: TaskListProps): JSX.Element => {
	const [editedItem, setEditedItem] = useState<number>();
	const [selectedItem, setSelectedItem] = useState<number[]>([]);
	const [newValue, setNewValue] = useState<string>('');

	const handleEdit = (id: number, description: string) => (): void => {
		setNewValue(description);
		const isSaving = editedItem === id;
		setEditedItem(isSaving ? -1 : id);
		isSaving && editTask(id, newValue);
	};

	const handleKeyDown =
		(id: number, description: string) =>
		(event: React.KeyboardEvent): void => {
			if (event.key === 'Enter') {
				handleEdit(id, description)();
			}
		};

	const handleRemove = (id: number) => (): void => removeTask(id);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
		setNewValue(event.target.value);

	const isEditing = (id: number): boolean => id === editedItem;

	const onCheckboxValueChange = (id: number): void => {
		const updatedList = isSelected(id)
			? selectedItem.filter(item => item !== id)
			: [...selectedItem, id];
		setSelectedItem(updatedList);
	};

	const isSelected = (id: number): boolean => selectedItem.some(item => item === id);

	const selectedToBottom = (a: Task, b: Task): number => {
		const isASelected = isSelected(a.id);
		const isBSelected = isSelected(b.id);
		return isBSelected ? -1 : isASelected ? 1 : 0;
	};

	return (
		<ul className="task-list" data-testid="task-list">
			{list?.length ? (
				list.sort(selectedToBottom).map(({ description, id }) => (
					<li className="task-container" key={id} data-testid="task-list-item">
						{isEditing(id) ? (
							<input
								type="text"
								className="description"
								value={newValue}
								autoFocus
								onChange={handleInputChange}
								onKeyDown={handleKeyDown(id, description)}
								data-testid="task-list-item-input"
							/>
						) : (
							<Checkbox
								id={id}
								label={description}
								value={isSelected(id)}
								onChange={onCheckboxValueChange}
							></Checkbox>
						)}
						<div className="actions" data-testid="task-list-actions">
							<div
								className={`${isEditing(id) ? 'save' : 'edit'}`}
								onClick={handleEdit(id, description)}
								data-testid="actions-edit-save"
							>
								{isEditing(id) ? <FaRegSave /> : <FaEdit />}
							</div>
							<div
								className="remove"
								onClick={handleRemove(id)}
								data-testid="actions-remove"
							>
								<FaTrashAlt />
							</div>
						</div>
					</li>
				))
			) : (
				<p data-testid="task-list-empty">Sorry, there are no items to be displayed</p>
			)}
		</ul>
	);
};

export default TaskList;
