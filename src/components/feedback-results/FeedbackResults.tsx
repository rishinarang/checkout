import React from 'react';
import { useNavigate } from 'react-router-dom';
import LineChart from '../line-chart/LineChart';
import { useAppState } from '../AppStateContext';
import Button from '../shared/Button';
import { Comments } from '../feedback-form/Comments';
import { Skeleton } from './Skeleton';
import { HeaderText } from '../shared/HeaderText';

function getChartData(arr) {
  return arr.map((item) => {
    return {
      y: item.rating.toString(),
    };
  });
}

export default function FeedbackResults() {
  const navigate = useNavigate();
  const state = useAppState();
  const { users } = state;
  const usersReverse = [...users].reverse();
  const chartArr = getChartData(users);
  return (
    <div className='mt-5'>
      <HeaderText title="Feedback Results" />
      <div className="flex flex-col">
        <Button
          onClick={() => {
            navigate('/');
          }}
          className="self-end mt-5 font-bold text-white bg-indigo-600 rounded shadow -2 mtpx-6 focus:shadow-outline hover:bg-indigo-400 focus:outline-none"
        >
          Go Back
        </Button>
        <div className="mt-10 mb-10">
          <LineChart data={chartArr} />
        </div>
        <div className="mb-5 font-extrabold leading-normal tracking-tight text-gray-900 mb-text-3xl sm:text-2xl">
          Latest Comments
        </div>
        {state.loading ? (
          <Skeleton />
        ) : (
          <Comments usersReverse={usersReverse} />
        )}
      </div>
    </div>
  );
}
