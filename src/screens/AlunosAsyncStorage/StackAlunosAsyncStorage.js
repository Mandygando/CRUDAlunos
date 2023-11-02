import { createStackNavigator } from '@react-navigation/stack';
import FormAlunosAsyncStorage from './FormAlunosAsyncStorage';
import ListaAlunosAsyncStorage from './ListaAlunosAsyncStorage';

const Stack = createStackNavigator();

export default function StackAlunosAsyncStorage() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ListaAlunosAsyncStorage">
            <Stack.Screen name="ListaAlunosAsyncStorage" component={ListaAlunosAsyncStorage} />
            <Stack.Screen name="FormAlunosAsyncStorage" component={FormAlunosAsyncStorage} />
        </Stack.Navigator>
    );
}
