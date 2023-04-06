import { Text, Box } from '@chakra-ui/react'

export type ItemTitleProps = {
  text: string
}

const style = {
  position: 'absolute',
  width: '488px',
  height: '266px',
  left: '135px',
  top: '20%',
}

const TitleStyle = {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '900',
  fontSize: '110px',
  lineHeight: '133px',
  display: 'flex',
  alignItems: 'center',
  // border: '2px solid #000000',
  textShadow: '0px 0px 50px #000000',
}

const ItemTitle = ({ text, ...props }: ItemTitleProps) => {
  return (
    <Box sx={style}>
      <Text sx={TitleStyle}>{text}</Text>
    </Box>
  )
}

export default ItemTitle
