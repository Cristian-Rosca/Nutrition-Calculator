import {Box} from "@chakra-ui/react"

const Footer = () => {
    return ( 
        <Box display={"flex"} position={"relative"} justifyContent={"flex-start"} color={"white"} alignItems={"end"} >
            {new Date().getFullYear()} Imperium Coaching&trade;. All Rights Reserved.
        </Box>
     );
}
 
export default Footer;