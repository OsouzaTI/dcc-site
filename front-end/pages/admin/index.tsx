import { Text } from "@chakra-ui/react";
import { getCookie, hasCookie } from 'cookies-next';
import Router from "next/router";

export default function Admin() {
    
    let ca = getCookie('token');
    console.log(ca);    

    return <Text>OOOPPPA ADEMIRO</Text>;
}

export async function getStaticProps() {

    if(!hasCookie('token')) {
        return {
            redirect: {
              destination: "/auth/login",
            },
        }
    }

    return {
      props: {},
    }

}
  