import { Box, Button, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, VStack } from "@chakra-ui/react";
import { send, title } from "process";
import { FieldValues, useForm } from "react-hook-form";

interface CustomModalFormProps {
  title: string,
  action: string,
  fields: string[],
  types?: string[],
  isOpen: boolean,
  children?: JSX.Element,
  onOpen: () => void,
  onClose: () => void,
  send: (data : FieldValues) => void
}

export default function CustomModalForm(props: CustomModalFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { isOpen, onOpen, onClose, send, types } = props;

  function buildInput(index : number, field : string) {
    if(types) {
      switch(types[index])
      {
        case 'text': return <Input {...register(field)} />;
        case 'textarea': return <Textarea {...register(field)}></Textarea>;
      }
    }
    return <Input {...register(field)} />;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit((data) => send(data))}>
            <VStack gap={4}>
              {props.children ? props.children : ''}
              {props.fields.map((field, i) => (
                <HStack key={i} alignItems={'center'} justifyContent={'space-between'}>
                  <FormLabel w={'2xs'} fontSize={'lg'}>{field}</FormLabel>
                  {buildInput(i, field)}
                </HStack>
              ))}
              <HStack mt={10} justifyContent={'center'}>
                <Button colorScheme={'green'} type="submit">{props.action}</Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
        </ModalContent>
    </Modal>
  )

}