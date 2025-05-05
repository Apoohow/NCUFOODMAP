import React, { useState } from 'react';
import {
    Box,
    Button,
    VStack,
    Text,
    SimpleGrid,
    Badge,
    useToast,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    StackDivider,
    Select,
    Image,
    HStack,
    Icon,
    Link
} from '@chakra-ui/react';
import { StarIcon, TimeIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { searchNearbyRestaurants, GoogleMapsRestaurant, getPriceRangeText, getPhotoUrl } from '../services/maps';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const RestaurantRecommendations: React.FC = () => {
    const [preferences, setPreferences] = useState({
        type: '',
        radius: '1000'
    });
    const [restaurants, setRestaurants] = useState<GoogleMapsRestaurant[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSearch = async () => {
        setLoading(true);
        try {
            const results = await searchNearbyRestaurants(
                preferences.type,
                parseInt(preferences.radius)
            );
            setRestaurants(results);
        } catch (error) {
            toast({
                title: '搜尋失敗',
                description: '無法獲取餐廳資訊，請稍後再試',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleOpenInMaps = (restaurant: GoogleMapsRestaurant) => {
        const query = encodeURIComponent(restaurant.name + ' ' + restaurant.vicinity);
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    };

    const renderStars = (rating: number) => {
        return Array(5).fill('').map((_, i) => (
            <StarIcon
                key={i}
                color={i < Math.round(rating) ? 'orange.400' : 'gray.300'}
            />
        ));
    };

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
            <VStack spacing={6} align="stretch">
                <Heading size="lg" color="primary.700">中大美食推薦</Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <Select
                        placeholder="選擇餐廳類型"
                        value={preferences.type}
                        onChange={(e) => setPreferences({ ...preferences, type: e.target.value })}
                        bg="white"
                        borderColor="primary.200"
                        _hover={{ borderColor: 'primary.300' }}
                        _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }}
                    >
                        <option value="中式">中式</option>
                        <option value="日式">日式</option>
                        <option value="韓式">韓式</option>
                        <option value="美式">美式</option>
                        <option value="義式">義式</option>
                        <option value="素食">素食</option>
                    </Select>

                    <Select
                        placeholder="搜尋範圍"
                        value={preferences.radius}
                        onChange={(e) => setPreferences({ ...preferences, radius: e.target.value })}
                        bg="white"
                        borderColor="primary.200"
                        _hover={{ borderColor: 'primary.300' }}
                        _focus={{ borderColor: 'primary.500', boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)' }}
                    >
                        <option value="500">500公尺</option>
                        <option value="1000">1公里</option>
                        <option value="2000">2公里</option>
                        <option value="3000">3公里</option>
                    </Select>
                </SimpleGrid>

                <Button
                    colorScheme="primary"
                    onClick={handleSearch}
                    isLoading={loading}
                    loadingText="搜尋中..."
                    size="lg"
                    _hover={{ bg: 'primary.600' }}
                >
                    搜尋附近餐廳
                </Button>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {restaurants.map((restaurant) => (
                        <Card 
                            key={restaurant.place_id}
                            cursor="pointer"
                            transition="all 0.2s"
                            _hover={{ transform: 'translateY(-4px)', shadow: 'lg', borderColor: 'primary.200' }}
                            onClick={() => handleOpenInMaps(restaurant)}
                            borderWidth="1px"
                            borderColor="gray.100"
                        >
                            {restaurant.photos && restaurant.photos[0] && (
                                <Image
                                    src={getPhotoUrl(restaurant.photos[0].photo_reference)}
                                    alt={restaurant.name}
                                    height="200px"
                                    objectFit="cover"
                                    borderTopRadius="lg"
                                />
                            )}
                            
                            <CardHeader>
                                <Heading size="md">
                                    {restaurant.name}
                                    <Icon as={ExternalLinkIcon} ml={2} w={4} h={4} color="primary.500" />
                                </Heading>
                                <HStack spacing={2} mt={2}>
                                    <Icon as={FaMapMarkerAlt} color="primary.500" />
                                    <Text color="gray.600" fontSize="sm">{restaurant.vicinity}</Text>
                                </HStack>
                            </CardHeader>

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing="4">
                                    <Box>
                                        <HStack spacing={2}>
                                            {renderStars(restaurant.rating)}
                                            <Text color="gray.600" fontSize="sm">
                                                ({restaurant.user_ratings_total} 則評價)
                                            </Text>
                                        </HStack>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="bold" fontSize="sm" color="primary.700">
                                            價格範圍
                                        </Text>
                                        <Text pt="2" fontSize="sm" color="primary.600">
                                            {getPriceRangeText(restaurant.price_level)}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <HStack spacing={2}>
                                            <TimeIcon color={restaurant.opening_hours?.open_now ? "green.500" : "red.500"} />
                                            <Text fontSize="sm" color={restaurant.opening_hours?.open_now ? "green.500" : "red.500"}>
                                                {restaurant.opening_hours?.open_now ? "營業中" : "休息中"}
                                            </Text>
                                        </HStack>
                                    </Box>
                                    <Box>
                                        {restaurant.types.map((type, i) => (
                                            <Badge
                                                key={i}
                                                mr={2}
                                                mb={2}
                                                colorScheme="primary"
                                                variant="subtle"
                                            >
                                                {type}
                                            </Badge>
                                        ))}
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </VStack>
        </Box>
    );
}; 