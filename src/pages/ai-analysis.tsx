import React from 'react';
import {
    Container,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    Box
} from '@chakra-ui/react';
import { FoodAnalysis } from '../components/FoodAnalysis';
import { RestaurantRecommendations } from '../components/RestaurantRecommendations';

const AIAnalysisPage = () => {
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
            </VStack>
        </Container>
    );
};

export default AIAnalysisPage; 