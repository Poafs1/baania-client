import { FormikProps } from 'formik';

export const isFormValid = (formik: FormikProps<any>) => formik.dirty && formik.isValid;
