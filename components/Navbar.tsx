import Link from "next/link";
import Image from "next/image";
import { Box, IconButton } from "@chakra-ui/react"
import brandLogo from "../public/imperium.png"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'


const Navbar = () => {
    return (
        <nav>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Box display={"flex"} my={"2rem"} ml={"2rem"} >
                    <Link href="/">
                        <a>
                            <Image src={brandLogo} height={"90px"} width={"90px"} />
                        </a>
                    </Link>
                </Box>
                <Box display={"flex"} my={"2rem"} mr={"2rem"} >
                    <Menu>
                        <MenuButton
                            color={"white"}
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                            border={0}
                            fontSize={40}
                            boxSize={"3rem"}
                        />
                        <MenuList>
                            <NextLink href="/" passHref>
                                <MenuItem as="a">Home</MenuItem>
                            </NextLink>
                            <NextLink href="/maintenance-calories-calculator" passHref>
                                <MenuItem as="a">Maintenance Calculator</MenuItem>
                            </NextLink>
                            <NextLink href="/daily-calorie-calculator" passHref>
                                <MenuItem as="a">Daily Calorie Target</MenuItem>
                            </NextLink>
                            <NextLink href="/macro-calculator" passHref>
                                <MenuItem as="a">Macro Calculator</MenuItem>
                            </NextLink>
                        </MenuList>
                    </Menu>
                </Box>

            </Box>
        </nav>

    );
}

export default Navbar;