import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Card,
  CardBody,
  Stack,
  Image,
  Badge
} from '@chakra-ui/react';

interface Restaurant {
  _id: string;
  name: string;
  description: string;
  address: string;
  rating: number;
  priceRange: string;
  categories: string[];
}

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/restaurants')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRestaurants(data.data);
        } else {
          setError('無法載入餐廳資料');
        }
      })
      .catch(err => {
        setError('發生錯誤：' + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Text>載入中...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>中大美食地圖</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {restaurants.map(restaurant => (
          <Card key={restaurant._id}>
            <CardBody>
              <Image
                src={restaurant.photos?.[0]?.url || 'https://via.placeholder.com/300x200'}
                alt={restaurant.name}
                borderRadius="lg"
              />
              <Stack mt={4}>
                <Heading size="md">{restaurant.name}</Heading>
                <Text>{restaurant.description}</Text>
                <Text fontSize="sm" color="gray.500">{restaurant.address}</Text>
                <Box>
                  {restaurant.categories.map(category => (
                    <Badge key={category} mr={2} colorScheme="teal">
                      {category}
                    </Badge>
                  ))}
                </Box>
                <Text>
                  評分：{'⭐'.repeat(restaurant.rating)}
                </Text>
                <Text>
                  價格：{restaurant.priceRange}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
} 