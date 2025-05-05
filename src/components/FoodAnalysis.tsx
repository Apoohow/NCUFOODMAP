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

interface NutrientInfo {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
}

interface FoodItem {
    name: string;
    quantity: number;
    unit: string;
    calories: number;
    nutrients: NutrientInfo;
}

interface AnalysisData {
    date: Date;
    mealType: string;
    foods: FoodItem[];
    totalCalories: number;
    nutritionBalance: NutrientInfo;
    healthScore: number;
    recommendations: string[];
}

export const FoodAnalysis: React.FC = () => {
    const [description, setDescription] = useState('');
    const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const toast = useToast();

    const saveAnalysisToDb = async (analysisData: AnalysisData) => {
        try {
            const response = await fetch('/api/food-analysis/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(analysisData),
            });

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            toast({
                title: '保存成功',
                description: '分析結果已成功保存到資料庫',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('保存分析結果失敗:', error);
            toast({
                title: '保存失敗',
                description: '保存分析結果失敗，請稍後再試',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

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

            // 在分析完成後保存結果
            const analysisData: AnalysisData = {
                date: new Date(),
                mealType: '未指定',
                foods: [
                    {
                        name: description,
                        quantity: 1,
                        unit: '份',
                        calories: result.nutritionInfo.calories || 0,
                        nutrients: {
                            calories: result.nutritionInfo.calories || 0,
                            protein: result.nutritionInfo.protein || 0,
                            carbs: result.nutritionInfo.carbs || 0,
                            fat: result.nutritionInfo.fat || 0,
                            fiber: result.nutritionInfo.fiber || 0,
                        },
                    },
                ],
                totalCalories: result.nutritionInfo.calories || 0,
                nutritionBalance: {
                    calories: result.nutritionInfo.calories || 0,
                    protein: result.nutritionInfo.protein || 0,
                    carbs: result.nutritionInfo.carbs || 0,
                    fat: result.nutritionInfo.fat || 0,
                    fiber: result.nutritionInfo.fiber || 0,
                },
                healthScore: result.healthScore,
                recommendations: [result.recommendation],
            };

            await saveAnalysisToDb(analysisData);
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