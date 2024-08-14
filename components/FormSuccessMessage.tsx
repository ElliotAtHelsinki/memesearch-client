'use client'
import { CheckIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'

interface Props {
  message: string
}

export const FormSuccessMessage: React.FC<Props> = (props) => {
  const { message } = props 
  return (
    <Flex alignItems='center' color='green-500' mt={4} fontSize='0.875rem'>
      <CheckIcon color='green.700' fontSize='0.875rem' mr={2} />
      <Text color='green'>{message}</Text>
    </Flex>
  )
}
