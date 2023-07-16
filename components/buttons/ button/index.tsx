import classNames from 'classnames';
import { FormikProps } from 'formik';
import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  label?: string;
  link?: string;
  buttonWidth?: 'full' | 'auto';
  appearance?: 'primary' | 'secondary' | 'tertiary' | 'update';
}

const Button = (props: IButtonProps) => {
  const { leadingIcon, trailingIcon, label, onClick, link, disabled, buttonWidth, type, form, appearance } = props;

  const renderAppearance = () => {
    if (appearance === 'primary') return 'bg-[#22BB66] border-[#22BB66] text-white';

    if (appearance === 'secondary') return 'bg-[#3C64B1] border-[#3C64B1] text-white';

    if (appearance === 'tertiary') return 'bg-white border-[#C0C5CE] text-[#7C7E82]';

    if (appearance === 'update') return 'bg-[#F6A623] border-[#F6A623] text-white';
  };

  const renderButton = () => {
    return (
      <div
        className={classNames(
          'flex items-center justify-center space-x-2 rounded p-3.5 text-sm min-w-[200px] border',
          renderAppearance(),
        )}>
        {leadingIcon && <span>{leadingIcon}</span>}
        {label && <span className='flew-grow'>{label}</span>}
        {trailingIcon && <span>{trailingIcon}</span>}
      </div>
    );
  };

  if (link) {
    return (
      <Link href={link} className='block'>
        {renderButton()}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
      className={classNames(buttonWidth ? `w-${buttonWidth}` : 'w-full')}>
      {renderButton()}
    </button>
  );
};

Button.defaultProps = {
  appearance: 'primary',
  buttonWidth: 'auto',
  type: 'button',
};

export const handleDisabledButton = (formik: FormikProps<any>) => !(formik.dirty && formik.isValid);

export default Button;
