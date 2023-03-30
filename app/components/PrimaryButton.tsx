import { Button, ButtonProps } from "@chakra-ui/react"

type InheritedProps = Pick<ButtonProps, 'leftIcon' | 'size'>

export type PrimaryButtonProps = InheritedProps & {
    text: string
    onClick():void
}

const style = {
    display:"flex",
    textAlign:"center",
    backgroundColor:"#7190FF",
    color:"whiteAlpha.900",
    flexDirection:"row"
}

const PrimaryButton = ({text, onClick, ...props} :PrimaryButtonProps) =>{
    return(
        <Button 
        sx={style}
        size='md'
        {...props}>{text}</Button>
    )
}

export default PrimaryButton