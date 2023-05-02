import { Button, ButtonProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type InheritedProps = Pick<
  ButtonProps,
  "leftIcon" | "rightIcon" | "margin" | "variant" | "size" | "onClick"
>;

export type PrimaryButtonProps = InheritedProps & {
  //text: string
};

const btnStyle = {
  display: "flex",
  textAlign: "center",
  backgroundColor: "#7190FF",
  color: "whiteAlpha.900",
  flexDirection: "row",
};

const PrimaryButton = ({
  children,
  ...props
}: PropsWithChildren<PrimaryButtonProps>) => {
  return (
    <Button sx={btnStyle} size="md" _hover={{ bg: "#435dba" }} {...props}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
