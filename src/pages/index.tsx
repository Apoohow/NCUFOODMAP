import React from 'react';
import {
    Container,
    VStack,
    Heading,
    Text,
    Button,
    Box,
    SimpleGrid,
    Icon,
    useColorModeValue,
    Link as ChakraLink,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { FaUtensils, FaMapMarkedAlt, FaRobot, FaSearch } from 'react-icons/fa';
import NextLink from 'next/link';

const HomePage = () => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const features = [
        {
            icon: FaUtensils,
            title: '美食打卡',
            description: '記錄並分享您的美食體驗',
            link: '/food-posts'
        },
        {
            icon: FaRobot,
            title: 'AI 分析',
            description: '智能分析營養成分並提供健康建議',
            link: '/ai-analysis'
        },
        {
            icon: FaMapMarkedAlt,
            title: '地圖探索',
            description: '探索校園周邊的美食地圖',
            link: '/map'
        }
    ];

    return (
        <Box bg="orange.50" minH="100vh">
            <Container maxW="container.xl" py={10}>
                <VStack spacing={10}>
                    <Box textAlign="center" w="full" py={10}>
                        <Heading
                            as="h1"
                            size="2xl"
                            bgGradient="linear(to-r, primary.400, primary.600)"
                            backgroundClip="text"
                            mb={4}
                        >
                            中大美食地圖
                        </Heading>
                        <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
                            探索、分享、記錄您在中央大學周邊的美食體驗
                        </Text>

                        <InputGroup maxW="600px" mx="auto" mt={8}>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={FaSearch} color="primary.500" />
                            </InputLeftElement>
                            <Input
                                placeholder="輸入想找的美食..."
                                bg="white"
                                borderColor="primary.200"
                                _hover={{ borderColor: 'primary.300' }}
                                _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }}
                            />
                        </InputGroup>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="100%">
                        {features.map((feature, index) => (
                            <NextLink href={feature.link} key={index}>
                                <Box
                                    p={6}
                                    bg={bgColor}
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                    borderRadius="lg"
                                    textAlign="center"
                                    transition="all 0.2s"
                                    _hover={{
                                        transform: 'translateY(-4px)',
                                        shadow: 'lg',
                                        borderColor: 'primary.200',
                                    }}
                                >
                                    <Icon
                                        as={feature.icon}
                                        w={10}
                                        h={10}
                                        color="primary.500"
                                        mb={4}
                                    />
                                    <Heading size="md" mb={2} color="primary.700">
                                        {feature.title}
                                    </Heading>
                                    <Text color="gray.600">
                                        {feature.description}
                                    </Text>
                                </Box>
                            </NextLink>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
};

export default HomePage; 