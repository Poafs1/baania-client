import { CheckCircleIcon } from '@heroicons/react/20/solid';
import Button from '../../../buttons/ button';

export interface ICreateHouseSuccessProps {
  onSubmit: () => void;
}

const CreateHouseSuccess = (props: ICreateHouseSuccessProps) => {
  const { onSubmit } = props;

  return (
    <div className='flex flex-col items-center space-y-5 w-[330px]'>
      <div className='flex flex-col items-center space-y-2.5'>
        {/* Icon */}
        <CheckCircleIcon width={75} height={75} className='text-[#22BB66]' />
        {/* Title */}
        <div className='text-center text-[#8D9196]'>
          <h6 className='text-2xl font-bold'>Success</h6>
          <p>Create a Successful!</p>
        </div>
      </div>
      {/* CTA */}
      <Button label='CONTINUE' onClick={onSubmit} appearance='tertiary' />
    </div>
  );
};

export default CreateHouseSuccess;
