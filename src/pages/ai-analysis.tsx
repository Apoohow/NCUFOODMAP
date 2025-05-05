import { useState, useEffect } from 'react';
import {
    Container,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    Box,
    Heading,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    useColorModeValue
} from '@chakra-ui/react';
import { FoodAnalysis } from '../components/FoodAnalysis';
import { RestaurantRecommendations } from '../components/RestaurantRecommendations';

interface Analysis {
    totalRestaurants: number;
    categories: Record<string, number>;
    averageRating: number;
    priceDistribution: Record<string, number>;
    popularHours: Record<string, number>;
    locationClusters: any[];
}

const AIAnalysisPage = () => {
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [error, setError] = useState<string | null>(null);
    const bgColor = useColorModeValue('white', 'gray.700');

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const response = await fetch('/api/restaurants/analysis');
                const data = await response.json();
                
                if (data.error) {
                    setError(data.error);
                } else {
                    setAnalysis(data);
                }
            } catch (err) {
                setError('獲取分析數據失敗');
                console.error('Error fetching analysis:', err);
            }
        };

        fetchAnalysis();
    }, []);

    if (error) {
        return (
            <Container maxW="container.xl" py={10}>
                <Text color="red.500">{error}</Text>
            </Container>
        );
    }

    if (!analysis) {
        return (
            <Container maxW="container.xl" py={10}>
                <Text>載入中...</Text>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl" py={8}>
            <VStack spacing={8}>
                <Box textAlign="center">
                    <Text fontSize="3xl" fontWeight="bold" color="primary.600" mb={2}>
                        中大美食 AI 助手
                    </Text>
                    <Text color="gray.600">
                        智能分析您的美食體驗，提供健康建議和個人化推薦
                    </Text>
                </Box>

                <Tabs variant="enclosed" colorScheme="primary" width="100%">
                    <TabList>
                        <Tab>美食營養分析</Tab>
                        <Tab>餐廳智能推薦</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <FoodAnalysis />
                        </TabPanel>
                        <TabPanel>
                            <RestaurantRecommendations />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Heading as="h1" size="xl" mb={6}>
                    餐廳數據分析
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="md">
                        <Stat>
                            <StatLabel>總餐廳數量</StatLabel>
                            <StatNumber>{analysis.totalRestaurants}</StatNumber>
                        </Stat>
                    </Box>

                    <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="md">
                        <Stat>
                            <StatLabel>平均評分</StatLabel>
                            <StatNumber>{analysis.averageRating.toFixed(1)}</StatNumber>
                            <StatHelpText>滿分 5 分</StatHelpText>
                        </Stat>
                    </Box>

                    <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="md">
                        <Heading size="md" mb={4}>類別分布</Heading>
                        {Object.entries(analysis.categories).map(([category, count]) => (
                            <Text key={category}>
                                {category}: {count} 間
                            </Text>
                        ))}
                    </Box>

                    <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="md">
                        <Heading size="md" mb={4}>價格分布</Heading>
                        {Object.entries(analysis.priceDistribution).map(([price, count]) => (
                            <Text key={price}>
                                {price}: {count} 間
                            </Text>
                        ))}
                    </Box>
                </SimpleGrid>
            </VStack>
        </Container>
    );
};

export default AIAnalysisPage; 