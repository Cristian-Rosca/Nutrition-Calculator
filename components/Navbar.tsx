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
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons'


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
                            boxSize={"4rem"}
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                        />
                        <MenuList>
                            <MenuItem icon={<AddIcon />} command='⌘T'>
                                New Tab
                            </MenuItem>
                            <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                                New Window
                            </MenuItem>
                            <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                                Open Closed Tab
                            </MenuItem>
                            <MenuItem icon={<EditIcon />} command='⌘O'>
                                Open File...
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>

            </Box>
        </nav>

    );
}

export default Navbar;