import { HStack, Icon, IconButton, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CustomModalForm from "./CustomModalForm";
import { FieldValues } from "react-hook-form";
import { getAllMenus } from '../../helpers/menus';
import { MenuInterface } from "../menu.types";
import { CustomModalFormState } from "./modal.types";



export default function MenuControll() {

    const [modalState, setModalState] = useState<CustomModalFormState>({
        title: '',
        action: '',
        send: (data) => {},
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [menus, setMenus] = useState<MenuInterface[]>();
    const [menuId, setMenuId] = useState(-1);
    

    async function loadMenus() {        
        setMenus(await getAllMenus());
    }

    async function editMenuItem(data : FieldValues) {
        
        if(menuId != -1 && menus) {
            let token = getCookie('token')?.toString() ?? 'NO_TOKEN';
            const response = await fetch('http://localhost:4000/menu/edit', {
                method: 'PUT',
                body: JSON.stringify({id: menuId, ...data}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if(response.status == 200) {
                loadMenus();
            }

            onClose();

        }
    }

    async function addMenu(data : FieldValues) {
        
        if(menus) {
            let token = getCookie('token')?.toString() ?? 'NO_TOKEN';
            const response = await fetch('http://localhost:4000/menu/add', {
                method: 'POST',
                body: JSON.stringify({...data}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if(response.status == 200) {
                loadMenus();
            }

            onClose();

        }
    }

    function openModal(index: number, title : string, action : string, send : (data : FieldValues) => void) {        
        if(menus) {
            setMenuId(menus[index].id);
            setModalState({action, title, send});
            onOpen();
        }
    }

    useEffect(()=>{loadMenus()}, []);

    return (
        <>
        <CustomModalForm
                title={modalState.title} action={modalState.action}
                fields={['title']} isOpen={isOpen} 
                onOpen={onOpen} onClose={onClose} send={(data)=>modalState.send(data)} />
        <HStack my={10} w={'full'} justifyContent={'end'}>
            <IconButton colorScheme={'green'} variant={'outline'} aria-label={""} icon={<AddIcon/>} onClick={()=>openModal(0, 'Adicionar Menu', 'Adicionar', addMenu)} />
        </HStack>
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Lista de menus</TableCaption>
                <Thead>
                    <Tr>
                        <Th w={'full'}>Title</Th>
                        <Th w={'42'}>Edit / Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {menus?.map((menu, i) => (
                        <Tr key={i}>
                            <Td>{menu.title}</Td>
                            <Td w={'full'}>
                                <HStack columnGap={2}>
                                    <IconButton onClick={()=>openModal(i, 'Editar Menu', 'Editar', editMenuItem)} colorScheme={'green'} icon={<EditIcon />} aria-label={""} />
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