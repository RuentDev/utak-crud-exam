"use client"

import { ChakraProvider } from "@chakra-ui/react";
import React  from "react";
import theme from '@/chakra/theme'

interface CharkaUIProviderProps {
  children: React.ReactNode
};

const ChakraUIProvider:React.FC<CharkaUIProviderProps> = ({children}) => {
  return(
    <>
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider> 
    </>
  )
};

export default ChakraUIProvider;