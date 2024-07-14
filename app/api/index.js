import axios from "axios";

const base = "http://192.168.100.51:8000"

export function obtenerHistorialDeChats(){
    return axios.get(`${base}/list_conversations`);
}

export function hacerPregunta(params){
    return axios.post(`${base}/ask`, params);
}

export function obtenerHistorialDeConversacion(params){
    return axios.post(`${base}/get_conversation`, params)
}

export function obtenerDocumentos(params){
    return axios.get(`${base}/list_uploaded_pdfs`, params);
}

export function subirDocumento(params){
    return axios.post(`${base}/upload_pdfs`, params, {headers: {'Content-Type': 'multipart/form-data'}})
}

export function borrarDocumento(params){
    return axios.post(`${base}/delete_pdf`, params);
}

export function iniciarSesion(params){
    return axios.post(`${base}/login`, params);
}

export function cerrarSesion(){
    return axios.get(`${base}/logout`);
}

export function obtenerHistorialDeConversaciones(){
    return axios.get(`${base}/get_conversations`);
}