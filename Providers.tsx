'use client'
import { apollo } from '@/lib'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={apollo}> 
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </ApolloProvider>
  )
}
