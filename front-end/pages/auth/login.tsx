import { Button, FormControl, FormLabel, HStack, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCookie } from 'cookies-next';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function adminLogin() {
        console.log(`tentando logar com ${email} - ${password}`);
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if(response.status == 200) {
            const data = await response.json();
            setCookie('token', data['token'], {sameSite: true});
            console.log('token salvo!!');
            router.push('/admin');
        } else {
            console.log('erro status: ' + response.status);
        }

    }

    return (
        <VStack pt={'20vh'} m={'auto'} w={'md'}>
            <FormControl as='fieldset'>
                <FormLabel fontSize={'md'} fontWeight={'bold'}>Email</FormLabel>
                <Input border={'2px'} borderColor={'gray.300'} value={email} onChange={({target})=>setEmail(target.value)} type={'text'} />
            </FormControl>
            <FormControl as='fieldset'>
                <FormLabel fontSize={'md'} fontWeight={'bold'}>Passwrod</FormLabel>
                <Input border={'2px'} borderColor={'gray.300'} value={password} onChange={({target})=>setPassword(target.value)} type={'password'} />
            </FormControl>
            <Button onClick={adminLogin}>Entrar</Button>
        </VStack>
    );

}