import { Container } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default function Home() {

  redirect("/products")

  return (
    <Container maxW ="100%" h="100%" padding={0} margin={0} >
      HOME
   </Container>
  );
}
