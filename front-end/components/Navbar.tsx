import { Box, Button, Divider, HStack, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { useRouter } from "next/router";


const fakeMenus = [
    {
        title: 'DCC 1',
        submenus: [
            { title: 'Apresentção do curso 1' },
            { title: 'Apresentção do curso 2' },
            { title: 'Apresentção do curso 3' }
        ]
    },
    {
        title: 'DCC 2',
        submenus: [
            { title: 'Apresentção do curso 1' },
            { title: 'Apresentção do curso 2' },
            { title: 'Apresentção do curso 3' }
        ]
    },
    {
        title: 'DCC 3',
        submenus: [
            { title: 'Apresentção do curso 1' },
            { title: 'Apresentção do curso 2' },
            { title: 'Apresentção do curso 3' }
        ]
    },
    {
        title: 'DCC 4',
        submenus: [
            { title: 'Apresentção do curso 1' },
            { title: 'Apresentção do curso 2' },
            { title: 'Apresentção do curso 3' }
        ]
    }
];

export default function Navbar() {

    const router = useRouter();

    function menuBuilder() {
        return fakeMenus.map(function(menu, i){
            return (
                <Menu key={i}>
                    <MenuButton fontSize={'md'} fontWeight={'normal'} as={Button} rightIcon={<ChevronDownIcon />}>
                        {menu.title}
                    </MenuButton>
                    <MenuList>
                        {menu.submenus.map((smenu, j) => <MenuItem key={j}>{smenu.title}</MenuItem>)}
                    </MenuList>
                </Menu>
            );
        });
    }

    const goToAdmin = () => router.push('/admin');

    return (
        <>
            <HStack w={'full'}>
                <Box w={'sm'}>
                    <Image w={'48'} h={'20'} src={'https://dcc-ufrr.vercel.app/images/logos/logo-dcc-01.png'} />            
                </Box>
                <HStack w={'full'} justifyContent={'center'} >{menuBuilder()}</HStack>
                <Button colorScheme={'blue'} onClick={goToAdmin}>Admin</Button>
            </HStack>
            <Box pt={2} mb={'10'} w={'lg'} textAlign={'center'} color={"gray.400"}>
                {/* <TriangleDownIcon /> */}
            </Box>
        </>

    );

}