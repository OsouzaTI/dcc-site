import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, HStack, IconButton, useDisclosure, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllPages } from "../../helpers/pages";
import formatedTimestamp from '../../helpers/dateFormat';
import { CustomModalFormState } from "./modal.types";
import CustomModalForm from "./CustomModalForm";
import { FieldValues } from "react-hook-form";
import { MenuInterface, SubMenuInterface } from "../menu.types";
import { getAllSubMenus } from "../../helpers/submenus";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { getAllNews } from '../../helpers/news'

interface News {
    id: number,
    title: string,
    content: string,
    slug: string,
    createdAt: string
};

export default function NewsControll() {
    
    const [modalState, setModalState] = useState<CustomModalFormState>({
        title: '',
        action: '',
        send: (data) => {},
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [news, setNews] = useState<News[]>();
    

    async function loadNews() {        
        setNews(await getAllNews());
    }

    async function addNews(data : FieldValues) {

        let token = getCookie('token')?.toString() ?? 'NO_TOKEN';
        const response = await fetch('http://localhost:4000/news/add', {
            method: 'POST',
            body: JSON.stringify({...data}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if(response.status == 200) {
            loadNews();
        }

        onClose();

    }

    function openModal(index: number, title : string, action : string, send : (data : FieldValues) => void) {        
        setModalState({action, title, send});
        onOpen();
    }

    useEffect(()=>{
        loadNews();
    }, []);

    return (
        <>
            <CustomModalForm
            title={modalState.title} action={modalState.action}
            fields={['title', 'content']} 
            types={['text', 'textarea']}
            isOpen={isOpen} 
            onOpen={onOpen} onClose={onClose} send={(data)=>modalState.send(data)} />
            <HStack my={10} w={'full'} justifyContent={'end'}>
                <IconButton colorScheme={'green'} variant={'outline'} aria-label={""} icon={<AddIcon/>} onClick={()=>openModal(0, 'Criar Notícia', 'Adicionar', addNews)} />
            </HStack>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Lista de paginas</TableCaption>
                    <Thead>
                        <Tr>
                            <Th w={'full'}>Title</Th>
                            <Th w={'42'}>Author</Th>
                            <Th w={'42'}>Criada em</Th>
                            <Th w={'42'}>Edit / Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {news?.map((n, i) => (
                            <Tr key={i}>
                                <Td>{n.title}</Td>
                                <Td>Ozéias Silva Souza</Td>
                                <Td>{formatedTimestamp(new Date(n.createdAt))}</Td>
                                <Td w={'full'}>
                                    <HStack columnGap={2}>
                                        <IconButton onClick={()=>{}} colorScheme={'green'} icon={<EditIcon />} aria-label={""} />
                                        <IconButton colorScheme={'red'} icon={<DeleteIcon />} aria-label={""} />
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        
        </>
    );

}