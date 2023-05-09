// for transition effect
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { SlideFade } from "@chakra-ui/react";

interface SlideTransitionWrapperProps {
  children: ReactNode;
}

const SlideTransitionWrapper: React.FC<SlideTransitionWrapperProps> = ({
  children,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <SlideFade in={isOpen} offsetY="20px">
      {children}
    </SlideFade>
  );
};

export default SlideTransitionWrapper;
