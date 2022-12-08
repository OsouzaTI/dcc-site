import { Box, Image } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
    {
      src:"https://dcc-ufrr.vercel.app/images/destaques/ict.png"
    },
    {
      src:"https://dcc-ufrr.vercel.app/images/destaques/melhor-artigo.png"
    },
    {
      src:"https://dcc-ufrr.vercel.app/images/destaques/maratona.png"
    }
];

export default function Carrousel() {

    return (
        <Box w={'lg'}>
            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
                {images.map(({src}, i) =>
                    <Box key={i} border={'1px'} borderColor={'gray.300'} rounded={'md'}>
                        <Image p={1} src={src} />
                    </Box>
                )}
            </Carousel>
        </Box>
    );

}