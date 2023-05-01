// This is the code for the ImageBox component which is used in the content page:
import { SimpleGrid, Box, Image, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type VideoProps = {
  src: string;
};

export type VideoGridProps = {
  video_list: VideoProps[];
};

const VideoCarousel = ({ video_list }: VideoGridProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };
  function NextArrow(props: any) {
    const { onClick } = props;
    return (
      <IconButton
        className="slick-arrow slick-next"
        onClick={onClick}
        aria-label="Arrow right"
        fontSize="20px"
        bg="none"
        _hover={{ bg: "none" }}
        _active={{ bg: "none" }}
        icon={<ChevronRightIcon />}
      />
    );
  }

  function PrevArrow(props: any) {
    const { onClick } = props;
    return (
      <IconButton
        className="slick-arrow slick-prev"
        onClick={onClick}
        aria-label="Arrow back"
        fontSize="20px"
        bg="none"
        _hover={{ bg: "none" }}
        _active={{ bg: "none" }}
        icon={<ChevronLeftIcon />}
      />
    );
  }

  return (
    <Box>
      <Slider {...settings}>
        {video_list.map((video) => (
          <Box key={video.src} p={2} display="flex" justifyContent="center">
            <iframe
              width="100%"
              height="500"
              src={video.src}
              frameBorder="0"
              allowFullScreen
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default VideoCarousel;

//import { SimpleGrid, Box, Image } from "@chakra-ui/react";

// const images = [
//   { src: "https://example.com/image1.jpg", alt: "Image 1" },
//   { src: "https://example.com/image2.jpg", alt: "Image 2" },
//   { src: "https://example.com/image3.jpg", alt: "Image 3" },
//   // Add more images as needed
// ];

// export default function ImageGrid() {
//   return (
//     <SimpleGrid columns={[1, 2, 3]} spacing={4}>

//     </SimpleGrid>
//   );
// }

// <Box>
//   <Image height="100%" objectFit="cover" src={src_} alt={alt_} />
// </Box>
