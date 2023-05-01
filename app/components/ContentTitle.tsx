//This component is used in content page to display title and description
import { Text, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import ImageGrid from "./ImageGrid";
import VideoCarousel from "./VideoCarousel";
type ImageProps = {
  alt: string;
  src: string;
};

type VideoProps = {
  src: string;
};

export type ContentTitleProps = {
  title: string;
  description?: string;
  images?: ImageProps[];
  videos?: VideoProps[];
};

const boxStyle = {
  flexDirection: "column",
  marginLeft: "50px",
};

const descriptionStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: "400",
  fontSize: "18px",
  color: "#7190FF",
};

const titleStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: "900",
  fontSize: "30px",
};

const ContentTitle = ({
  title,
  description,
  images,
  videos,
}: ContentTitleProps) => {
  return (
    <Flex alignItems={"center"}>
      <ChevronLeftIcon
        className="icon"
        boxSize={10}
        color="rgba(255, 255, 255, 0.5)"
      />
      <Flex sx={boxStyle}>
        <Text sx={titleStyle}>{title.toUpperCase()}</Text>
        <Text sx={descriptionStyle}>{description}</Text>
      </Flex>
    </Flex>
  );
};

export default ContentTitle;
