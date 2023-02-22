import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import FeedbackForm from './feedback-form/FeedbackForm';
import { Loader } from './shared/Loader';
import { ErrorFallback } from './shared/ErrorFallback';
import { AppProvider } from './AppProvider';

const FeedbackResults = lazy(
  () => import('./feedback-results/FeedbackResults'),
);

const Application = () => {
  return (
    <div className="max-w-screen-md p-5 mx-auto rounded-lg shadow lg:mt-10 md:w-3/4">
      <AppProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<FeedbackForm />} />
                <Route path="/feedbackresults" element={<FeedbackResults />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </ErrorBoundary>
      </AppProvider>
    </div>
  );
};

export default Application;
