import { useEffect, useRef } from "react";

const useNavBarController = () => {
  const navBarRef = useRef<HTMLDivElement>(null);
  const navBarSlideAreaRef = useRef<HTMLDivElement>(null);
  const contentPageSlideRef = useRef<HTMLDivElement>(null);
  const handleDocumentClick = (event: MouseEvent) => {
    if (
      navBarRef.current &&
      navBarSlideAreaRef.current &&
      contentPageSlideRef &&
      !navBarSlideAreaRef.current.contains(event.target as Node) 
    ) {
      closeNavBar();
    }
  };

  const closeNavBar = () => {
    if (navBarRef.current && navBarSlideAreaRef.current && contentPageSlideRef.current) {
      navBarRef.current.classList.add("hidden");
      navBarRef.current.classList.remove("visible");
      navBarSlideAreaRef.current.classList.add("hidden");
      navBarSlideAreaRef.current.classList.remove("visible");
      contentPageSlideRef.current.classList.add("upContentPage");
      contentPageSlideRef.current.classList.remove("downContentPage");
    }
  }

  useEffect(() => {
    const handleNavBarSlideAreaClick = () => {
      if (navBarRef.current && navBarSlideAreaRef.current && contentPageSlideRef.current) {
        navBarRef.current.classList.remove("hidden");
        navBarRef.current.classList.add("visible");
        navBarSlideAreaRef.current.classList.remove("hidden");
        navBarSlideAreaRef.current.classList.add("visible");
        contentPageSlideRef.current.classList.add("downContentPage");
        contentPageSlideRef.current.classList.remove("upContentPage")
      }
    };

    if (navBarSlideAreaRef.current) {
      navBarSlideAreaRef.current.addEventListener("click", handleNavBarSlideAreaClick);
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      if (navBarSlideAreaRef.current) {
        navBarSlideAreaRef.current.removeEventListener("click", handleNavBarSlideAreaClick);
      }
  
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return { navBarRef, navBarSlideAreaRef, contentPageSlideRef };
};

export default useNavBarController;
