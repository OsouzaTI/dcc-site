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
import { getAllMenus } from "../../helpers/menus";

export default function SubMenuControll() {
    
    const [modalState, setModalState] = useState<CustomModalFormState>({
        title: '',
        action: '',
        send: (data) => {},
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [menus, setMenus] = useState<MenuInterface[]>();
    const [subMenus, setSubMenus] = useState<SubMenuInterface[]>();
    

    async function loadSubMenus() {        
        setSubMenus(await getAllSubMenus());
    }

    async function loadMenus() {        
        setMenus(await getAllMenus());
    }

    async function addSubMenu(data : FieldValues) {
        let menu = document.querySelector('select[name="menu-id"]');
        if(menu) {

            let token = getCookie('token')?.toString() ?? 'NO_TOKEN';
            const response = await fetch('http://localhost:4000/submenu/add', {
                method: 'POST',
                body: JSON.stringify({MenuId: menu?.value ?? -1, ...data}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if(response.status == 200) {
                loadMenus();
                loadSubMenus();
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
            <Select name={"menu-id"}>
                {menus?.map((menu, i)=><option key={i} value={menu.id}>{menu.title}</option>)}
            </Select>
        );
    }

    function getMenuTitleBySubMenu(sub : SubMenuInterface) {
        if(menus) {

            for(let m = 0; m < menus.length; m++) {
                if(menus[m].SubMenus.findIndex((v, i)=>v.id == sub.id) != -1) {
                    return menus[m].title;
                }
            }
            
        }
        return '-';
    }

    useEffect(()=>{
        loadMenus();
        loadSubMenus();
    }, []);

    return (
        <>
            <CustomModalForm
            children={buildSelectMenu()}
            title={modalState.title} action={modalState.action}
            fields={['title']} isOpen={isOpen} 
            onOpen={onOpen} onClose={onClose} send={(data)=>modalState.send(data)} />
            <HStack my={10} w={'full'} justifyContent={'end'}>
                <IconButton colorScheme={'green'} variant={'outline'} aria-label={""} icon={<AddIcon/>} onClick={()=>openModal(0, 'Criar Sub menu', 'Adicionar', addSubMenu)} />
            </HStack>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Lista de sub menus</TableCaption>
                    <Thead>
                        <Tr>
                            <Th w={'full'}>Title</Th>                            
                            <Th w={'full'}>Menu</Th>
                            <Th w={'42'}>Edit / Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {subMenus?.map((sub, i) => (
                            <Tr key={i}>
                                <Td>{sub.title}</Td>                                
                                <Td>{getMenuTitleBySubMenu(sub)}</Td>
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