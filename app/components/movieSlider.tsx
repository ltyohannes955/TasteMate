import { Heart } from "lucide-react-native";
import React, { useRef, useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const CARD_HEIGHT = 380;

const movieData = [
  {
    id: 1,
    title: "Inception",
    rating: "8.8",
    image:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    description:
      "A skilled thief steals corporate secrets using dream-sharing technology.",
  },
  {
    id: 2,
    title: "Interstellar",
    rating: "8.6",
    image: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    description:
      "A team travels through a wormhole in space to ensure humanity's survival.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    rating: "9.0",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description:
      "Batman faces off against the Joker, Gotham’s most dangerous criminal.",
  },
  {
    id: 4,
    title: "The Matrix",
    rating: "8.7",
    image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    description:
      "A hacker learns the truth about reality and joins the rebellion.",
  },
  {
    id: 5,
    title: "Parasite",
    rating: "8.5",
    image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    description: "A poor family schemes to infiltrate a wealthy household.",
  },
];

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
                source={{ uri: item.image }}
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
                  {item.title}
                </Text>
                <Text className="text-[#ffcc00] text-sm mb-1">
                  ⭐ {item.rating}
                </Text>
                <Text className="text-[#ddd] text-xs" numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />

      {/* Pagination Dots */}
      <View className="flex-row justify-center mt-4 gap-2">
        {movieData.map((_, i) => (
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
