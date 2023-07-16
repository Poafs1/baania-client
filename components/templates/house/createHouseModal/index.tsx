import { useFormik } from 'formik';
import Button from '../../../buttons/ button';
import InputForm from '../../../forms/inputForm';
import * as Yup from 'yup';
import Textarea from '../../../forms/textarea';
import { IHouse, IHouseCreate } from '../../../../interfaces/house';
import axios from 'axios';
import { useStore } from '../../../../hooks/store';
import { isFormValid } from '../../../../utils/form';
import { useEffect, useState } from 'react';
import CreateHouseSuccess from '../createHouseSuccess';
import CreateHouseFailure from '../createHouseFailure';

export interface ICreateHouseModalProps {
  onCancel: () => void;
  onSubmitSuccess: () => void;
  house?: IHouse;
}

const CreateHouseModal = (props: ICreateHouseModalProps) => {
  const { onCancel, onSubmitSuccess, house } = props;
  const { state } = useStore();
  const { apiEndpoint } = state;

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);

  const clearAlert = () => {
    setShowSuccessAlert(false);
    setShowFailureAlert(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      postCode: '',
      price: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      postCode: Yup.string().required('Required'),
      price: Yup.number().required('Required'),
      description: Yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: (values: IHouseCreate) => {
      !house ? handleCreateHouse(values) : handleUpdateHouse(values);
    },
  });

  const handleCreateHouse = async (values: IHouseCreate) => {
    if (!apiEndpoint) return;

    if (!isFormValid(formik)) {
      return;
    }

    const res = await axios
      .post(`${apiEndpoint}/home`, {
        name: values.name,
        post_code: values.postCode,
        price: values.price,
        desc: values.description,
      })
      .catch(() => {
        setShowFailureAlert(true);
      });

    if (!res) return;

    // Mutate parent page data
    onSubmitSuccess();

    setShowSuccessAlert(true);
  };

  const handleUpdateHouse = async (values: IHouseCreate) => {
    if (!apiEndpoint) return;

    if (!house) return;

    if (!isFormValid(formik)) {
      return;
    }

    const res = await axios
      .patch(`${apiEndpoint}/home/${house?.id}`, {
        name: values.name,
        post_code: values.postCode,
        price: values.price,
        desc: values.description,
      })
      .catch(() => {
        setShowFailureAlert(true);
      });

    if (!res) return;

    // Mutate parent page data
    onSubmitSuccess();

    setShowSuccessAlert(true);
  };

  useEffect(() => {
    if (!house) return;

    formik.setFieldValue('name', house.name);
    formik.setFieldValue('postCode', house.post_code);
    formik.setFieldValue('price', house.price);
  }, [house]);

  if (showSuccessAlert) {
    return (
      <CreateHouseSuccess
        onSubmit={() => {
          clearAlert();
          onCancel();
        }}
      />
    );
  }

  if (showFailureAlert) {
    return (
      <CreateHouseFailure
        onSubmit={() => {
          clearAlert();
        }}
      />
    );
  }

  return (
    <div className='space-y-2.5'>
      {/* Title */}
      <h5 className='text-lg font-medium'>Create</h5>
      {/* Form */}
      <form className='space-y-2.5' onSubmit={formik.handleSubmit} id='create-house'>
        <div className='items-center space-x-2.5 grid grid-cols-4'>
          <div className='col-span-2'>
            <InputForm formik={formik} label='Name' name='name' isInsideBoxLabel />
          </div>
          <InputForm formik={formik} label='Post Code' name='postCode' isInsideBoxLabel />
          <InputForm formik={formik} label='Price' name='price' type='number' isInsideBoxLabel />
        </div>
        <Textarea label='Description' onChange={(e) => formik.setFieldValue('description', e.target.value)} />
      </form>
      {/* CTA */}
      <div className='space-x-2.5 flex justify-center'>
        <Button label='Cancel' appearance='tertiary' onClick={onCancel} />
        {!house ? (
          <Button type='submit' label='Create' form='create-house' />
        ) : (
          <Button type='submit' label='Update' form='create-house' appearance='update' />
        )}
      </div>
    </div>
  );
};

export default CreateHouseModal;
