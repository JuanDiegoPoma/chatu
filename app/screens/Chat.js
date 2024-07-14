import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavHeader from "../components/NavHeader";
import { Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import { hacerPregunta, obtenerHistorialDeConversacion } from "../api";
import IonIcon from "react-native-vector-icons/Ionicons";
import Speech from "../components/Speech";
import * as TextSpeech from 'expo-speech';
import { MenuView } from "@react-native-menu/menu";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

export default function Chat({ route}){
    const [pregunta, setPregunta] = useState();
    const [preguntaVoz, setPreguntaVoz] = useState("");
    const [historial, setHistorial] = useState([]);
    const [id, setId] = useState();
    const [preguntarPorVoz, setPreguntarPorVoz] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        if(route.params?.chatId){
            setId(route.params?.chatId);
            obtenerHistorialDeConversacion({
                conversation_id: route.params?.chatId
            })
            .then(data1 => {
                setHistorial(data1.data.chat_history)
            })
            .catch(error => console.log(error))
        }
        if(route.params?.preguntaVoz){
            setPreguntarPorVoz(true);
        }
        return () => {
            TextSpeech.stop()
        }
    },[])

    useEffect(() => {
        if(preguntaVoz !== ''){
            preguntar(preguntaVoz);
        }
    },[preguntaVoz])

    const preguntar = (pregunta) => {
        //Limpiar input
        setPregunta('');
        //Agregar pregunta del usuario
        const _historial = [...historial];
        _historial.push({content: pregunta, type: "human"});
        setHistorial(_historial);

        hacerPregunta({
            conversation_id: id,
            question: pregunta
        })
        .then((data) => {
            setId(data.data.conversation_id);

            obtenerHistorialDeConversacion({
                conversation_id: data.data.conversation_id
            })
            .then(data1 => {
                setHistorial(data1.data.chat_history)
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }

    const onResultPreguntarPorVoz = (value) => {
        setPreguntarPorVoz(false);
        setPreguntaVoz(value);
    }

    const Opciones = () => {
        return <View>
            <MenuView 
                title="Menu"
                onPressAction={({nativeEvent}) => {
                    if(nativeEvent.event === "new"){
                        setId(undefined);
                        setHistorial([]);
                        setPregunta('');
                        setPreguntaVoz('');
                    }
                    else if(nativeEvent.event === "history"){
                        navigation.reset({
                            index: 1,
                            routes: [
                                {name: "Inicio"},
                                {name: "Historial"}
                            ]
                        })
                    }
                }}
                actions={[
                    {
                        id: "new",
                        title: "Nueva Conversación",
                    },
                    {
                        id: "history",
                        title: "Historial"
                    }
                ]}>
                <EntypoIcon name="dots-three-vertical" color="white" size={24}/>
            </MenuView>
        </View>
    }

    return <SafeAreaView style={sytles.layout}>
        <NavHeader titulo="Chat" opciones={<Opciones/>}/>
        <ScrollView contentContainerStyle={sytles.container} >
            {historial.map((msj, key) => <View key={key} style={msj.type === "ai" ? sytles.mensajeBot : sytles.mensajeUsuario}>
                {msj.type === 'ai' && <IonIcon name="volume-high" onPress={() => {
                    TextSpeech.stop();
                    TextSpeech.speak(msj.content, {language:"es-ES"});
                    }} size={24} color="#282c34" style={{alignSelf: "flex-end"}}/>}
                <Text>{msj.content}</Text>
            </View>)}
        </ScrollView>
        <View>
            <Input 
                leftIcon={<IonIcon 
                name="mic" size={24} 
                color="white" 
                onPress={() => setPreguntarPorVoz(true)}/>} 
                inputStyle={sytles.input} 
                rightIcon={<IonIcon name="send-sharp" 
                    size={24} 
                color="white" 
                onPress={() => preguntar(pregunta)}/>} 
                placeholder="Escribe lo que necesites..." 
                value={pregunta} onChangeText={setPregunta}/>
        </View>
        <Speech visible={preguntarPorVoz} onResult={onResultPreguntarPorVoz} hide={() => setPreguntarPorVoz(false)}/>
    </SafeAreaView>
}

const sytles = StyleSheet.create({
    layout: {
        ...StyleSheet.absoluteFillObject
    },
    container: {
        gap: 10,
        padding: 20
    },
    input: {
        color: "white"
    },
    mensajeBot: {
        backgroundColor: "#a7f5ff",
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
        borderTopLeftRadius: 0,
        minWidth: '30%'
    },
    mensajeUsuario: {
        backgroundColor: "#f3f4f6",
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
        alignSelf: "flex-end",
        borderTopRightRadius: 0,
        alignItems: "flex-end"
    }
})