import { useNavigation } from "@react-navigation/native";
import { Button, CheckBox, Input } from "@rneui/themed";
import { useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";;
import IonIcon from "react-native-vector-icons/Ionicons";
import { iniciarSesion } from "../api";
import { useAuth } from "../context/AuthContext";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function(){
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [recordarme, setRecordarme] = useState(false);
    const [mostrarContraseña, setMostrarContraseña] = useState(false);

    const { login } = useAuth();

    function OnIOniciarSesion(){
        iniciarSesion({email, password: contraseña})
        .then(data => {
            //comprobar si se debe recordar
            if(recordarme){
                AsyncStorage.setItem('user', JSON.stringify(data.data.user))
                .then(() => {login(data.data.user)})
            } else {
                login(data.data.user);
            }

            showMessage({
                message: "Bienvenido/a",
                type: "success",
                description: "Inicio de sesión correcto",
                backgroundColor: "#52A5E0"})
        })
        .catch(error => {
            console.log(error.response.status);
            showMessage({
                message: "Oops!",
                type: "danger",
                description: error.response?.status === 401 ? "No se ha encontrado un usuario con las credenciales ingresadas" : "Ha ocurrido un error al intentar iniciar sesion",
                backgroundColor: "#52A5E0"
            })
        });
    }

    return <SafeAreaView style={styles.layout}>
        <ScrollView>
            <View style={styles.headerContainer}>
                <Text style={styles.textInicioSesion}>Inicio Sesión</Text>
            </View>
            <View style={styles.form}>
                <Input value={email} onChangeText={setEmail} inputStyle={styles.input} label="Email" placeholder="Correo UCE" leftIcon={<IonIcon name="at" color="white" size={18}/>}/>
                <Input value={contraseña} onChangeText={setContraseña} secureTextEntry={!mostrarContraseña} inputStyle={styles.input} label="Contraseña" placeholder="Ingresa tu contraseña" rightIcon={mostrarContraseña ? <IonIcon name="eye" size={18} color="white" onPress={() => setMostrarContraseña(!mostrarContraseña)}/> : <IonIcon name="eye-off" size={18} color="white" onPress={() => setMostrarContraseña(!mostrarContraseña)}/>} leftIcon={<IonIcon name="lock-closed" color="white" size={18}/>}/>
                <CheckBox checked={recordarme} onPress={() => setRecordarme(!recordarme)} textStyle={{color: "white"}} containerStyle={styles.checkbox} title="Recordarme"/>
                <Button onPress={OnIOniciarSesion} buttonStyle={styles.btnIngresar} containerStyle={styles.btnIngresarContainer}>Ingresar</Button>
            </View>
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    layout: {
        ...StyleSheet.absoluteFillObject,
        padding: 20
    },
    headerContainer: {
        height: Dimensions.get("screen").width - 100,
        justifyContent: "center",
        alignItems: "center"
    },
    textInicioSesion: {
        fontSize: 40,
        fontWeight: "600",
        color: "white"
    },
    input: {
        color: "white",
    },
    checkbox: {
        backgroundColor: "transparent",
        padding: 0
    },
    btnIngresar: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#52A5E0"
    },
    btnIngresarContainer: {
        paddingHorizontal: 0,
        marginTop: 30,
        
    },
    form: {
        gap: 10
    }
})