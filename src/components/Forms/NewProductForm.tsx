"use client"
import { Button, Container, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

interface NewProductFormProps {
  // onSubmit: () => void
};

const NewProductForm:React.FC<NewProductFormProps> = ({}) => {
  const router = useRouter()
  return (
   <Container display="flex" flexDirection="column" gap={5} border={0}>
    <Container border={0} padding={0}>
      <Flex>
        <Text as="strong">New Product</Text>
      </Flex>
    </Container>
    <FormControl>
      <FormLabel size="small">Name</FormLabel>
      <Input type='text' name="name" isRequired/>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
    <FormControl>
      <FormLabel size="small">Category</FormLabel>
      <Input type='text' name="category" isRequired/>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
    <FormControl>
      <FormLabel size="small">Options</FormLabel>
      <Input type='text' name="option" isRequired/>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
    <FormControl>
      <FormLabel size="small">Price</FormLabel>
      <Input type="number" name="price" isRequired/>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
    <FormControl>
      <FormLabel size="small">Cost</FormLabel>
      <Input type='number' name="cost" isRequired/>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
    <FormControl>
      <FormLabel size="small">Quantity</FormLabel>
      <Input type='number' name="quantity" isRequired/>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
    <Button 
      type="submit"
    >
      Save
    </Button>
    <Button 
      backgroundColor="red.500" 
      color="white"
      onClick={() => router.push("/products")}
    >
      Cancel
    </Button>
  </Container>
  )
};

export default NewProductForm;