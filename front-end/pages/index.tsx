import { Box, HStack, VStack, Image, Text } from '@chakra-ui/react'
import Head from 'next/head'
import CardNews from '../components/CardNews'
import Carrousel from '../components/Carrousel'
import Events from '../components/Events'
import Footer from '../components/Footer'
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
      <Footer />    
    </>
  )
}
