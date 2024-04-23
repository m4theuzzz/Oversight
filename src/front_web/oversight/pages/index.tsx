import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";


const Home: NextPage = () => {
  const router = useRouter();

  useEffect(()=>{
    router.replace('/budgets')
  },[])
  return <></>
};

export default Home;
