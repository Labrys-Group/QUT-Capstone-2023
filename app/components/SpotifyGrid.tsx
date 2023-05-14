// This is the code for the ImageBox component which is used in the content page:
import { SimpleGrid, Box, Image } from "@chakra-ui/react";
import { Spotify } from "react-spotify-embed";

type PlaylistProps = {
  link: string;
};

export type SpotifyGridProps = {
  spotify_list: PlaylistProps[];
};
//export type NavBarProps = {};
const SpotifyGrid = ({ spotify_list }: SpotifyGridProps) => {
  return (
    <SimpleGrid
      minChildWidth="240px"
      spacing="120px"
      paddingTop="50px"
      className="contentPagePadding"
    >
      {spotify_list.map((playlist) => (
        <Box key={playlist.link}>
          <Spotify link={playlist.link} 
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};
export default SpotifyGrid;
