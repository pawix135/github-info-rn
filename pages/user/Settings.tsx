import { useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacityComponent,
  TouchableOpacityProps,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../../context/UserContext";

interface SettingsButtonProps extends TouchableOpacityProps {
  text: string;
}
const SettingsButton: React.FC<SettingsButtonProps> = (props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress as any}
      style={props.disabled ? styles.buttonDisabled : styles.buttonContainer}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const Settings = () => {
  let ctx = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: ctx.profile.avatar_url }}
          style={styles.profile_picture}
        />
        <View style={styles.bioContainer}>
          <Text style={styles.profile_name}>{ctx.profile.name}</Text>
          <Text style={styles.profile_description}>{ctx.profile.bio}</Text>
        </View>
      </View>
      <SettingsButton text="Refresh profile data" disabled={true} />
      <SettingsButton text="Sign out" onPress={() => ctx.signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonDisabled: {
    backgroundColor: "#333",
    width: "100%",
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: "#000",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  profileContainer: {
    paddingVertical: 15,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "#d0d7de",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profile_picture: {
    width: 150,
    borderRadius: 150 / 2,
    height: 150,
    alignSelf: "center",
  },
  profile_name: {
    fontSize: 32,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  bioContainer: {
    alignItems: "center",
  },
  profile_description: {
    fontSize: 19,
  },
});

export default Settings;
