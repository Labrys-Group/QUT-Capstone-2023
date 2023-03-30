import { Button, ButtonProps } from '@chakra-ui/react'

type InheritedProps = ButtonProps

export type PrimaryButtonProps= InheritedProps &{
    text: string
    onClick(): void
    price?: number
}

const PrimaryButton = ({text, onClick, price = 0.01, children, ...props}:PrimaryButtonProps) =>{

    return (
        <Button onClick={onClick} {...props}>{text} {children}</Button> 
    )
}

export default PrimaryButton