import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, ButtonGroup, Editable, EditableInput, EditablePreview, EditableTextarea, Flex, Heading, IconButton, Textarea, useEditableControls, VStack } from '@chakra-ui/react';
import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { getAllPagesBySubMenuSlug, updatePage } from '../../helpers/pages';
import { getNewsBySlug } from '../../helpers/news'

interface News {
    id: number,
    title: string,
    content: string,
};

export default function PageBuilder(req : NextApiRequest, res : NextApiResponse) {    
    const router = useRouter();
    
    const [news, setNews] = useState<News>();

    async function loadPages() {
        console.log(router.query);
        const { slug } = router.query;
        setNews(await getNewsBySlug(slug));
    }

    useEffect(()=>{
        loadPages();
    }, [router.isReady]);

    return (
        <>
            <VStack m={'auto'} w={'75%'} mt={4}>
                <Navbar />
                <VStack py={10} w={'75%'} minH={'75vh'}>
                    
                    <Box w={'full'}>
                        <Heading mb={4}>{news?.title}</Heading>
                        <sub>Por: Ozéias Silva Souza</sub>
                        <p>{news?.content}</p>
                    </Box>
                    
                </VStack>
            </VStack>
            <Footer />       
        </>
    );
}