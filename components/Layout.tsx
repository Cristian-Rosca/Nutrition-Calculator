import { AppProps } from "next/app";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {ReactNode} from 'react'

interface Props {
    children?: ReactNode
    
}


const Layout = ({ children } : Props ) => {
    return ( 
        <div>
            <Navbar/>
                {children}
            <Footer/>
        </div>
     );
}
 
export default Layout;