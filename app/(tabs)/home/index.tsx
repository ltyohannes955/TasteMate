import MovieSlider from "@/app/components/movieSlider";
import TvShowSlider from "@/app/components/tvShowSlider";
import { router } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center bg-[#181110] gap-5 px-5">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 20, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-row justify-between w-full items-end">
          <Text className="text-white text-3xl font-bold">Popular Movies</Text>
          <Text
            className="text-white"
            onPress={() => router.navigate("/(tabs)/movies")}
          >
            View all
          </Text>
        </View>
        <MovieSlider />
        <View className="flex flex-row justify-between w-full items-end">
          <Text className="text-white text-3xl font-bold">
            Popular Tv Shows
          </Text>
          <Text
            className="text-white"
            onPress={() => router.navigate("/(tabs)/tvShows")}
          >
            View all
          </Text>
        </View>
        <TvShowSlider />
      </ScrollView>
    </SafeAreaView>
  );
}
