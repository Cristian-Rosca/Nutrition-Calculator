import {Box} from "@chakra-ui/react"

const Footer = () => {
    return ( 
        <Box display={"flex"} justifyContent={"flex-start"} color={"white"} alignItems={"flex-end"} m={"2rem"} bottom={0} >
            {new Date().getFullYear()} Imperium Coaching&trade;. All Rights Reserved.
        </Box> 
     );
}
 
export default Footer;