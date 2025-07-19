import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import {
  Clapperboard,
  Film,
  Heart,
  Popcorn,
  Search,
  Shapes,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className="flex-row bg-[#281c1b] h-20">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label =
          typeof options.tabBarLabel === "function"
            ? options.tabBarLabel({
                focused: isFocused,
                color: isFocused ? "#1e40af" : "#6b7280",
                position: "below-icon",
                children: route.name,
              })
            : (options.tabBarLabel ?? options.title ?? route.name);

        const Icon =
          route.name === "home/index"
            ? Film
            : route.name === "movies/index"
              ? Popcorn
              : route.name === "category/index"
                ? Shapes
                : route.name === "tvShows/index"
                  ? Clapperboard
                  : Heart;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            className={`flex-1 items-center justify-center gap-1`}
          >
            <Icon
              size={24}
              color={isFocused ? "white" : "#6b7280"}
              className="mb-1"
            />
            <Text
              className={`text-xs ${isFocused ? "text-white" : "text-gray-500"}`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#181110", // match your tab bar
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        },
        headerTintColor: "white", // color for icons/buttons
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          headerRight: () => <Search color="white" />,
        }}
      />
      <Tabs.Screen
        name="category/index"
        options={{
          title: "Category",
        }}
      />
      <Tabs.Screen
        name="movies/index"
        options={{
          title: "Movies",
        }}
      />
      <Tabs.Screen
        name="tvShows/index"
        options={{
          title: "Tv Shows",
        }}
      />
      <Tabs.Screen
        name="favorite/index"
        options={{
          title: "Favorite",
        }}
      />
    </Tabs>
  );
}
