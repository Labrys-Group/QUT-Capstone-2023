import { Text, Box } from '@chakra-ui/react'

export type ItemTitleProps = {
  status: boolean
  text: string | undefined
}

const boxStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'left',
  width: '50vw',
  //height: '108px',
  top: '0',
  left: '2%',
  right: '0',
  marginLeft: '0',
  marginRight: 'auto',
  background: 'rgba(30, 30, 34, 0.5)',
  border: '0.42735px solid #303030',
  boxShadow: '0px 3.4188px 8.54701px 1.7094px rgba(0, 0, 0, 0.2)',
  borderRadius: '8.54701px',
}

const textStyle = {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '900',
  lineHeight: '17px',
  textAlign: 'center',
  /* identical to box height */
  display: 'flex',
  alignItems: 'center',
}

const DescriptionBox = ({ status, text, ...props }: ItemTitleProps) => {
  return (
    <Box sx={boxStyle}>
      <Text sx={textStyle} color={'#FFFFFF'} fontSize={'14px'}>
        An exclusive online community dedicated to fans of EXY, leader of the K-pop girl group COSMIC GIRLS (also known as WJSN). This community is a gathering place for fans who admire EXY's talents, personality, and unique style. As a member of the EXY Community, you will have access to exclusive content, such as behind-the-scenes footage, photos, and interviews. You will also be able to connect with other fans from all over the world who share your love for EXY and COSMIC GIRLS.
      </Text>
    </Box>
  )
}

export default DescriptionBox
