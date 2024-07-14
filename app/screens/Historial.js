import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { obtenerHistorialDeChats, obtenerHistorialDeConversaciones } from "../api";
import NavHeader from "../components/NavHeader";
import { ScrollView, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

export default function Historial(){
    const [conversaciones, setConversaciones] = useState([]);
    const [cargando, setCargando] = useState(false);

    const navigation = useNavigation();

    const {user} = useAuth();

    useEffect(() => {
        setCargando(true);
        /*obtenerHistorialDeChats()
        .then(data => {
            console.log(data.data);
            setConversaciones(data.data.conversations)
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => setCargando(false));*/
        obtenerHistorialDeConversaciones()
        .then(data => {
            const _convs = data.data.map((chat) => {
                return {id: chat.id, msg: chat.chat_history[0].content}
            });

            setConversaciones(_convs);
        })
        .catch(error => console.log(error));
    },[])

    return <SafeAreaView style={styles.layout}>
        <NavHeader titulo="Historial de chats"/>
        <ScrollView contentContainerStyle={styles.scrollInset}>
            {conversaciones.map((conv, key) => <Pressable onPress={() => navigation.navigate('Chat', {chatId: conv.id})} key={key} style={styles.conversacion}>
                <View style={styles.imagenContainer}>
                    <Image source={require("../../assets/logo.png")} style={styles.imagen}/>
                </View>
                <View>
                    <Text style={styles.msg} numberOfLines={1} ellipsizeMode="clip">{conv.msg}</Text>
                    <Text style={styles.id}>id: {conv.id}</Text>
                </View>
            </Pressable>)}
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    layout: {
        ...StyleSheet.absoluteFillObject
    },
    scrollInset: {
        padding: 20,
        gap: 10
    },
    imagen: {
        width: 48,
        height: 48
    },
    imagenContainer: {
        width: 48,
        height: 48,
        backgroundColor: "white",
        borderRadius: 24,
        overflow: "hidden"
    },
    conversacion: {
        backgroundColor: "#cccfd4",
        borderRadius: 60,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    id: {
        fontSize: 14
    },
    msg: {
        fontSize: 18,
        fontWeight: "600",
        width: "90%"
    }
})