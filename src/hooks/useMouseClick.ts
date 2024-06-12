import React from 'react';
const useMouseClick = (delay: number = 500) => {
  const [
    mouseDown,
    setMouseDown
  ] = React.useState(false);
  const ref = React.useRef<NodeJS.Timeout>();
  const handleMouseDown = () => {
    if (!ref.current) {
      setMouseDown(true);
      ref.current = setTimeout(() => {
        setMouseDown(false);
        ref.current = undefined;
      }, delay);
    }
  }

  React.useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  return mouseDown;
};
export default useMouseClick;
