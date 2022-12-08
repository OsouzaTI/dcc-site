import { LinkIcon } from "@chakra-ui/icons";
import { HStack, Link, Text, VStack } from "@chakra-ui/react";

const fakeLinks = [
    {title: 'Link A', href: '#'},
    {title: 'Link B', href: '#'},
    {title: 'Link C', href: '#'},
];

export default function Links() {

    return (
        <VStack>
            <Text fontWeight={'bold'} fontSize={'md'}>Links úteis</Text>
            {fakeLinks.map(({title, href}, i) => {
                return (
                    <HStack key={i}>
                        <LinkIcon />
                        <Link href={href}>{title}</Link>
                    </HStack>
                );
            })}
        </VStack>
    );

}