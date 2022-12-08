import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";

const formatedTimestamp = (d : Date)=> {
    const date = d.toISOString().split('T')[0].split('-').reverse().join('/');
    let time = d.toTimeString().split(' ')[0];

    // removendo segundos
    let timeNoSec = time.split(':');
    timeNoSec.pop();
    time = timeNoSec.join(':');

    return `${date} ${time}`
}

const fakeEvents = [
    {
        title: 'Palestra 1',
        orator: 'Ozeias souza',
        tema: 'AAAAA',
        begin: new Date(),
        end: new Date()
    },
    {
        title: 'Palestra 2',
        orator: 'Ozeias souza',
        tema: 'BBBBB',
        begin: new Date(),
        end: new Date()
    },
    {
        title: 'Palestra 3',
        orator: 'Ozeias souza',
        tema: 'CCCCC',
        begin: new Date(),
        end: new Date()
    },
    
]

export default function Events() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();

    function modelEvent() {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{description}</ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    function openModal(title : string, description : string) {
        setTitle(title);
        setDescription(description);
        onOpen();
    }

    function eventsBuilder() {
        return (
            <TableContainer>
                <Text py={4} textAlign={'center'} fontSize={'1xl'} fontWeight={'bold'}>Ultimos eventos</Text>
                <Table variant='simple'>                    
                    <TableCaption>Tabela de eventos ativos</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Título</Th>
                            <Th>Palestrante</Th>
                            <Th>Inicio</Th>
                            <Th>Fim</Th>
                            <Th>Mais detalhes</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {fakeEvents.map(({title, orator, begin, end, tema}, i) => {
                            return(
                                <Tr key={i}>
                                    <Td>{title}</Td>
                                    <Td>{orator}</Td>
                                    <Td>{formatedTimestamp(begin)}</Td>
                                    <Td>{formatedTimestamp(end)}</Td>
                                    <Td textAlign={'center'}>
                                        <IconButton onClick={()=>openModal(title, tema)} icon={<ChevronRightIcon />} aria-label={""} />
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <>
            {eventsBuilder()}
            {modelEvent()}
        </>
    );

}