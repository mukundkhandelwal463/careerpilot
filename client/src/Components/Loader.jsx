import React from 'react';
import LoadingOverlay from './LoadingOverlay.jsx';

const Loader = ({ title = 'Loading CareerPilot', subtitle = 'Preparing your workspace...', variant = 'default' }) => {
  return (
    <LoadingOverlay
      isOpen={true}
      title={title}
      subtitle={subtitle}
      variant={variant}
    />
  );
};

export default Loader;
