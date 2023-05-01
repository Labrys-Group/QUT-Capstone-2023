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
  //text: string
  onClick(): void;
  direction: "left" | "right";
};

//can you please finish this component? I am looking to make this into a component where user can decide the direction of the arrow so different direction will use different icon and aria-label

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
