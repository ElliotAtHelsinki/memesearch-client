'use server'
import { from, HttpLink, NormalizedCacheObject } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { ApolloClient, InMemoryCache, registerApolloClient } from '@apollo/experimental-nextjs-app-support'


const errorLink = onError(({ graphQLErrors, networkError }) => {
  graphQLErrors?.forEach(({ message, locations, path }) => {
    console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
    )
  })
  if (networkError) console.error(`[Network error]: ${networkError}`)
})


// This is the server-side client
export const createApolloClient = async () => registerApolloClient<ApolloClient<NormalizedCacheObject>>(() => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URI,
    credentials: 'include',
  })
  return new ApolloClient({
    ssrMode: true,
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache()
  })
})
