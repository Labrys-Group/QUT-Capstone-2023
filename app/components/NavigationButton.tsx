import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

type InheritedProps = ButtonProps;

// type Page = "item" | "item-climbing-gym" | "item-table-tennis";

export type NavigationButtonProps = {
  direction: "left" | "right";
  goto: string;
};

const NavigationButton = ({
  direction,
  goto,
}: PropsWithChildren<NavigationButtonProps>) => {
  const router = useRouter();

  return (
    <Button bg="none" onClick={() => router.push(`/${goto}`)}>
      {direction === "left" ? (
        <ChevronLeftIcon boxSize={6} />
      ) : (
        <ChevronRightIcon boxSize={6} />
      )}
    </Button>
  );
};

export default NavigationButton;
