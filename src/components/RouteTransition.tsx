
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteTransitionProps {
  children: React.ReactNode;
}

const RouteTransition = ({ children }: RouteTransitionProps) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setIsVisible(false);
      
      const timer = setTimeout(() => {
        setCurrentPath(location.pathname);
        setIsVisible(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentPath]);

  return (
    <div className={`route-transition ${isVisible ? 'visible' : 'hidden'}`}>
      {children}
    </div>
  );
};

export default RouteTransition;
