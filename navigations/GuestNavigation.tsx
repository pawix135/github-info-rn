import { createStackNavigator } from "@react-navigation/stack"
import { AuthRequestPromptOptions, AuthSessionResult } from "expo-auth-session"
import { SignIn } from "../pages/guest"

const GuestStack = createStackNavigator()


interface Props {
    promptAsync: (options?: AuthRequestPromptOptions) => Promise<AuthSessionResult>
}
const GuestNavigation: React.FC<Props> = ({ promptAsync }) => {
    return (
        <GuestStack.Navigator initialRouteName='SignIn'>
            <GuestStack.Screen name='SignIn' options={{
                title: "Domek",
                headerShown: false
            }}>
                {(props) => <SignIn prompt={promptAsync} {...props} />}
            </GuestStack.Screen>
        </GuestStack.Navigator>
    )
}

export default GuestNavigation