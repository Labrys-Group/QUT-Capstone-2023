import { Box, Text } from "@chakra-ui/react"

export type TitleComponentProps= {
  title: string
  description: string
}

const TitleComponent = ({title, description}:TitleComponentProps) => {
    return(
        <Box>
            <Text fontSize='xl'>{title}</Text>
            <Text fontSize='md'>{description}</Text>
        </Box>
    )
}

export default TitleComponent