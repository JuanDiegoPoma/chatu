import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function(props){
    const navigation = useNavigation();

    return <View style={styles.layout}>
        <View style={styles.tituloContainer}>
            <Pressable onPress={() => navigation.goBack()}>
                <MatComIcon name="arrow-left" size={32} color="white"/>
            </Pressable>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/logo.png")} style={styles.image}/>
            </View>
            {props.titulo && <Text style={styles.titulo}>{props.titulo}</Text>}
        </View>
        <View>
            {props.opciones && props.opciones}
        </View>
    </View>
}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: "#606166",
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    image: {
        width: 56,
        height: 56,
    },
    imageContainer: {
        borderRadius: 32,
        backgroundColor: "white",
        overflow: "hidden",
        width: 48,
        height: 48
    },
    historialBtn: {
        flexDirection: "row",
        gap: 10
    },
    historialBtnText: {
        fontSize: 10,
        color: "white"
    },
    tituloContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    titulo: {
        fontWeight: "600",
        fontSize: 24,
        color: "white"
    }
})