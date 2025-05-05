import React, { useState } from 'react';
import {
    Box,
    Button,
    Textarea,
    VStack,
    Text,
    Tag,
    CircularProgress,
    CircularProgressLabel,
    Grid,
    Stat,
    StatLabel,
    StatNumber,
    Divider,
    List,
    ListItem,
    ListIcon,
    useToast,
    Heading,
    HStack,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { analyzeFood, AIAnalysisResponse } from '../services/ai';
import { NutritionChart } from './NutritionChart';

export const FoodAnalysis: React.FC = () => {
    const [description, setDescription] = useState('');
    const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const toast = useToast();

    const handleAnalysis = async () => {
        if (!description.trim()) {
            setError('請輸入美食描述');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await analyzeFood(description);
            setAnalysis(result);
            toast({
                title: '分析完成',
                description: '已成功分析您的美食描述',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            setError('分析過程發生錯誤，請稍後再試');
            toast({
                title: '分析失敗',
                description: '無法完成美食分析，請稍後重試',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={6} bg="white" borderRadius="lg" shadow="md" maxW="900px" mx="auto">
            <VStack spacing={6} align="stretch">
                <Heading size="lg" color="primary.700" mb={4}>
                    美食營養分析
                </Heading>

                <Box>
                    <Text mb={2} fontWeight="medium" color="primary.700">
                        請描述您的美食
                    </Text>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="例如：一碗滷肉飯，配上半熟蛋和青菜..."
                        size="lg"
                        minH="150px"
                        bg="white"
                        borderColor="primary.200"
                        _hover={{ borderColor: 'primary.300' }}
                        _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }}
                    />
                    {error && (
                        <Text color="red.500" mt={2} fontSize="sm">
                            {error}
                        </Text>
                    )}
                </Box>

                <Button
                    onClick={handleAnalysis}
                    isLoading={loading}
                    loadingText="分析中..."
                    size="lg"
                    colorScheme="primary"
                    _hover={{ bg: 'primary.600' }}
                >
                    開始分析
                </Button>

                {analysis && (
                    <VStack spacing={8} align="stretch" mt={6}>
                        <Box bg="primary.50" p={6} borderRadius="lg">
                            <HStack spacing={6} align="flex-start">
                                <VStack flex="1" align="stretch">
                                    <Text fontSize="lg" fontWeight="bold" color="primary.700" mb={4}>
                                        AI 推薦建議
                                    </Text>
                                    <Text color="gray.700">{analysis.recommendation}</Text>
                                </VStack>
                                <Box>
                                    <VStack>
                                        <Text fontSize="lg" fontWeight="bold" color="primary.700">健康評分</Text>
                                        <CircularProgress
                                            value={analysis.healthScore}
                                            color="primary.500"
                                            size="100px"
                                            thickness="8px"
                                        >
                                            <CircularProgressLabel fontSize="2xl" fontWeight="bold">
                                                {analysis.healthScore}
                                            </CircularProgressLabel>
                                        </CircularProgress>
                                    </VStack>
                                </Box>
                            </HStack>
                        </Box>

                        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="primary.100">
                            <Text fontSize="lg" fontWeight="bold" color="primary.700" mb={4}>
                                營養成分
                            </Text>
                            <NutritionChart nutritionInfo={analysis.nutritionInfo} />
                        </Box>

                        <Divider />

                        <Box>
                            <Text fontSize="lg" fontWeight="bold" color="primary.700" mb={4}>
                                食物標籤
                            </Text>
                            <Box>
                                {analysis.tags.map((tag, index) => (
                                    <Tag
                                        key={index}
                                        size="lg"
                                        variant="subtle"
                                        colorScheme="primary"
                                        m={1}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </Box>
                        </Box>

                        <Box>
                            <Text fontSize="lg" fontWeight="bold" color="primary.700" mb={4}>
                                健康替代建議
                            </Text>
                            <List spacing={3}>
                                {analysis.healthyAlternatives.map((alternative, index) => (
                                    <ListItem
                                        key={index}
                                        display="flex"
                                        alignItems="center"
                                        color="gray.700"
                                    >
                                        <ListIcon as={CheckCircleIcon} color="primary.500" />
                                        {alternative}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </VStack>
                )}
            </VStack>
        </Box>
    );
}; 