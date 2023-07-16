import classNames from 'classnames';
import { FormikProps } from 'formik';

type InputType = 'text' | 'email' | 'password' | 'number' | 'date' | 'time';

export interface IInputFormProps {
  formik: FormikProps<any>;
  label?: string;
  name: string;
  type: InputType;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  disabledErrorMessage?: boolean;
  isInsideBoxLabel?: boolean;
}

const InputForm = (props: IInputFormProps) => {
  const { label, name, formik, type, placeholder, disabled, maxLength, isInsideBoxLabel } = props;

  return (
    <div className='relative'>
      {isInsideBoxLabel && (
        <div className='absolute z-10 top-3.5 left-3.5'>
          <p className='text-xs text-[#8D9196]'>{label}</p>
        </div>
      )}
      {label && !isInsideBoxLabel && (
        <label htmlFor={name} className='flex justify-between font-medium'>
          {label}
        </label>
      )}
      <div
        className={classNames(
          'relative flex items-center overflow-hidden rounded bg-white border border-[#8D9196]',
          label ? 'mt-1' : '',
          isInsideBoxLabel ? 'border-[#E0E0E0]' : '',
        )}>
        <input
          type={type}
          id={name}
          className={classNames(
            'placeholder:text-[#8D9196] text-base leading-5 block w-full border-0 p-3.5 focus:outline-none focus:ring-0',
            isInsideBoxLabel ? 'pt-8' : '',
          )}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          {...{
            ...formik.getFieldProps(name),
            value: formik.values[name] || '',
          }}
        />
      </div>
    </div>
  );
};

InputForm.defaultProps = {
  type: 'text',
};

export default InputForm;
