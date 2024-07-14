import { Image, StyleSheet, Text, View } from "react-native";

export default function(){
    return <View style={styles.layout}>
        <Text style={styles.appName}>ChatU</Text>
        <Text style={styles.appSub}>Asistente Institucional</Text>
        <View style={styles.imgCont}>
            <Image style={styles.img} source={require("../../assets/logo.png")}/>
        </View>
        <Text style={styles.version}>Version 1.0</Text>
        <Image style={styles.loading} source={require("../../assets/cargando.gif")}/>
    </View>
}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: "#192229",
        ...StyleSheet.absoluteFillObject,
        padding: 20
        ,justifyContent: "center",
        alignItems: "center",
        gap: 20
    },
    imgCont: {
        backgroundColor: "#dee1e6",
        borderColor: "#00bdd5",
        borderWidth: 4,
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        width: 160,
        height: 160,
        marginLeft: 20
    },
    appName: {
        fontSize: 50,
        fontWeight: "600",
        color: "white",
        fontFamily: "Montserrat-Bold",
        
    },
    appSub: {
        color: "white",
        fontWeight: "500",
        fontSize: 24,
        fontFamily: "Montserrat-Regular",
    },
    version: {
        color: "white",
        fontSize: 24,
        fontFamily: "Lato-Regular",
    },
    loading: {
        width: 64,
        height: 64
    }
})