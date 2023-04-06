import { Text, Box } from '@chakra-ui/react'

export type ItemTitleProps = {
  text: string
}

const boxStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  //width: '30vh',
}

const TitleStyle = {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '900',
  fontSize: '110px',
  lineHeight: '133px',
  alignItems: 'center',
  textShadow: '0px 0px 20px #000000,0px 0px 50px #000000',
  textStroke: '2px #000000',
}

const ItemTitle = ({ text, ...props }: ItemTitleProps) => {
  return (
    <Box sx={boxStyle}>
      <Text sx={TitleStyle}>{text}</Text>
    </Box>
  )
}

export default ItemTitle
