import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const Home = ({ prompt }) => {
  return (
    <SafeAreaView style={style.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <AntDesign name="github" size={124} color="black" />
      </View>
      <TouchableOpacity style={style.button} onPress={() => prompt()}>
        <AntDesign name="github" size={32} color="white" />
        <Text style={style.buttonText}>GitHub</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonText: {
    color: "white",
    fontSize: 35,
    textAlign: "center",
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#171515",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    height: 100,
    flexDirection: "row",
    width: "90%",
  },
  imageBg: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Home;
