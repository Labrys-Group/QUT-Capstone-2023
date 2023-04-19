import { useToast } from "@chakra-ui/react";

export const showToast = (
  title: string,
  description: string,
  status: "info" | "success" | "error" | "loading"
) => {
  const toast = useToast();
  return toast({
    title,
    description,
    status,
    duration: 9000,
    isClosable: true,
  });
};
