import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSpinner = () => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress && <CircularProgress />;
};

export default LoadingSpinner;
