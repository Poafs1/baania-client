import classNames from 'classnames';

export interface ITextareaProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
}

const Textarea = (props: ITextareaProps) => {
  const { label, onChange, defaultValue } = props;

  return (
    <div className='relative border border-[#E0E0E0] overflow-hidden rounded'>
      <div className='absolute z-10 top-0 right-0 left-0 bg-white'>
        <p className='text-xs text-[#8D9196] px-3.5 pt-3.5 pb-1'>{label}</p>
      </div>
      <textarea
        onChange={onChange}
        defaultValue={defaultValue}
        className={classNames('block w-full resize-none p-3.5 border-none focus:outline-none focus:ring-0', 'pt-10')}
      />
    </div>
  );
};

export default Textarea;
