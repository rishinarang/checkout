import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import StarRating from '../star-rating/StarRating';
import { validateEmail, validateRating } from './SchemaValidators';

export const EmailField = ({ errors, touched }) => {
  return (
    <>
      <Field name="email" id="email" validate={validateEmail}>
        {({ field }) => (
          <div className="mt-5">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              type="text"
              placeholder="Email"
              className={`${
                errors.email && touched.email ? 'text-input error' : ''
              } mb-1 block w-full appearance-none rounded border bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none`}
              {...field}
            />
          </div>
        )}
      </Field>
      <ErrorMessage
        name="email"
        component="small"
        data-testid="emailError"
        className="text-xs italic text-red-500"
      />
    </>
  );
};
export const RatingField = () => {
  return (
    <>
      <Field name="rating" id="rating" type="number"  validate={validateRating}>
        {({ form: { setFieldValue } }) => {
          const updateRating = (rating) => {
            setFieldValue('rating', rating);
          };
          return (
            <div>
              <label
                htmlFor="rating"
                className="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              >
                Rating
              </label>
              <StarRating updateRating={updateRating} />
            </div>
          );
        }}
      </Field>
      <ErrorMessage
        name="rating"
        component="small"
        data-testid="ratingError"
        className="text-xs italic text-red-500"
      />
    </>
  );
};

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props as unknown as string);
  return (
    <div className="mt-5">
      <label
        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={`${
          meta.error && meta.touched ? 'text-input error' : ''
        } focus:bg-white" mb-1 block w-full appearance-none rounded border bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div data-testid="nameError" className="text-xs italic text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
export const Comments = ({ label, ...props }) => {
  const [field, meta] = useField(props as unknown as string);
  return (
    <div className="mt-5">
      <label
        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <textarea
        rows={10}
        className={`${
          meta.error && meta.touched ? 'text-input error' : ''
        } focus:border-gray-500" mb-1 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div data-testid="commentError" className="text-xs italic text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
