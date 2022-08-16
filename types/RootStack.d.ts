import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { GitHubRepo } from "./GitHub";

type RootUserStackParams = {
    User: undefined;
    Settings: undefined;
  };

type UserStackParams = {
    Home: undefined,
    Repository: { repo: GitHubRepo }
}


type UserRepositoryProps = BottomTabScreenProps<UserStackParams, 'Repository'>;