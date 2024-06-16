import { addProduct } from "@/app/actions";
import { Container } from "@chakra-ui/react";
import Components from "@/components";
import React from "react";

const Product = () => {
  return(
     <Container
      maxW="100%"
      height="100%"
      border={0}
    >
      
      <form action={addProduct}>
        <Components.Forms.NewProductForm />
      </form>
   </Container>
  )
};

export default Product;