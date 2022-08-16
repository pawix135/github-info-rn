import { createStackNavigator } from "@react-navigation/stack";
import { UserStackParams } from "../../types/RootStack";

import Home from "./Home";
import Repository from "./Repository";

const RepositoryStack = createStackNavigator<UserStackParams>();

// #24292f
const User = () => {
  return (
    <RepositoryStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#171515" },
        headerTintColor: "#fff",
      }}
    >
      <RepositoryStack.Screen name="Home" component={Home} />
      <RepositoryStack.Screen name="Repository" component={Repository} />
    </RepositoryStack.Navigator>
  );
};

export default User;
