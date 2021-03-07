import React from 'react';

const useIsMount = (): boolean => {
  const isMountRef = React.useRef<boolean>(true);
  React.useEffect((): void => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export default useIsMount;
