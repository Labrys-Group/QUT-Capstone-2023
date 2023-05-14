//This component is used in content page to display title and description and any other inclusize content
//This design is suitable for any
import { Text, Flex, Box } from "@chakra-ui/react";
import ArrowButton from "./ArrowButton";
import ImageGrid from "./ImageGrid";
import VideoCarousel from "./VideoCarousel";
import SpotifyGrid from "./SpotifyGrid";
import { useRouter } from "next/router";
import { Spotify } from "react-spotify-embed";

type ImageProps = {
  alt: string;
  src: string;
};

type VideoProps = {
  src: string;
};

type PlaylistProps = {
  link: string;
};

export type ContentTitleProps = {
  title: string;
  description?: string;
  images?: ImageProps[];
  videos?: VideoProps[];
  playlists?: PlaylistProps[];
};

const boxStyle = {
  flexDirection: "column",
  marginLeft: "50px",
};

const descriptionStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: "400",
  fontSize: "1.2em",
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
  playlists,
}: ContentTitleProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <Flex w="100vw">
      <Flex alignItems={"start"} w="2%">
        <ArrowButton direction="left" onClick={handleClick} />
      </Flex>
      <Box w="88%">
        <Flex sx={boxStyle}>
          <Text sx={titleStyle}>{title.toUpperCase()}</Text>

          <Text sx={descriptionStyle}>{description}</Text>
        </Flex>
        <Box mt="20px">
          <ImageGrid image_list={images || []} />
        </Box>

        <VideoCarousel video_list={videos || []} />
        <SpotifyGrid spotify_list={playlists || []} />
      </Box>
    </Flex>
  );
};

export default ContentTitle;
