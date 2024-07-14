import { Dimensions, Image, Modal, StyleSheet, Text, View } from "react-native";
import Footer from "../components/Footer";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function(){
    const [footerHeight, setFooterHeight] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);
    
    const {user} = useAuth();

    return <SafeAreaView style={styles.layout}>
        <View onLayout={({nativeEvent}) => setHeaderHeight(nativeEvent.layout.height)}>
            <Header/>
        </View>
        <View style={{...styles.content, height: Dimensions.get("window").height - footerHeight - headerHeight}}>
            <Text style={styles.txtSaludo}>HOLA</Text>
            <Text style={styles.txtUsuario}>{user.name}</Text>
            <Image source={require("../../assets/logo.png")} style={styles.logo}/>
            <Text style={styles.txtPregunta}>¿Como puedo ayudarte?</Text>
        </View>
        <View onLayout={({nativeEvent}) => setFooterHeight(nativeEvent.layout.height)}>
            <Footer/>
        </View>
    </SafeAreaView>
}

const styles =  StyleSheet.create({
    layout: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        paddingBottom: 40,
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    },
    logo: {
        width: 300,
        height: 300,
        marginLeft: 48
    },
    txtSaludo: {
        color: "white",
        fontWeight: "400",
        fontSize: 36
    },
    txtUsuario: {
        color: "white",
        fontWeight: "600",
        fontSize: 54
    },
    txtPregunta: {
        color: "white",
        fontWeight: "400",
        fontSize: 36
    }
})