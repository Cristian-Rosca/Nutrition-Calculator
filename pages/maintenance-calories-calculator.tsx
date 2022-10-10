import Navbar from "../components/Navbar";
import Head from "next/head";
import {Flex , Heading, Input} from "@chakra-ui/react"

const MaintenanceCaloriesCalculator = () => {
    return ( 
        <>
        <Head>
            <title>Nutrition Tool | Maintenance Calorie Calculator</title>
            <meta />
        </Head>
        <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Flex direction={"column"} p={10} rounded={6} position={"relative"} background={"blackAlpha.100"} alignItems={"center"}>
            <Heading mb={"5"}>Calculate Your Maintenance Calories</Heading>
            <Input placeholder="Body Weight" width={"50%"} margin={"3"} variant={"outlined"}></Input>
            <Input placeholder="Height in cm" width={"50%"} margin={"3"} variant={"outlined"}></Input>
            <Input placeholder="Age" width={"50%"} margin={"3"} variant={"outlined"}></Input>
            <Input placeholder="Sex" width={"50%"} margin={"3"} variant={"outlined"}></Input>
            <Input placeholder="Physical Activity Level" width={"50%"} margin={"3"} variant={"outlined"}></Input>
        </Flex>
        
        </Flex>
        </>
     );
}
 
export default MaintenanceCaloriesCalculator;