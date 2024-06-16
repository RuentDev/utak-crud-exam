import Components from '@/components'
import { Container } from "@chakra-ui/react";
import { getProducts, deleteProduct, updateProduct } from "../actions";
import React from "react";


const Products = async () => {
  
  // JUST WANT YOU TO KNOW PROPS DRILLING IS NOT RECOMMENDABLE
  const products = await getProducts()

  return (
    <Container 
      maxW="100%"
      height="100%"
      border={0}
      padding={0}
    >

    {/* TABLE */}
    <Components.ProductTable 
      data={products} 
      deleteAction={deleteProduct}
      updateAction={updateProduct}
    />
   </Container>
  );
};

export default Products;