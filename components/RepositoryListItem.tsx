import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GitHubRepo } from "../types/GitHub";

interface Props {
    repo: GitHubRepo
}

const RepositoryListItem: React.FC<Props> = ({ repo }) => {

    let navigation = useNavigation<any>();

    return <TouchableOpacity onPress={() => navigation.navigate('Repository', { repo })}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>{repo.name}</Text>
                <Text style={styles.badge}>{repo.visibility}</Text>
            </View>
            <Text style={styles.description}>{repo.description}</Text>
            <Text style={styles.language}>{repo.language}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        padding: 10,
        minHeight: 100,
        backgroundColor: "white",
        borderColor: "#d0d7de",
        borderWidth: 1,
        borderRadius: 2,
        shadowColor: "#181818",
        shadowRadius: 2,
        shadowOffset: { height: 3, width: 2 },
        shadowOpacity: .3
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row"
    },
    description: {
        maxWidth: 250
    },
    language: {
        marginTop: "auto",
        paddingTop: 25

    },
    badge: {
        borderRadius: 15,
        overflow: "hidden",
        backgroundColor: "white",
        color: "black",
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: "center"
    }
})

export default RepositoryListItem;