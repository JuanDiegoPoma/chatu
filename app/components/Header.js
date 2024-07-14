import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/AuthContext";
import { Button } from "@rneui/base";
import IonIcon from "react-native-vector-icons/Ionicons";
import { cerrarSesion } from "../api";
import { showMessage } from "react-native-flash-message";

export default function(){
    const [userVisible, setUserVisible] = useState(false);
    const {user, logout} = useAuth();

    const navigation = useNavigation();

    function OnCerrarSesion(){
        cerrarSesion()
        .then(() => {
            showMessage({
                message: "Adiós!",
                description: "Se ha cerrado la sesión correctamente",
                type: "success",
                backgroundColor: "#52A5E0"
            });
            logout();
        })
        .catch(error => {
            showMessage({
                message: "Oops!",
                description: "Ocurrió un error al intentar cerrar la sesión",
                type: "warning",
                backgroundColor: "#52A5E0"
            })
        })
    }

    return <View style={styles.layout}>
        <Pressable style={styles.imageContainer} onPress={() => setUserVisible(true)}>
            <Image source={require("../../assets/logo.png")} style={styles.image}/>
        </Pressable>
        <Pressable style={styles.historialBtn} onPress={() => navigation.navigate("Historial")}>
            <Text style={styles.historialBtnText}>Historial de Chats</Text>
            <MatComIcon name="history" size={24} color="white"/>
        </Pressable>
        <Modal animationType="slide" transparent visible={userVisible} >
            <View style={styles.modal}>
                <View style={styles.modalContent}>
                    <IonIcon name="close" size={32} style={{alignSelf: "flex-end"}} onPress={() => setUserVisible(false)}/>
                    <Text style={styles.userInfo}>Iniciaste sesión como {user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <Button onPress={OnCerrarSesion}buttonStyle={styles.botonCerrarSesion} >Cerrar sesión</Button>
                </View>
            </View>
        </Modal>
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
        fontSize: 20,
        color: "white"
    },
    modal: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#212227e0"
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        gap: 10
    },
    userInfo: {
        fontWeight: "600",
        fontSize: 24,textAlign: "center"
    },
    email: {
        textAlign: "center",
        fontSize: 18
    },
    botonCerrarSesion: {
        backgroundColor: "#52A5E0"
    }
})