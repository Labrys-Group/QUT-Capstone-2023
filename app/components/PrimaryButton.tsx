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
  size: { base: "xs", md: "md" },
  fontSize: { base: "1.5em", md: "1em" },
};

const PrimaryButton = ({
  children,
  ...props
}: PropsWithChildren<PrimaryButtonProps>) => {
  return (
    <Button sx={btnStyle} _hover={{ bg: "#435dba" }} {...props}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
