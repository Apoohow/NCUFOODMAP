import axios from 'axios';

export interface GoogleMapsRestaurant {
    place_id: string;
    name: string;
    rating: number;
    user_ratings_total: number;
    vicinity: string;
    price_level?: number;
    photos?: Array<{
        photo_reference: string;
        height: number;
        width: number;
    }>;
    opening_hours?: {
        open_now: boolean;
    };
    types: string[];
}

const CENTRAL_UNIVERSITY_LOCATION = {
    lat: 24.9684,
    lng: 121.1950
};

export const searchNearbyRestaurants = async (
    type: string = '',
    radius: number = 1000
): Promise<GoogleMapsRestaurant[]> => {
    try {
        const response = await axios.get('/api/restaurants/nearby', {
            params: {
                type,
                radius,
                lat: CENTRAL_UNIVERSITY_LOCATION.lat,
                lng: CENTRAL_UNIVERSITY_LOCATION.lng
            }
        });

        return response.data.results;
    } catch (error) {
        console.error('搜尋餐廳失敗:', error);
        throw new Error('無法獲取餐廳資訊');
    }
};

export const getPriceRangeText = (priceLevel?: number): string => {
    switch (priceLevel) {
        case 0:
            return '平價';
        case 1:
            return '經濟實惠';
        case 2:
            return '中等價位';
        case 3:
            return '高級餐廳';
        case 4:
            return '頂級餐廳';
        default:
            return '價格未知';
    }
};

export const getPhotoUrl = (photoReference: string): string => {
    return `/api/restaurants/photo?photo_reference=${photoReference}`;
}; 