import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { CaretDownFill } from 'react-bootstrap-icons';

export interface ISelectOption {
  value: string;
  label: string;
}

export interface ISelectFormProps {
  label?: string;
  name: string;
  onChange: (selected: ISelectOption) => void;
  options: ISelectOption[];
  defaultValue?: ISelectOption | null;
  placeholder?: string;
}

const SelectForm: FC<ISelectFormProps> = (props) => {
  const { name, onChange, options, defaultValue, placeholder } = props;
  const [selected, setSelected] = useState<ISelectOption | null>(null);

  useEffect(() => {
    if (selected) return;
    setSelected(defaultValue || null);
  }, [defaultValue]);

  const handleOnChange = (selected: ISelectOption) => {
    if (selected === null) return;
    setSelected(selected);
    onChange(selected);
  };

  return (
    <Listbox value={selected} onChange={handleOnChange}>
      {({ open }) => (
        <>
          <div className='relative'>
            <Listbox.Button className='relative bg-white w-full cursor-default rounded border border-[#0F6FDE] py-3.5 pl-3.5 pr-10 text-left focus:outline-none'>
              <span className={classNames(selected ? '' : 'text-[#8D9196] font-medium')}>
                {selected ? selected.label : placeholder}
              </span>
              <span className='text-[#9B9EA3] pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6'>
                <CaretDownFill width={12} height={12} />
              </span>
            </Listbox.Button>

            {options?.length > 0 && (
              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white py-1 focus:outline-none'>
                  {options.map((option: ISelectOption, index: number) => (
                    <Listbox.Option
                      key={name + '-select-form-' + index}
                      className={({ active }) =>
                        classNames(active ? 'bg-slate-100' : '', 'relative cursor-default select-none py-3 pl-3 pr-9')
                      }
                      value={option}>
                      {({ selected }) => (
                        <>
                          <span className='block truncate'>{option.label}</span>

                          {selected ? (
                            <span className='absolute inset-y-0 right-0 flex items-center pr-4'>
                              <CheckIcon width={20} height={20} aria-hidden='true' />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            )}
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectForm;
