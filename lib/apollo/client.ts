import { ApolloClient, InMemoryCache } from '@apollo/client'

// This is the client-side client
export const apollo = new ApolloClient({
  credentials: 'include', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          
        }
      }
    }
  }),
  uri: process.env.NEXT_PUBLIC_BACKEND_URI
})
