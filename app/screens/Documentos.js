import { SafeAreaView } from "react-native-safe-area-context";
import NavHeader from "../components/NavHeader";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { borrarDocumento, obtenerDocumentos, subirDocumento } from "../api";
import IonIcon from "react-native-vector-icons/Ionicons";
import * as DocumentPicker from 'expo-document-picker';
import { Button } from "@rneui/themed";
import Cargando from "../components/Cargando";
import { showMessage } from "react-native-flash-message";

export default function Documentos(){
    const [documentos, setDocumentos] = useState([]);
    const [pickedDocument, setPickedDocument] = useState();
    const [mostrarCargando, setMostrarCargando] = useState(false);
    const [textoCargando, setTextoCargando] = useState('Subiendo documento');

    useEffect(() => {
        obtenerDocumentos()
        .then(data => {
            setDocumentos(data.data.pdf_files)
        })
        .catch(error => console.log(error))
    },[])

    function onSeleccionarDocumento(){
        if(!pickedDocument){
            DocumentPicker.getDocumentAsync({type: "application/pdf"})
            .then(result => {
                if(!result.canceled){
                    setPickedDocument(result);
                }
            })
            .catch(error => console.log(error))
        } else {
            setMostrarCargando(true)
            setTextoCargando('Subiendo documento');

            const formData = new FormData();
            formData.append("files", {
                uri: pickedDocument.assets[0].uri,
                name: pickedDocument.assets[0].name,
                type: "application/pdf"
            });

            subirDocumento(formData)
            .then((data) => {
                showMessage({
                    message: "Completado",
                    description: "Se ha subido el documento correctamente",
                    type: "success",
                    backgroundColor: "#52A5E0" , 
                })
                setPickedDocument(undefined);
                obtenerDocumentos()
                .then(data => {
                    setDocumentos(data.data.pdf_files)
                })
                .catch(error => {console.log(error)})
            })
            .catch(error => {
                showMessage({
                    message: "Oops!",
                    description: "Se ha producido un error al intentar subir el documento",
                    type: "warning",
                    backgroundColor: "#52A5E0"
                })
            })
            .finally(() => setMostrarCargando(false));
        }
    }

    function onDeleteDocument(pdf_name){
        
        setMostrarCargando(true)
        setTextoCargando('Borrando documento');

        borrarDocumento({pdf_name})
        .then(() => {
            showMessage({
                message: "Completado",
                description: "Se ha eliminado el documento correctamente",
                type: "success",
                backgroundColor: "#52A5E0"
            })
            setPickedDocument(undefined);
                obtenerDocumentos()
                .then(data => {
                    setDocumentos(data.data.pdf_files)
                })
                .catch(error => console.log(error))
        })
        .catch(error => {
            showMessage({
                message: "Oops!",
                description: "Se ha producido un error al intentar eliminar el documento",
                type: "warning",
                backgroundColor: "#52A5E0"
            })
        })
        .finally(() => setMostrarCargando(false));
    }

    return <SafeAreaView style={styles.layout}>
        <NavHeader titulo="Documentos"/>
        <ScrollView contentContainerStyle={{padding: 20, gap: 40}}>
            <View style={styles.subirContainer}>
                <Text style={styles.txtSubir}>Subir Documento</Text>
               <View style={styles.pickedDocument}>
                    {pickedDocument && <IonIcon name="document-text-sharp" size={48}/>}
                    <Text style={styles.nombreDoc}>
                        {pickedDocument ? pickedDocument.assets[0].name : 'Aun no se ha seleccionado ningún documento'}</Text>
               </View>
                <Button onPress={onSeleccionarDocumento} buttonStyle={styles.botonSeleccionar}>{pickedDocument ? "Subir documento" : "Seleccionar"}</Button>
            </View>
            <View>
                <Text style={styles.txtDocs}>Lista de Documentos</Text>
                <View style={styles.documentos}>
                    {documentos.map((doc, key) => <Pressable key={key} style={styles.documentoRow}>
                        <View style={styles.docInfo}>
                            <IonIcon name="document-text-sharp" color="#1e2126" size={24}/>
                            <Text style={styles.docName}>{doc}</Text>
                        </View>
                        <IonIcon name="trash" color="#52A5E0" size={24} onPress={() => onDeleteDocument(doc)}/>
                    </Pressable>)}
                </View>
            </View>
        </ScrollView>
        <Cargando visible={mostrarCargando} texto={textoCargando}/>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    subirContainer: {
        backgroundColor: "#414449",
        padding: 20,
        borderRadius: 10,
        gap: 10
    },
    txtSubir: {
        fontSize: 32,
        fontWeight: "600",
        color: "white" 
    },
    txtDocs: {
        fontSize: 32,
        fontWeight: "600",
        color: "white"

    },
    documentos: {
        gap: 10,
        marginTop: 20
    },
    documentoRow: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },
    docInfo: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    docName: {
        fontWeight: "500",
        fontSize: 16
    },
    nombreDoc: {
        fontWeight: "500",
        fontSize: 18,
    },
    pickedDocument: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    botonSeleccionar: {
        backgroundColor: "#52A5E0"
    }
})