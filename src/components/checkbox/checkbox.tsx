import { CheckboxProps } from '../../interfaces/task.interface';
import './checkbox.scss';

const Checkbox = ({ id, label, value, onChange, onEdit }: CheckboxProps): JSX.Element => {
	const handleChange = (): void => {
		onChange(id);
	};

	const handleClick = (): void => {
		onEdit(id, label)();
	};

	return (
		<div className="checkbox-description">
			<input type="checkbox" checked={value} onChange={handleChange} />
			<label className={`label ${value ? 'checked' : ''}`} onClick={handleClick}>
				{label}
			</label>
		</div>
	);
};

export default Checkbox;
