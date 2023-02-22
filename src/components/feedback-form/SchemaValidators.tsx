import * as Yup from 'yup';


export const validateRating = (value: number): string => {
  let error;
  if (!value || value === 0) {
    error = 'Please select a rating';
  }
  return error;
};

export const validateEmail = (value: string): string => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .min(2, 'Must be 2 characters or more')
    .required('Required'),
  comment: Yup.string()
    .max(800, 'Must be 800 characters or less')
    .min(4, 'Must be 4 characters or more')
    .required('Required'),
});
