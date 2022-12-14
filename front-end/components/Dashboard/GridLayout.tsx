import React, { useState } from "react";
import { Box, Button, Grid, GridItem, Image, VStack } from "@chakra-ui/react";
import Link from "next/link";
import MenuControll from "./MenuControll";
import PagesControll from "./PagesControll";
import SubMenuControll from "./SubMenuControll";
import NewsControll from "./NewsControll";


export default function GridLayout({children} : React.PropsWithChildren) {

    const [menu, setMenu] = useState(-1);

    const menuAdmin = [
        {title: 'Usuarios'},
        {title: 'Notícias'},
        {title: 'Menus'},
        {title: 'Sub Menus'},
        {title: 'Paginas'},
    ];

    function componentBuilder()
    {
        switch(menu)
        {
            case 0: return <></>;
            case 1: return <NewsControll/>;
            case 2: return <MenuControll/>;            
            case 3: return <SubMenuControll/>;
            case 4: return <PagesControll/>;
        }
    }

    return (
        <Grid
            templateAreas={`"nav main"`}
            gridTemplateRows={'1fr'}
            gridTemplateColumns={'200px 1fr'}
            h={'100vh'}
            gap='1'
            color={'black'}
            fontWeight='bold'
        >
            <GridItem p={'2'} bg={'blue.700'} area={'nav'}>
                <VStack h={'full'} justifyContent={'space-between'}>
                    <VStack>
                        {menuAdmin.map((menu, i) => (
                            <Button key={i} w={'44'} onClick={()=>setMenu(i)}>{menu.title}</Button>
                            ))}
                    </VStack>
                    <Box bg={'blue.100'} rounded={'md'} p={2}>
                        <Link href={'/'}>
                            <Image src={"https://dcc-ufrr.vercel.app/images/logos/logo-dcc-01.png"} />
                        </Link>
                    </Box>
                </VStack>
            </GridItem>
            <GridItem p={'2'} area={'main'}>
                <Box m={'auto'} w={'60%'}>
                    {componentBuilder()}
                </Box>
            </GridItem>
        </Grid>
    );
}