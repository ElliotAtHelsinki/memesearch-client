'use client'
import { InputField, Wrapper } from '@/components'
import { SearchDocument } from '@/generated/graphql/graphql'
import { useQuery } from '@apollo/client'
import { Image } from '@chakra-ui/react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
// import { readFileSync } from 'fs'
import { useState } from 'react'

const Home: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const { refetch } = useQuery(SearchDocument, { skip: true })
  const [results, setResults] = useState<{ __typename?: string, image: string, text: string }[]>([])

  return (
    <main>
      <Wrapper variant='regular'>
        <Formik
          initialValues={{ image: '' }}
          onSubmit={async ({ }, { setValues }) => {
            if (imageFile) {
              setResults([])
              const reader = new FileReader()
              reader.readAsArrayBuffer(imageFile)
              reader.onloadend = async () => {
                const b64 = Buffer.from(reader.result as string, 'base64').toString('base64')
                const result = await refetch({ image: b64, limit: 10 })
                setResults(result.data.search)
                setImageFile(null)
                setValues({ image: '' })
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                label='Upload image to search for the most similar memes'
                name='image'
                type='file'
                accept='image/*'
                p={2}
                h='3rem'
                onChange={(e) => {
                  setResults([])
                  if (e.currentTarget.files) {
                    setImageFile(e.currentTarget.files[0])
                  }
                }}
              />
              {
                imageFile &&
                <Flex flexDir='column' alignItems='center' mt={4}>
                  <Text>Selected image: {imageFile.name}</Text>
                </Flex>
              }
              <Flex mt={4} w='100%' justifyContent='center'>
                <Button type='submit' isLoading={isSubmitting} hidden={!imageFile ? true : false}>Search</Button>
              </Flex>
            </Form>
          )}
        </Formik>
        <Flex alignItems='center' justifyContent='center' p={2} flexWrap='wrap' rowGap={4}>
          {
            results?.map(r => (
              <Flex flexDir='column' alignItems='center'>
                <Image src={`data:image/${r.text.split('.')[r.text.split('.').length - 1]};base64,${r.image}`} alt={r.text || ''} />
                <Text mt={4}>{r.text}</Text>
              </Flex>
            ))
          }
        </Flex>
      </Wrapper>
    </main>
  )
}
export default Home