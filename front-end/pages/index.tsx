import { Box, HStack, VStack, Image, Text } from '@chakra-ui/react'
import Head from 'next/head'
import CardNews from '../components/CardNews'
import Carrousel from '../components/Carrousel'
import Events from '../components/Events'
import Links from '../components/Links'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import Login from './auth/login'

export default function Home() {
  return (
    <>
      <VStack m={'auto'} w={'75%'} mt={4}>
        <Navbar />
        <HStack w={'full'} justifyContent={'space-around'} pt={5}>
          <Carrousel />
          <Events />
        </HStack>
        <CardNews />
      </VStack>
      <VStack justifyContent={'center'} w={'full'} h={'64'} mt={'60px !important'} bg={'darkblue'}>
        <HStack w={'75%'} color={'white'} justifyContent={'space-around'}>
          <Box rounded={'md'} bg={'white'}>
            <Image w={'24'} src={'https://dcc-ufrr.vercel.app/images/logos/logo_ufrr.png'} />
          </Box>
          <Links />
        </HStack>
        <Box color={'white'} textAlign={'center'}>
          <Text fontWeight={'bold'}>INFORMAÇÕES</Text>
          <Text fontSize={'sm'}>UFRR, Campus Paricarana, CCT</Text>
          <Text fontSize={'sm'}>Av. Capitão Ene Garcez, 2413 - Bairro Aeroporto.</Text>
          <Text fontSize={'sm'}>Boa Vista - Roraima RR. 69304-000</Text>
        </Box>
      </VStack>      
    </>
  )
}
