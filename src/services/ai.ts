import axios from 'axios';

const TOGETHER_API_KEY = process.env.NEXT_PUBLIC_TOGETHER_API_KEY || "3a1de39e3c6be2425f3e251c3271bca622b8f0156c3a9fa25f78149d05a1c5dd";
const TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions";

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface AIAnalysisResponse {
    recommendation: string;
    healthScore: number;
    nutritionInfo: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
    tags: string[];
    healthyAlternatives: string[];
}

export interface RestaurantRecommendation {
    name: string;
    description: string;
    rating: number;
    tags: string[];
    location: string;
    priceRange: string;
}

const parseAIResponse = (response: string): AIAnalysisResponse => {
    try {
        // 假設 AI 回應是 JSON 格式
        const parsed = JSON.parse(response);
        return {
            recommendation: parsed.recommendation || '無法解析建議',
            healthScore: parsed.healthScore || 50,
            nutritionInfo: parsed.nutritionInfo || {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0
            },
            tags: parsed.tags || [],
            healthyAlternatives: parsed.healthyAlternatives || []
        };
    } catch (error) {
        // 如果無法解析 JSON，返回預設值
        return {
            recommendation: response,
            healthScore: 50,
            nutritionInfo: {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0
            },
            tags: ['無法解析標籤'],
            healthyAlternatives: []
        };
    }
};

export const analyzeFood = async (foodDescription: string): Promise<AIAnalysisResponse> => {
    try {
        const messages: Message[] = [
            {
                role: 'system',
                content: `你是一個專業的營養分析師，負責分析食物的營養價值並提供健康建議。
請根據使用者的美食描述，提供以下 JSON 格式的回應：
{
    "recommendation": "詳細的營養建議",
    "healthScore": 0-100的健康分數,
    "nutritionInfo": {
        "calories": 預估卡路里,
        "protein": 蛋白質克數,
        "carbs": 碳水化合物克數,
        "fat": 脂肪克數
    },
    "tags": ["相關標籤"],
    "healthyAlternatives": ["健康替代選擇"]
}
請確保回應是有效的 JSON 格式。`
            },
            {
                role: 'user',
                content: foodDescription
            }
        ];

        const response = await axios.post(TOGETHER_API_URL, {
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            messages,
            max_tokens: 1000,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${TOGETHER_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return parseAIResponse(response.data.choices[0].message.content);

    } catch (error) {
        console.error('AI 分析失敗:', error);
        throw new Error('無法完成食物分析');
    }
};

export const generateFoodRecommendation = async (userPreferences: string): Promise<RestaurantRecommendation[]> => {
    try {
        const messages: Message[] = [
            {
                role: 'system',
                content: `你是一個了解中央大學周邊美食的專家。請根據使用者的喜好提供餐廳推薦，回應格式為 JSON 陣列：
[{
    "name": "餐廳名稱",
    "description": "特色描述",
    "rating": 1-5的評分,
    "tags": ["相關標籤"],
    "location": "位置描述",
    "priceRange": "價格範圍"
}]
請提供 3-5 間符合條件的餐廳，確保回應是有效的 JSON 格式。`
            },
            {
                role: 'user',
                content: userPreferences
            }
        ];

        const response = await axios.post(TOGETHER_API_URL, {
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            messages,
            max_tokens: 1000,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${TOGETHER_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const recommendations = JSON.parse(response.data.choices[0].message.content);
        return Array.isArray(recommendations) ? recommendations : [];

    } catch (error) {
        console.error('推薦生成失敗:', error);
        throw new Error('無法生成美食推薦');
    }
}; 