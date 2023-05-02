// This is the code for the ImageBox component which is used in the content page:
import { Box } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import ArrowButton from "./ArrowButton";
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
  };
  function NextArrow(props: any) {
    const { onClick } = props;
    return <ArrowButton direction="right" onClick={onClick} />;
  }

  function PrevArrow(props: any) {
    const { onClick } = props;
    return <ArrowButton direction="left" onClick={onClick} />;
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
