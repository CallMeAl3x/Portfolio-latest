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

const useIsTablet = (): boolean => {
  const [isTablet, setIsTablet] = useState<boolean>(false);

  const checkIsTablet = () => {
    setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024); // Adjust the breakpoints as needed
  };

  useEffect(() => {
    checkIsTablet(); // Initial check
    window.addEventListener("resize", checkIsTablet); // Listen for window resize

    return () => {
      window.removeEventListener("resize", checkIsTablet); // Clean up the listener on component unmount
    };
  }, []);

  return isTablet;
};

const useIsLaptop = (): boolean => {
  const [isLaptop, setIsLaptop] = useState<boolean>(false);

  const checkIsLaptop = () => {
    setIsLaptop(window.innerWidth > 1024); // Adjust the breakpoints as needed
  };

  useEffect(() => {
    checkIsLaptop(); // Initial check
    window.addEventListener("resize", checkIsLaptop); // Listen for window resize

    return () => {
      window.removeEventListener("resize", checkIsLaptop); // Clean up the listener on component unmount
    };
  }, []);

  return isLaptop;
};

export { useIsMobile, useIsLaptop, useIsTablet };

export default useIsMobile;
