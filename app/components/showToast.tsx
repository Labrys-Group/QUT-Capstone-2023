import { useToast } from "@chakra-ui/react";

const Toast = (
  title: string,
  description: string,
  status: "info" | "success" | "error" | "loading"
) => {
  const showToast = () => {
    const toast = useToast();
    return toast({
      title,
      description,
      status,
      duration: 9000,
      isClosable: true,
    });
  };
  return showToast;
};

export default Toast;
