import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type InheritedProps = Pick<
  IconButtonProps,
  | "onClick"
  | "className"
  | "disabled"
  | "color"
  | "fontSize"
  | "bg"
  | "_hover"
  | "_active"
  | "icon"
>;

export type ArrowButtonProps = InheritedProps & {
  onClick(): void;
  direction: "left" | "right";
};

const ArrowButton = ({
  onClick,
  direction,
  ...props
}: PropsWithChildren<ArrowButtonProps>) => {
  const icon =
    direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />;
  const ariaLabel = direction === "left" ? "Arrow left" : "Arrow right";
  return (
    <IconButton
      fontSize="40px"
      {...props}
      onClick={onClick}
      bg="none"
      _hover={{ color: "rgba(255, 255, 255, 1)" }}
      _active={{ bg: "none" }}
      aria-label={ariaLabel}
      icon={icon}
    ></IconButton>
  );
};

export default ArrowButton;
