import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        primary: {
            50: '#FFF8E1',
            100: '#FFECB3',
            200: '#FFE082',
            300: '#FFD54F',
            400: '#FFCA28',
            500: '#FFC107', // 主要橙色（更柔和）
            600: '#FFB300',
            700: '#FFA000',
            800: '#FF8F00',
            900: '#FF6F00',
        },
    },
    fonts: {
        heading: '"Noto Sans TC", sans-serif',
        body: '"Noto Sans TC", sans-serif'
    },
    components: {
        Button: {
            defaultProps: {
                colorScheme: 'primary'
            },
            variants: {
                solid: {
                    bg: 'primary.400',
                    color: 'gray.800',
                    _hover: {
                        bg: 'primary.500',
                    },
                },
                outline: {
                    borderColor: 'primary.400',
                    color: 'primary.600',
                    _hover: {
                        bg: 'primary.50',
                    },
                },
            },
        },
        Card: {
            baseStyle: {
                container: {
                    backgroundColor: 'white',
                    borderRadius: 'lg',
                    boxShadow: 'sm',
                    borderColor: 'primary.100',
                }
            }
        },
        Heading: {
            baseStyle: {
                color: 'gray.700'
            }
        },
        Tabs: {
            variants: {
                enclosed: {
                    tab: {
                        _selected: {
                            color: 'primary.600',
                            borderColor: 'primary.200',
                            borderBottomColor: 'transparent',
                        },
                    },
                },
            },
        },
    },
    styles: {
        global: {
            body: {
                bg: 'orange.50',
                color: 'gray.700'
            }
        }
    }
});

export default theme; 