import { XCircleFill } from 'react-bootstrap-icons';
import Button from '../../../buttons/ button';

export interface ICreateHouseFailureProps {
  onSubmit: () => void;
}

const CreateHouseFailure = (props: ICreateHouseFailureProps) => {
  const { onSubmit } = props;

  return (
    <div className='flex flex-col items-center space-y-5 w-[330px]'>
      <div className='flex flex-col items-center space-y-2.5'>
        {/* Icon */}
        <XCircleFill width={75} height={75} className='text-[#B93E5C]' />
        {/* Title */}
        <div className='text-center text-[#8D9196]'>
          <h6 className='text-2xl font-bold'>Fail</h6>
          <p>Let’s try one more again</p>
        </div>
      </div>
      {/* CTA */}
      <Button label='TRY AGAIN' onClick={onSubmit} appearance='tertiary' />
    </div>
  );
};

export default CreateHouseFailure;
