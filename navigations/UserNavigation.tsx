import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Settings, User } from "../pages/user";
import { RootUserStackParams } from "../types/RootStack";

const UserStack = createBottomTabNavigator<RootUserStackParams>();

type IoniconsNames = React.ComponentProps<typeof Ionicons>["name"];

interface Props {}
const UserNavigation: React.FC<Props> = () => {
  return (
    <UserStack.Navigator
      initialRouteName="User"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IoniconsNames = "alert-circle";

          if (route.name === "User")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Settings")
            iconName = focused ? "settings" : "settings-outline";

          return <Ionicons name={iconName} size={size} color={"#fff"} />;
        },
        tabBarLabelStyle: { color: "white" },
        headerStyle: { backgroundColor: "#171515" },
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#171515",
        },
      })}
    >
      <UserStack.Screen
        name="User"
        options={{ headerShown: false }}
        component={User}
      />
      <UserStack.Screen name="Settings" component={Settings} />
    </UserStack.Navigator>
  );
};

export default UserNavigation;
