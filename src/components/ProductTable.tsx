"use client"
import { Text,   Button, Container, Flex, Icon, Input, InputGroup, InputLeftAddon, Stack, Tfoot, FormControl, FormLabel, HStack, IconButton, Grid, GridItem, ToastMethods, ToastOptions } from "@chakra-ui/react";
import { FaPen, FaTrash, FaSave } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdAddShoppingCart } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import React, { ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from '@chakra-ui/react'
import { searchProduct } from "@/app/actions";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";


interface TableRowProps {
  product: any;
  toast: any
  deleteAction: () => void;
  updateAction: (id: string, formState: any) => void;
}

interface ProductTableProps {
  data: any
  deleteAction: (id: string) => void;
  updateAction: (id: string, formState: any) => void;
};


const TableRow: React.FC<TableRowProps> = ({ product, deleteAction, updateAction }) => {
  const [isEditing, setIsEditing] = React.useState(false)

  const [formState, setFormState] = React.useState({
    name: product.name,
    category: product.category,
    option: product.option,
    price: product.price,
    cost: product.cost,
    quantity: product.quantity,
  })

  const handleEditAndCancelClick = () => {
    setIsEditing(!isEditing)
  }

  const onFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleUpdateAction = (updateAction: any) => {
    updateAction(product.id, formState)
    setIsEditing(!isEditing)
  } 


  return (
    <Grid 
      py={5} 
      px={1} 
      gap={2}
      borderBottomWidth={1}
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(1, 1fr)",
        md: "repeat(7, 1fr)",
        lg: "repeat(7, 1fr)",
      }} 
      justifyContent={{sm: "center"}}
      alignItems={{sm: "center"}}
      transition="ease-in-out 300ms"
      _hover={{backgroundColor: "teal.200", cursor: "pointer"}}
    >
      <GridItem w="100%">
        {isEditing ? (
          <FormControl>
            <FormLabel fontSize="small">Name</FormLabel>
            <Input 
              type='text' 
              name="name" 
              value={formState.name}
              onChange={onFormInputChange}
            />
          </FormControl>
        ) : (
          <Text textAlign={{base: "center", md: "left"}}>{product.name}</Text>
        )}
      </GridItem>
      
      <GridItem w="100%" display={{base: "none", sm: "none", md: "block"}}>
        {isEditing ? (
          <FormControl>
            <FormLabel fontSize="small">Category</FormLabel>
            <Input
              type='text' 
              name="category" 
              value={formState.category}
              onChange={onFormInputChange}
            />
          </FormControl>
        ) : (
          <Text as="p" textAlign="left">{product.category}</Text>
        )}
      </GridItem>
      
      <GridItem w="100%">
        {isEditing ? (
          <FormControl>
            <FormLabel fontSize="small">Option</FormLabel>
            <Input 
              type='text' 
              name="option" 
              value={formState.option}
              onChange={onFormInputChange}
            />
          </FormControl>
        ) : (
          <Text as="p" textAlign="left" display={{base: "none", sm: "none", md: "block"}}>{product.option}</Text>
        )}
      </GridItem>
      
      <GridItem w="100%">
        {isEditing ? (
          <FormControl>
            <FormLabel fontSize="small">Price</FormLabel>
            <Input 
              type='text' 
              name="price" 
              value={formState.price}
              onChange={onFormInputChange}
            />
          </FormControl>
        ) : (
          <Text as="p" textAlign="left" display={{base: "none", sm: "none", md: "block"}}>{Number(product.price).toFixed(2)}</Text>
        )}
      </GridItem>
      
      <GridItem w="100%">
        {isEditing ? (
          <FormControl>
            <FormLabel fontSize="small">Cost</FormLabel>
            <Input 
              type='text' 
              name="cost" 
              value={formState.cost}
              onChange={onFormInputChange}
            />
          </FormControl>
        ) : (
          <Text as="p" textAlign="left" display={{base: "none", sm: "none", md: "block"}}>{Number(product.cost).toFixed(2)}</Text>
        )}
      </GridItem>
      
      <GridItem w="100%">
        {isEditing ? (
          <FormControl>
            <FormLabel fontSize="small">Quantity</FormLabel>
            <Input 
              type='text' 
              name="quantity" 
              value={formState.quantity}
              onChange={onFormInputChange}
            />
          </FormControl>
        ) : (
          <Text as="p" textAlign="left" display={{base: "none", sm: "none", md: "block"}}>{product.quantity}</Text>
        )}
      </GridItem>
      
      <GridItem w="100%">
        {isEditing ? (
          <HStack gap={5} alignItems="center" justifyContent={{base: "center", sm: "center", md: "left"}}>
            <IconButton 
              icon={<FaSave />} 
              padding={2}
              size="sm"
              aria-label="update"
              color="blue" 
              onClick={() => handleUpdateAction(updateAction)}
            />
            <IconButton 
              icon={<IoIosCloseCircle />} 
              padding={2}
              size="sm"
              aria-label="cancel" 
              color="red"
              onClick={handleEditAndCancelClick}
            />
            
          </HStack>
        ) : (
          <HStack gap={5} alignItems="center" justifyContent={{base: "center", sm: "center", md: "left"}}>
            <IconButton 
              icon={<FaPen />} 
              padding={2}
              size="sm"
              aria-label="edit"
              color="blue" 
              onClick={handleEditAndCancelClick}
            />
            <IconButton 
              icon={<FaTrash />} 
              padding={2}
              size="sm"
              aria-label="Delete" 
              color="red"
              onClick={deleteAction}
            />
          </HStack>
        )}
      </GridItem>

    </Grid>
  )
}

const ProductTable:React.FC<ProductTableProps> = ({data, updateAction, deleteAction}) => {
  const router = useRouter()
  const toast = useToast()
  const [tableData, setTableData] = React.useState<any[]>([])
  const handleTableRowClick = () => {}

  const handleDeleteAction = (product: any) => {
    const tableDataCopy = tableData.slice();
    setTableData(tableDataCopy.filter((item: any) => item.id !== product.id))
    deleteAction(product.id)

    toast({
      title: "Product Deleted",
      description: `You deleted one product`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const handleUpdateAction = (id: any,  formState: any) => {
    const updatedTableData = tableData.map((item: any) => {
      if (item.id === id) {
        return { ...item, ...formState };
      }
      return item;
    });
    setTableData(updatedTableData);
    updateAction(id, formState)
    toast({
      title: "Product Updated",
      description: `${formState.name} successfuly updated!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const handleSearchInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const products = await searchProduct(value)
    setTableData(products)
  }

  useEffect(() => {
    const collectionRef = collection(db, 'products');

    async function createQuery(){
      const orderedQuery = query(collectionRef, orderBy("createdAt", "desc"));
      return await getDocs(orderedQuery);
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      if(!snapshot.empty) {
        let products: any[] = [];
        snapshot.forEach((doc) => {
          products.push({...doc.data(), id: doc.id});
          products.sort((a: any, b: any) => a.createdAt - b.createdAt)
        })
        setTableData([...products]);
        return;
      }
      setTableData([]);
    });

    return () => unsubscribe();
  }, [])

  return (
    <Container overflow="hidden" border={0}>
      <Container border={0}>
        <Stack gap={5} >
          <Flex justifyContent="space-between" alignItems="center">
            <Text as="strong">Product List</Text>
            <Button leftIcon={<Icon as={MdAddShoppingCart} />} onClick={() => router.push("/products/new")}>Add Product</Button>
          </Flex>
          <InputGroup w={300}>
            <InputLeftAddon>
              <FaMagnifyingGlass />
            </InputLeftAddon>
            <Input type='text' placeholder='Product name' outline="none" _focus={{outline: "none", border: "none"}} onChange={handleSearchInputChange}/>
          </InputGroup>
        </Stack>
      </Container>

      <Container maxW="100%" border={0} >
        <Container maxW="100%" border={0} p={0} overflow="hidden">
          {/* <TableCaption placement="top">Creat, Read, Update, Delete</TableCaption> */}
          <Grid templateColumns='repeat(7, 1fr)' display={{base: "none", sm: "none", md: "grid"}}>
            <GridItem width="100%">
              <Text as="strong" textAlign="center" fontSize={{base: "smaller", md: "medium"}}>Name</Text>
            </GridItem>
            <GridItem width="100%">
              <Text as="strong" textAlign="center" fontSize={{base: "smaller", md: "medium"}}>Category</Text>
            </GridItem>
            <GridItem width="100%">
              <Text as="strong" textAlign="center" fontSize={{base: "smaller", md: "medium"}}>Options</Text>
            </GridItem>
            <GridItem width="100%">
              <Text as="strong" textAlign="center" fontSize={{base: "smaller", md: "medium"}}>Price</Text>
            </GridItem>
            <GridItem width="100%">
              <Text as="strong" textAlign="center" fontSize={{base: "smaller", md: "medium"}}>Cost</Text>
            </GridItem>
            <GridItem width="100%">
              <Text as="strong" textAlign="center" fontSize={{base: "smaller", md: "medium"}}>Quantity</Text>
            </GridItem>
            <GridItem width="100%">
              <Text as="strong" textAlign="center" fontSize={{base: "smaller", md: "medium"}}>Actions</Text>
            </GridItem>
          </Grid>
          <Container border={0} padding={0} overflow="hidden">
            <Flex flexDirection="column" gap={2} overflow="hidden">
              {tableData.map((product: any) => (
                <TableRow 
                  key={product.id} 
                  product={product}
                  toast={toast}
                  updateAction={handleUpdateAction}
                  deleteAction={() => handleDeleteAction(product)}
                />
              ))}
            </Flex>
          </Container>
          {/* <Tfoot>
            <Tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Options</Th>
              <Th textAlign="center">Price</Th>
              <Th textAlign="center">Cost</Th>
              <Th textAlign="center">Quantity</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Tfoot> */}
        </Container>
      </Container>
    </Container>
  )
};

export default ProductTable;