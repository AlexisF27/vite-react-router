import { useEffect, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowsize] = ({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowsize({width : window.innerWidth, height: window.innerHeight})
    }
    handleResize();
    window.addEventListener('resize', handleResize  )
  },[])

}

export default useWindowSize