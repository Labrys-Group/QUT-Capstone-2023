import { Text, Flex } from "@chakra-ui/react";

export type TitleAndDescriptionProps = {
  title: string | undefined;
  description?: string | undefined;
};

const boxStyle = {
  flexDirection: "column",
  maxWidth: { base: "60vw", md: "40vw", lg: "35vw" },
};

const descriptionStyle = {
  // add bg
  backgroundColor: "rgba(30,30,34,0.6)",
  borderRadius: "10px",
  padding: "12px 16px",
  lineHeight: "22px",
};

const titleStyle = {
  // add shadow
  textShadow: "0px 0px 20px #000000,0px 0px 50px #000000",
  textStroke: "2px #000000",
  wordWrap: "initial",
};

const TitleAndDescription = ({
  title,
  description,
}: TitleAndDescriptionProps) => {
  let myString;
  let replacedStr;
  if (title != undefined && description != undefined) {
    myString = title.replace(/\s/g, " ");
    myString = myString.toUpperCase();
    replacedStr = description.replace(/-/g, "_");
  }
  return (
    <Flex sx={boxStyle}>
      <Text className="title" sx={titleStyle}>
        {myString}
      </Text>
      <Text className="txt" sx={descriptionStyle}>
        {replacedStr}
      </Text>
    </Flex>
  );
};

export default TitleAndDescription;
