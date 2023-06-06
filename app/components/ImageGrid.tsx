// This is the code for the ImageBox component which is used in the content page:
import { SimpleGrid, Box, Image } from "@chakra-ui/react";

type ImageProps = {
  alt: string;
  src: string;
};

export type ImageGridProps = {
  image_list: ImageProps[];
};

const ImageGrid = ({ image_list }: ImageGridProps) => {
  return (
    <SimpleGrid
      minChildWidth="200px"
      spacing="50px"
      className="contentPagePadding"
    >
      {image_list.map((image) => (
        <Box key={image.src}>
          <Image
            height="100%"
            objectFit="cover"
            src={image.src}
            alt={image.alt}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};
export default ImageGrid;
