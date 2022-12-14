import { Box, Card, CardBody, CardHeader, Divider, Heading, SimpleGrid, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllNews } from '../helpers/news'

interface News {
    id: number,
    title: string,
    content: string,
    slug: string
};

export default function CardNews() {

    const [news, setNews] = useState<News[]>();

    async function loadNews() {
        setNews(await getAllNews());
    }

    useEffect(()=>{
        loadNews();
    }, []);


    function buildCardNews() {
        return news?.map(({title, content, slug}, i) => {
            return (                
                <Card key={i}>
                    <CardHeader>
                        <Text size='md' fontWeight={'semibold'}>{title}</Text>
                        <Text fontSize={'xs'}>Por: Ozéias Silva Souza</Text>
                    </CardHeader>
                    <CardBody>
                        <Box>                            
                            <Text pt='2' fontSize='sm'>{content.substring(0, 250)+'...'}</Text>
                            <Link color={'blue.500'} href={`/news/${slug}`}>Ler mais...</Link>
                        </Box>
                    </CardBody>
                </Card>
                
            )
        });
    }

    return (
        <VStack>
            <Text fontSize={'2xl'} fontWeight={'bold'}>Ultimas notícias</Text>            
            <SimpleGrid columns={[2, 3, 5]} gap={4}>
                {buildCardNews()}
            </SimpleGrid>
        </VStack>
    );

}