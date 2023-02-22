import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../AppStateContext';
import { SignupSchema } from './SchemaValidators';

import { Skeleton } from './Skeleton';
import { HeaderText } from '../shared/HeaderText';
import { RatingField, EmailField, TextInput, Comments } from './CustomFields';

const FeedbackForm = () => {
  const navigate = useNavigate();
  const state = useAppState();
  const dispatch = useAppDispatch();
  return (
    <div>
      {state.loading ? (
        <Skeleton />
      ) : (
        <div className="max-w-screen-md p-5 mx-auto">
          <HeaderText title="Feedback Form" />
          <Formik
            initialValues={{
              firstName: '',
              comment: '',
              email: '',
              rating: 0,
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              dispatch({ type: 'update-users', payload: { user: values } });
              navigate('/feedbackresults');
            }}
          >
            {({ errors, touched }) => (
              <Form className="w-full">
                <div className="flex flex-wrap mb-6 -mx-3">
                  <div className="w-full px-3 mb-6 md:mb-0 md:w-1/2">
                    <TextInput
                      label="Name"
                      name="firstName"
                      type="text"
                      placeholder="Name"
                      data-testid="name"
                    />
                    <EmailField errors={errors} touched={touched} />
                    <RatingField />
                  </div>
                  <div className="flex flex-col w-full px-3 md:w-1/2">
                    <Comments
                      label="Comment"
                      name="comment"
                      type="text"
                      placeholder="Comment"
                      data-testid="comment"
                    />
                    <button data-testid="submitForm" className="mt-5 font-bold text-white bg-indigo-600 rounded shadow -2 mtpx-6 focus:shadow-outline hover:bg-indigo-400 focus:outline-none lg:self-end">
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
