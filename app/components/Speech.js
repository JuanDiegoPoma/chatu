import { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import Voice from "@react-native-voice/voice";

export default function Speech(props){
    const [pregunta, setPregunta] = useState("");
    
    useEffect(() => {
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechError = onSpeechError;
        return () => {
            Voice.destroy();
        }
    },[]);

    useEffect(() => {
        if(props.visible){
            onRecord();
        }
    },[props.visible])

    const onSpeechError = (e) => {
        props.hide();
    }

    const onSpeechResults = (event) => {
        setPregunta(event.value[0]);
        setTimeout(() => {
            props.onResult(event.value[0]);
            setPregunta("")
        },1000)
    }

    const onRecord = (e) => {
        Voice.start('es-ES');
    }

    return <Modal animationType="slide" transparent visible={props.visible}>
        <View style={styles.modal}>
            <Text style={styles.txtAsk}>Haz una pregunta</Text>
            <Image style={styles.image} source={require("../../assets/wave.gif")}/>
            <Text style={styles.result}>{pregunta}</Text>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#282c34f5",
        padding: 20,
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 60
    },
    txtAsk: {
        color: "white",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 24
    },
    image: {
        width: 200,
        height: 100
    },
    result: {
        color: "white",
        fontSize: 16
    }
})