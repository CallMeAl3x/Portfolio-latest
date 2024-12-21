import { useState, useEffect } from "react";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768); // You can adjust the 768px breakpoint as needed
  };

  useEffect(() => {
    checkIsMobile(); // Initial check
    window.addEventListener("resize", checkIsMobile); // Listen for window resize

    return () => {
      window.removeEventListener("resize", checkIsMobile); // Clean up the listener on component unmount
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
