"use client"
import { Button, Center, Container, Icon, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import { FaBasketShopping , FaCartShopping, FaDollarSign, FaCommentDollar} from "react-icons/fa6";
import React from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {};

const sidebarOptions = [
  {
    id: 0,
    label: "Products",
    isActive: false,
    options: [
      {
        id: 0,
        label: "Add products",
        link: "/products/new"
      },
      {
        id: 1,
        label: "All products",
        link: "/products"
      },
    ],
    link: "/",
    icon: FaBasketShopping
  },
  {
    id: 1,
    label: "Categories",
    isActive: false,
    options: [],
    link: "/",
    icon: undefined
  },
  {
    id: 2,
    label: "Orders",
    isActive: false,
    options: [],
    link: "/",
    icon: FaCartShopping
  },
  {
    id: 3,
    label: "Sales",
    isActive: false,
    options: [],
    link: "/",
    icon: FaDollarSign
  },
  {
    id: 4,
    label: "Discounts",
    isActive: false,
    options: [],
    link: "/",
    icon: FaCommentDollar
  },
]

const Sidebar:React.FC<SidebarProps> = ({}) => {
  const [menuOptions, setMenuOptions] = React.useState(sidebarOptions)
  const router = useRouter()

  const handleMenuClick = (id: number) => {
    
    const menuCopy = menuOptions.slice()

    menuCopy.forEach(menu => {
      if(menu.id === id){
        menu.isActive = !menu.isActive
      }
    })

    setMenuOptions(menuCopy)


    

  }

  const handleSubMenuClick = (link: string) => {
    router.push(link)
  }

  return (
    <Container width={300} padding={0}>
      <Container
        width="100%"
        height={70}
        border={0}
      >
        <Center w="100%" height="100%">
          UTAK CRUD TEST
        </Center>
      </Container>

      <Container
        padding={0}
        margin={0}
        border={0}
      >
        <UnorderedList
          margin={0}
          spacing={0}  
          listStyleType="none"
        >
          {sidebarOptions.map((menu) => (
            <ListItem 
              m={0} 
              key={menu.id} 
              cursor="pointer"
              userSelect="none"
            >
              <Button 
                w="100%"
                p={5}
                variant='solid'
                justifyContent="start"
                borderRadius={0}
                leftIcon={<Icon as={menu.icon} />} 
                onClick={() => handleMenuClick(menu.id)}
                backgroundColor="transparent" 
                _hover={{  backgroundColor: "teal.200", border: "none" }}
                transition="ease-in-out 400ms"
              >
                {menu.label}
              </Button>
              <UnorderedList  
                overflow="hidden" 
                listStyleType="none" 
                height={menu.isActive ? "auto" : 0}
                margin={0}
              >
                {menu.options.map((subMenu) => (
                  <ListItem 
                    px={10}
                    py={1}
                    key={subMenu.id}
                    transition="ease-in-out 400ms"
                    _hover={{  backgroundColor: "teal.200", border: "none" }}
                    onClick={() => handleSubMenuClick(subMenu.link)}
                  >
                    <Text as="p" fontSize="small">{subMenu.label}</Text>
                  </ListItem>
                ))}
              </UnorderedList>
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
    </Container>
  )
};

export default Sidebar;