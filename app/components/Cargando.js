import { Image, Modal, StyleSheet, Text, View } from "react-native";

export default function (props){
    return <Modal animationType="slide" transparent visible={props.visible} >
        <View style={styles.modal}>
            <Image source={require("../../assets/cargando.gif")} style={styles.image}/>
            <Text style={styles.texto}>{props.texto}</Text>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100
    },
    modal :{ 
        backgroundColor: "#282c34b0",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    texto: {
        fontWeight: "500",
        fontSize: 18,
        color: "white"
    }
})