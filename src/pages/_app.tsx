import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Head>
                <title>中大美食地圖</title>
                <meta name="description" content="探索、分享、記錄您在中央大學周邊的美食體驗" />
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp; 