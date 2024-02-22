import { useEffect, useMemo, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowsize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowsize({width : window.innerWidth, height: window.innerHeight})
    }
    handleResize();
    window.addEventListener('resize', handleResize)

    return () => {window.removeEventListener("resize", handleResize)};
    

  },[])

  return useMemo(() => windowSize, [windowSize]);

}

export default useWindowSize