import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../screens/Inicio";
import Login from "../screens/Login";
import Chat from "../screens/Chat";
import Documentos from "../screens/Documentos";
import Historial from "../screens/Historial";
import { useAuth } from "../context/AuthContext";

export default function (){
    const {user} = useAuth();

    const Stack = createNativeStackNavigator();

    return <NavigationContainer theme={{...DefaultTheme, colors: {
        ...DefaultTheme.colors,
        background: "#1e2126"
    }}}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {!user ? 
                    (<Stack.Screen name="Login" component={Login}/>) :
                (<>
                    <Stack.Screen name="Inicio" component={Inicio}/>
                    <Stack.Screen name="Chat" component={Chat}/>
                    <Stack.Screen name="Documentos" component={Documentos}/>
                    <Stack.Screen name="Historial" component={Historial}/>
                </>)
            }
        </Stack.Navigator>
    </NavigationContainer>
}