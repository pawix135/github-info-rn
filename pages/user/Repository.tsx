import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../../context/UserContext";
import { UserRepositoryProps } from "../../types/RootStack";

const Repository = ({ route, navigation }: UserRepositoryProps) => {
  const [repositoryInfo, setRepositoryInfo] = useState<any | null>(null);

  let { repo } = route.params;
  let ctx = useContext(UserContext);

  console.log(repositoryInfo);

  useEffect(() => {
    if (repositoryInfo) return;

    const getRepositoryInfo = async () => {
      let response = await fetch(
        `https://api.github.com/repos/${repo.full_name}`,
        {
          credentials: "include",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `token ${ctx.token}`,
          },
        }
      );

      let data = await response.json();
      console.log(data);

      setRepositoryInfo(data);
    };

    getRepositoryInfo();

    navigation.setOptions({
      title: repo.full_name,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.name}>{repositoryInfo?.name}</Text>
        <View style={styles.infoBox}>
          <View style={styles.info}>
            <Text>{repositoryInfo?.forks_count}</Text>
            <Text>Forks</Text>
          </View>
          <View style={styles.info}>
            <Text>{repositoryInfo?.watchers_count}</Text>
            <Text>Watchers</Text>
          </View>
          <View style={styles.info}>
            <Text>{repositoryInfo?.open_issues}</Text>
            <Text>Issues</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.json}>
        <Text>{JSON.stringify(repositoryInfo, null, 2)}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  json: {
    paddingVertical: 10,
  },
  name: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
    marginBottom: "auto",
    marginTop: "auto",
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  info: {
    alignItems: "center",
  },
  box: {
    padding: 5,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    minHeight: 120,
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});

export default Repository;
