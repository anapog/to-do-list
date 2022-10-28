import { CheckboxProps } from '../../interfaces/task.interface';
import './checkbox.scss';

const Checkbox = ({ id, label, value, onChange }: CheckboxProps) => {
	const handleChange = (): void => {
		onChange(id);
	};

	return (
		<label className={`checkbox-description ${value ? 'checked' : ''}`} data-testid="checkbox">
			<input
				type="checkbox"
				checked={value}
				onChange={handleChange}
				data-testid="checkbox-input"
			/>
			{label}
		</label>
	);
};

export default Checkbox;
