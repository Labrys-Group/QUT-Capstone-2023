import { Button, ButtonProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type InheritedProps = Pick<ButtonProps, "leftIcon" | "size" | "rightIcon">;

export type PrimaryButtonProps = InheritedProps & {
  //text: string
  onClick(): void;
};

const btnStyle = {
  display: "flex",
  textAlign: "center",
  backgroundColor: "#7190FF",
  color: "whiteAlpha.900",
  flexDirection: "row",
};

const PrimaryButton = ({
  onClick,
  children,
  ...props
}: PropsWithChildren<PrimaryButtonProps>) => {
  return (
    <Button sx={btnStyle} size="md" {...props} _hover={{ bg: "#435dba" }}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
