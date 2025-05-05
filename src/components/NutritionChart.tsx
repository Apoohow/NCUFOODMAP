import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { Box, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react';
import { AIAnalysisResponse } from '../services/ai';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

interface NutritionChartProps {
    nutritionInfo: AIAnalysisResponse['nutritionInfo'];
}

export const NutritionChart: React.FC<NutritionChartProps> = ({ nutritionInfo }) => {
    const primaryColor = useColorModeValue('rgba(255, 167, 38, 0.6)', 'rgba(255, 167, 38, 0.6)');
    const primaryColorLight = useColorModeValue('rgba(255, 183, 77, 0.2)', 'rgba(255, 183, 77, 0.2)');
    const borderColor = useColorModeValue('rgba(255, 152, 0, 0.8)', 'rgba(255, 152, 0, 0.8)');

    const barData = {
        labels: ['熱量 (kcal)', '蛋白質 (g)', '碳水化合物 (g)', '脂肪 (g)', '膳食纖維 (g)'],
        datasets: [
            {
                data: [
                    nutritionInfo.calories,
                    nutritionInfo.protein,
                    nutritionInfo.carbs,
                    nutritionInfo.fat,
                    nutritionInfo.fiber,
                ],
                backgroundColor: primaryColor,
                borderColor: borderColor,
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    const radarData = {
        labels: ['蛋白質', '碳水化合物', '脂肪', '膳食纖維'],
        datasets: [
            {
                data: [
                    nutritionInfo.protein,
                    nutritionInfo.carbs,
                    nutritionInfo.fat,
                    nutritionInfo.fiber,
                ],
                backgroundColor: primaryColorLight,
                borderColor: borderColor,
                borderWidth: 2,
                pointBackgroundColor: primaryColor,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: borderColor,
                pointRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#666',
                bodyColor: '#666',
                borderColor: borderColor,
                borderWidth: 1,
                padding: 10,
                displayColors: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
                ticks: {
                    color: '#666',
                    font: {
                        family: '"Noto Sans TC", sans-serif',
                    },
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#666',
                    font: {
                        family: '"Noto Sans TC", sans-serif',
                    },
                },
            },
        },
    };

    const radarOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#666',
                bodyColor: '#666',
                borderColor: borderColor,
                borderWidth: 1,
                padding: 10,
                displayColors: false,
            },
        },
        scales: {
            r: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
                ticks: {
                    color: '#666',
                    backdropColor: 'transparent',
                    font: {
                        family: '"Noto Sans TC", sans-serif',
                    },
                },
                pointLabels: {
                    color: '#666',
                    font: {
                        family: '"Noto Sans TC", sans-serif',
                        size: 12,
                    },
                },
                angleLines: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
        },
    };

    return (
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} w="100%">
            <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" w="100%" minH="300px">
                <Bar data={barData} options={options} />
            </Box>
            <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" w="100%" minH="300px">
                <Radar data={radarData} options={radarOptions} />
            </Box>
        </SimpleGrid>
    );
}; 