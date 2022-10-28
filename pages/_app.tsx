import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { ChakraProvider, color, extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { StepsStyleConfig } from 'chakra-ui-steps';

interface Props {
  x: string
  colorScheme: string;
  colorMode: "dark" | "light";
  orientation: "horizontal" | "vertical" | undefined;
  theme: { [key: string]: any; };
}

const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: (props: Props) => {
    return {
      ...StepsStyleConfig.baseStyle(props),
      label: {
        ...StepsStyleConfig.baseStyle(props).label,
        // your custom styles here
        color: 'white',
      },
      iconLabel: {
        ...StepsStyleConfig.baseStyle(props).iconLabel,
        // your custom styles here
        color: 'black',
      },
    };
  },
};

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#19191c",
        
      }
    })
  },
  components: {
    Steps: CustomSteps
  },
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
       </Layout>
    </ChakraProvider>
  )
}

export default MyApp
