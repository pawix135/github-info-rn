import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { GitHubRepo } from "../types/GitHub";
import RepositoryListItem from "./RepositoryListItem";

interface Props {
  repos: GitHubRepo[];
}
const RepositoryList: React.FC<Props> = ({ repos }) => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      keyExtractor={(item) => "" + item.id}
      data={repos}
      renderItem={({ item }: { item: GitHubRepo }) => {
        return <RepositoryListItem repo={item} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 10,
  },
});

export default RepositoryList;
