import React from 'react';

export default useIsMounted = () => {
  const isMounted = React.useRef(true);

  React.useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  return isMounted;
};
