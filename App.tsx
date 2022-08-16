import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import {
  makeRedirectUri,
  useAuthRequest,
  exchangeCodeAsync,
  fetchUserInfoAsync,
} from "expo-auth-session";
import { useCallback, useEffect, useReducer } from "react";
import * as Browser from "expo-web-browser";
import {
  initialUserState,
  UserContext,
  userReducer,
} from "./context/UserContext";
import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store";
import pick from "lodash.pick";
import UserNavigation from "./navigations/UserNavigation";
import GuestNavigation from "./navigations/GuestNavigation";
import { StatusBar } from "expo-status-bar";

Browser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/5eadf3c70a171b5b1f13",
  userInfoEndpoint: "https://api.github.com/user",
};

export default function App() {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const [_, response, promptAsync] = useAuthRequest(
    {
      clientId: "5eadf3c70a171b5b1f13",
      scopes: ["identity", "user"],
      redirectUri: makeRedirectUri({ useProxy: false }),
    },
    discovery
  );

  let signIn = useCallback(async (user) => {
    await setItemAsync("user", JSON.stringify(user));
    dispatch({ type: "USER/SIGN_IN", payload: user });
  }, []);

  let signOut = useCallback(async () => {
    await deleteItemAsync("user");
    dispatch({ type: "USER/SIGN_OUT" });
  }, []);

  let setRepos = useCallback(async (repos) => {
    dispatch({ type: "REPOS/SET", payload: repos });
  }, []);

  useEffect(() => {
    try {
      const persistUser = async () => {
        let user = await getItemAsync("user");

        if (!user) return;

        dispatch({ type: "USER/SIGN_IN", payload: JSON.parse(user) });
      };

      persistUser();
    } catch (error) {
      console.log("Something went horribly wrong");
    }
  }, []);

  useEffect(() => {
    if (response === null || !response || response.type === "cancel") return;

    if (response.type === "success" && !state.token) {
      try {
        const { code } = response.params;

        const handleCode = async () => {
          let token = await exchangeCodeAsync(
            {
              clientId: "5eadf3c70a171b5b1f13",
              clientSecret: "88731ca5db55ddc36579d5f3aa29b712b964eb41",
              code,
              scopes: ["user"],
              redirectUri: makeRedirectUri({ useProxy: false }),
            },
            discovery
          );

          if (!token.accessToken || token.accessToken === "") return;

          let userInfo = await fetchUserInfoAsync(token, discovery);

          let user = {
            token: token.accessToken,
            profile: pick(userInfo, [
              "avatar_url",
              "bio",
              "total_private_repos",
              "total_public_repos",
              "repos_url",
              "location",
              "login",
              "name",
            ]),
          };

          await signIn(user);
        };

        handleCode();
      } catch (error) {
        console.log(error);
      }
    }
  }, [response]);

  return (
    <UserContext.Provider value={{ signIn, signOut, setRepos, ...state }}>
      <NavigationContainer>
        {state.token ? (
          <UserNavigation />
        ) : (
          <GuestNavigation promptAsync={promptAsync} />
        )}
      </NavigationContainer>
      <StatusBar style="auto" />
    </UserContext.Provider>
  );
}
