import { Pressable, StyleSheet, View } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function Footer(props){
    const navigation = useNavigation();

    return <View style={styles.layout}>
        <Pressable onPress={() => navigation.navigate("Documentos")}>
            <AntIcon name="upload" size={36} color="white"/>
        </Pressable>
        <Pressable style={styles.mic} onPress={() => navigation.navigate("Chat", {preguntaVoz: true})}>
            <IonIcon name="mic" size={48} color="#212227"/>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Chat")}>
            <MatComIcon name="message-reply-text-outline" size={36} color="white"/>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: "#6a6b6f",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    mic: {
        position: 'absolute',
        left: "50%",
        top: "-100%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 48
    }
})