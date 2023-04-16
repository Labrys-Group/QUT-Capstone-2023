import { Text, Box, Flex } from "@chakra-ui/react";

export type TitleAndDescriptionProps = {
  title: string;
  description?: string;
};

const boxStyle = {
  flexDirection: "column",
  maxWidth: "55vw",
};

const descriptionStyle = {
  // add bg
  backgroundColor: "#1E1E22",
  borderRadius: "10px",
  padding: "12px 16px",
  lineHeight: "16px",
};

const titleStyle = {
  // add shadow
  textShadow: "0px 0px 20px #000000,0px 0px 50px #000000",
  textStroke: "2px #000000",
};

const TitleAndDescription = ({
  title,
  description,
}: TitleAndDescriptionProps) => {
  return (
    <Flex sx={boxStyle}>
      <Text className="title" sx={titleStyle}>
        {title.toUpperCase()}
      </Text>
      <Text className="txt" sx={descriptionStyle}>
        {description}
      </Text>
    </Flex>
  );
};

export default TitleAndDescription;
