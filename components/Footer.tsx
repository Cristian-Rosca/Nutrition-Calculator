import {Box} from "@chakra-ui/react"

const Footer = () => {
    return ( 
        <Box display={"flex"} justifyContent={"flex-start"} color={"white"} alignItems={"end"} m={5}>
        {new Date().getFullYear()} Imperium Coaching&trade;. All Rights Reserved.
        </Box>
     );
}
 
export default Footer;