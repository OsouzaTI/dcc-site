import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, ButtonGroup, Editable, EditableInput, EditablePreview, EditableTextarea, Flex, Heading, IconButton, Textarea, useEditableControls, VStack } from '@chakra-ui/react';
import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { getAllPagesBySubMenuSlug, updatePage } from '../../helpers/pages';

interface Page {
    id: number,
    title: string,
    content: string,
};

interface ContentEditState {
    id: number,
    title: string,
    content: string
};

export default function PageBuilder(req : NextApiRequest, res : NextApiResponse) {    
    const router = useRouter();
    
    const [editing, setEditing] = useState(false);
    const [pages, setPages] = useState<Page[]>([]);
    const [content, setContent] = useState<ContentEditState>({id: -1, title: '', content: ''});

    async function loadPages() {
        console.log(router.query);
        const { submenu } = router.query;
        setPages(await getAllPagesBySubMenuSlug(submenu));
    }

    function EditableControls() {
        const {
          isEditing,
          getSubmitButtonProps,
          getCancelButtonProps,
          getEditButtonProps,
        } = useEditableControls()
        
        setEditing(isEditing);

        return isEditing ? (
          <ButtonGroup justifyContent='center' size='sm'>
            <IconButton className={'end-edit'} aria-label={''} icon={<CheckIcon />} {...getSubmitButtonProps()} />
            <IconButton className={'end-edit'} aria-label={''} icon={<CloseIcon />} {...getCancelButtonProps()} />
          </ButtonGroup>
        ) : (
          <Flex justifyContent='center'>
            <IconButton aria-label={''} size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
          </Flex>
        )
    }
    
    async function onBlur() {
        console.log("OLAAAAAAAAAAA");
        await updatePage(content.id, content.title, content.content);
        loadPages();
    }

    useEffect(()=>{
        loadPages();
    }, [router.isReady]);

    return (
        <>
            <VStack m={'auto'} w={'75%'} mt={4}>
                <Navbar />
                <VStack py={10} w={'75%'} minH={'75vh'}>
                    {pages.map((page, i)=>(
                        <Box key={i} w={'full'}>
                            <Heading mb={4}>{page.title}</Heading>
                            {!editing ? <p dangerouslySetInnerHTML={{__html: page.content}}></p> : <></>}
                            <Editable
                                w={'full'}
                                textAlign='left'
                                defaultValue={`${page.content}`}
                                fontSize='2xl'
                                isPreviewFocusable={false}
                            >
                                <Textarea   
                                    onBlur={onBlur} 
                                    onChange={({target}) => setContent({
                                        id: pages[i].id,
                                        title: pages[i].title,
                                        content: target.value
                                    })}
                                    value={content.content}                                
                                    as={EditableTextarea} />
                                <EditableControls />
                            </Editable>
                        </Box>
                    ))}
                </VStack>
            </VStack>
            <Footer />       
        </>
    );
}