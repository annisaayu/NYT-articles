import PropTypes from 'prop-types';
import React from 'react';

const GreyMessage = ({ message }) => (
  <p className="text-center mt-4 text-darkGrey">
    {message}
  </p>
)

const StatusMessage = ({ isLoading, error, emptyArticles }) => {
  if (emptyArticles && !error && !isLoading) {
    return (
      <GreyMessage message={"No articles found. Please try another keyword."}/>
    );
  }

  if (isLoading) {
    return <GreyMessage message={"Loading..."}/>
  }

  return null;
};

StatusMessage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  emptyArticles: PropTypes.bool.isRequired,
};

StatusMessage.defaultProps = {
  error: false,
};

export default StatusMessage;
