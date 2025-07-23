import { Heart } from "lucide-react-native";
import React, { useRef, useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetPopularMoviesQuery } from "../../services/movieApi";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const CARD_HEIGHT = 380;

export default function MovieSlider() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
        setCurrentIndex(index);
      },
    }
  );
  const { data, error, isLoading } = useGetPopularMoviesQuery();

  if (isLoading) return <ActivityIndicator size="large" />;

  if (error) return <Text>Error fetching data</Text>;

  const movieData = data?.results.slice(0, 6) || [];

  return (
    <View className="items-center h-[410px]">
      <Animated.FlatList
        data={movieData}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: 2 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{
                width: ITEM_WIDTH,
                height: CARD_HEIGHT,
                marginHorizontal: 10,
                transform: [{ scale }],
                opacity,
              }}
              className="rounded-2xl overflow-hidden"
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
                }}
                className="absolute w-full h-full"
                resizeMode="cover"
              />

              {/* Favorite icon */}
              <TouchableOpacity
                className="absolute top-3 right-3 z-10 bg-black/50 rounded-full p-1.5"
                onPress={() => {
                  console.log("Favorite toggled for:", item.id);
                }}
              >
                <Heart size={22} color="white" />
              </TouchableOpacity>

              {/* Overlay content */}
              <View className="flex-1 bg-black/50 p-4 justify-end">
                <Text className="text-white text-lg font-bold mb-1">
                  {item.original_title}
                </Text>
                <Text className="text-[#ffcc00] text-sm mb-1">
                  ⭐ {item.vote_average}
                </Text>
                <Text className="text-[#ddd] text-xs" numberOfLines={2}>
                  {item.overview}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />

      {/* Pagination Dots */}
      <View className="flex-row justify-center mt-4 gap-2">
        {movieData.map((_: any, i: any) => (
          <View
            key={i}
            className={`w-3 h-3 rounded-full ${
              currentIndex === i ? "bg-[#ff7565]" : "bg-white/40"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
