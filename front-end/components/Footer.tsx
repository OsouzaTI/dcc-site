import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Links from "./Links";

export default function Footer() {
    return (
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
    );
}