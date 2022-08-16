import { GitHubRepo } from "./GitHub";

type UserProfile = {
    avatar_url: string;
    bio: string;
    total_private_repos: number;
    total_public_repos: number;
    repos_url: string;
    location: string;
    login: string;
    name: string;
}

interface IUserContext {
    profile: UserProfile | null;
    token: string | null;
    repos: GitHubRepo[] | null;
    signIn?: (user) => Promise<void>;
    setRepos?: (repos) => Promise<void>;
    signOut?: () => Promise<void>;
}

type UserActionType = "USER/SIGN_IN" | "USER/SIGN_OUT" | "REPOS/SET"

interface UserAction {
    payload?: any;
    type: UserActionType;
}