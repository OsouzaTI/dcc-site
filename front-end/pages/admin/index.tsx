import { Text } from "@chakra-ui/react";
import { getCookie, hasCookie } from 'cookies-next';
import Router from "next/router";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import type { NextApiRequest, NextApiResponse } from 'next'
import GridLayout from "../../components/Dashboard/GridLayout";

export default function Admin() {
  return (
    <GridLayout>
      <Text>OOOPPPA ADEMIRO</Text>
    </GridLayout>
  );
}

export function getServerSideProps(context : any)
{
  let token = getCookie('token', context);
  if(!token) {
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