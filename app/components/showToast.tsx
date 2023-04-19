import { useToast } from "@chakra-ui/react";

export const showToast = (
  title: string,
  description: string,
  status: "info" | "success" | "error" | "loading"
) => {
  const toast = useToast();
  toast({
    title,
    description,
    status,
    duration: 9000,
    isClosable: true,
  });
};
