import { CheckboxProps } from '../../interfaces/task.interface';
import './checkbox.scss';

const Checkbox = ({ id, label, value, onChange }: CheckboxProps) => {
	const handleChange = (): void => {
		onChange(id);
	};

	return (
		<label className={`checkbox-description ${value ? 'checked' : ''}`}>
			<input type="checkbox" checked={value} onChange={handleChange} />
			{label}
		</label>
	);
};

export default Checkbox;
