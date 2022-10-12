import Link from "next/link";
import Image from "next/image";
import {Flex} from "@chakra-ui/react"


const Navbar = () => {
    return ( 
        <nav>
            <Flex flexDirection={"column"} justifyContent={"space-between"} >
                <Flex mt={5} justify={"center"} alignContent={"center"}>
                <Link href="/">
                    <a>
                        <Image src="/imperium.png" width={77} height={77}/>
                    </a>
                </Link>
                </Flex>
                <Flex flexDirection={"row"} justifyContent={"space-between"} m={5}>
                    <Link href="/maintenance-calories-calculator"><a>Step 1: Calculate Maintenance Calories</a></Link>
                    <Link href="/"><a>Step 2: Set Rate of Progression</a></Link>
                    <Link href="/"><a>Step 3: Calculate Intake Recommendation</a></Link>
                    <Link href="/"><a>Step 4: Calculate Refeed Intake</a></Link>
                    <Link href="/"><a>Troubleshooting Nutrition Targets</a></Link>
                </Flex>
            </Flex>
        </nav>

    );
}
 
export default Navbar;