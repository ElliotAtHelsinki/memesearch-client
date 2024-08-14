'use client'
import { CloseIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'

interface Props {
  message: string
}

export const FormErrorMessage: React.FC<Props> = (props) => {
  const { message } = props 
  return (
    <Flex alignItems='center' color='red' mt={4} fontSize='0.875rem' >
      <CloseIcon color='red' mr={2.5} fontSize='0.725rem'/>
      <Text color='red'>{message}</Text>
    </Flex>
  )
}
