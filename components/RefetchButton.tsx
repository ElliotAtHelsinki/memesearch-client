'use client'
import { Button, PropsOf } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export const RefetchButton: React.FC<PropsOf<typeof Button>> = (props) => {
  const router = useRouter()
  return (
    <Button onClick={() => { router.refresh() }} {...props}>Refetch</Button>
  )
}
