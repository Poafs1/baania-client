import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputForm from '../../forms/inputForm';
import Button from '../../buttons/ button';
import { isFormValid } from '../../../utils/form';
import { useStore } from '../../../hooks/store';

interface IConnectAPI {
  url: string;
  port: string;
}

const Navbar = () => {
  const { dispatch } = useStore();
  const formik = useFormik({
    initialValues: {
      url: '',
      port: '',
    },
    validationSchema: Yup.object({
      url: Yup.string().required('Required'),
      port: Yup.number(),
    }),
    onSubmit: (values: IConnectAPI) => {
      handleConnectAPI(values);
    },
  });

  const handleConnectAPI = (values: IConnectAPI) => {
    // Invalid form
    if (!isFormValid(formik)) {
      return;
    }

    const { url, port } = values;

    dispatch({
      type: 'SET_API_ENDPOINT',
      payload: port ? `${url}:${port}` : url,
    });
  };

  return (
    <nav className='pb-6 pt-16 bg-[#F4F7FC]'>
      <section className='max-w-5xl m-auto px-4'>
        <form className='flex items-end space-x-16' onSubmit={formik.handleSubmit} id='api-endpoint'>
          <span className='flex-grow'>
            <InputForm formik={formik} label='URL' name='url' placeholder='http://localhost' />
          </span>
          <span className='flex-grow'>
            <InputForm formik={formik} type='number' label='PORT' name='port' placeholder='8000' />
          </span>
          <Button type='submit' label='CONNECT' appearance='secondary' form='api-endpoint' />
        </form>
      </section>
    </nav>
  );
};

export default Navbar;
