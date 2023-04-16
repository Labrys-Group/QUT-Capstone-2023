import { Text, Box } from "@chakra-ui/react";

export type TitleAndDescriptionProps = {
  title: string;
  description?: string;
};

const descriptionStyle = {
  // add bg
  backgroundColor: "#303030",
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
    <Box>
      <Text className="title" sx={titleStyle}>
        {title}
      </Text>
      <Text className="txt" sx={descriptionStyle}>
        {description}
      </Text>
    </Box>
  );
};

export default TitleAndDescription;
