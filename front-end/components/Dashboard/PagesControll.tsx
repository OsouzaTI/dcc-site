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

interface Page {
    title: number,
    content: string,
    createdAt: string,
    SubMenuId: number
};

export default function PagesControll() {
    
    const [modalState, setModalState] = useState<CustomModalFormState>({
        title: '',
        action: '',
        send: (data) => {},
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [pages, setPages] = useState<Page[]>();
    const [subMenus, setSubMenus] = useState<SubMenuInterface[]>();
    

    async function loadSubMenus() {        
        setSubMenus(await getAllSubMenus());
    }

    async function loadPages() {        
        setPages(await getAllPages());
    }

    async function addPage(data : FieldValues) {
        let submenu = document.querySelector('select[name="sub-menu-id"]');
        if(submenu) {

            let token = getCookie('token')?.toString() ?? 'NO_TOKEN';
            const response = await fetch('http://localhost:4000/page/add', {
                method: 'POST',
                body: JSON.stringify({SubMenuId: submenu?.value ?? -1, ...data}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if(response.status == 200) {
                loadPages();
            }

            onClose();

        }
    }

    function openModal(index: number, title : string, action : string, send : (data : FieldValues) => void) {        
        setModalState({action, title, send});
        onOpen();
    }

    function buildSelectMenu() {
        return (
            <Select name={"sub-menu-id"}>
                {subMenus?.map((sub, i)=><option key={i} value={sub.id}>{sub.title}</option>)}
            </Select>
        );
    }


    function getSubMenuTitleByPage(page : Page) {
        if(subMenus) {
            let index = subMenus.findIndex((v, i)=>v.id == page.SubMenuId);
            if(index != -1) {
                return subMenus[index].title;
            }            
        }
        return '-';
    }

    function getSubMenuSlugByPage(page : Page) {
        if(subMenus) {
            let index = subMenus.findIndex((v, i)=>v.id == page.SubMenuId);
            if(index != -1) {
                return subMenus[index].slug;
            }            
        }
        return '-';
    }

    useEffect(()=>{
        loadPages();
        loadSubMenus();
    }, []);

    return (
        <>
            <CustomModalForm
            children={buildSelectMenu()}
            title={modalState.title} action={modalState.action}
            fields={['title', 'content']} 
            types={['text', 'textarea']}
            isOpen={isOpen} 
            onOpen={onOpen} onClose={onClose} send={(data)=>modalState.send(data)} />
            <HStack my={10} w={'full'} justifyContent={'end'}>
                <IconButton colorScheme={'green'} variant={'outline'} aria-label={""} icon={<AddIcon/>} onClick={()=>openModal(0, 'Criar pagina', 'Adicionar', addPage)} />
            </HStack>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Lista de paginas</TableCaption>
                    <Thead>
                        <Tr>
                            <Th w={'full'}>Title</Th>
                            <Th w={'42'}>Sub Menu</Th>
                            <Th w={'42'}>Criada em</Th>
                            <Th w={'42'}>Edit / Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {pages?.map((page, i) => (
                            <Tr key={i}>
                                <Td>{page.title}</Td>
                                <Td>{getSubMenuTitleByPage(page)}</Td>
                                <Td>{formatedTimestamp(new Date(page.createdAt))}</Td>
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