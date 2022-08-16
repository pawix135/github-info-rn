import { useContext, useEffect } from "react";
import { View } from "react-native";
import RepositoryList from "../../components/RepositoryList";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  let ctx = useContext(UserContext);

  useEffect(() => {
    if (ctx.repos) return;

    const fetchRepos = async () => {
      let repos = await fetch(ctx.profile.repos_url);

      let data = await repos.json();

      ctx.setRepos(data);
    };

    fetchRepos();
  }, [ctx.profile]);

  return (
    <View style={{ flex: 1 }}>
      <RepositoryList repos={ctx.repos} />
    </View>
  );
};

export default Home;
