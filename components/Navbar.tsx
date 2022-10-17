import Link from "next/link";
import Image from "next/image";
import {Box} from "@chakra-ui/react"
import brandLogo from "../public/imperium.png"


const Navbar = () => {
    return ( 
        <nav>
            <Box display={"flex"}flexDirection={"column"} justifyContent={"space-between"} >
                <Box display={"flex"} mt={5} mb={5}justifyContent={"center"}>
                <Link href="/">
                    <a>
                        <Image src={brandLogo} height={"90px"} width={"90px"}/>
                    </a>
                </Link>
                </Box>
                <Box display={"flex"} color={"white"} as='b'flexDirection={"row"} justifyContent={"space-around"}>
                    <Link href="/maintenance-calories-calculator"><a>Step 1: Calculate Maintenance Calories</a></Link>
                    <Link href="/daily-calorie-calculator"><a>Step 2: Calculate Daily Calories</a></Link>
                    <Link href="/macro-calculator"><a>Step 3: Calculate Daily Macros</a></Link>
                    <Link href="/"><a>Step 4: Calculate Refeed Intake</a></Link>
                    <Link href="/"><a>Troubleshooting Nutrition Targets</a></Link>
                </Box>
            </Box>
        </nav>

    );
}
 
export default Navbar;