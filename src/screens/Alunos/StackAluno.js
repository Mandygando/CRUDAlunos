import { createStackNavigator } from '@react-navigation/stack';
import FormAlunos from './FormAlunos';
import ListaAlunos from './ListaAlunos';

const Stack = createStackNavigator();

export default function StackAlunos() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ListaAlunos">
            <Stack.Screen name="ListaAlunos" component={ListaAlunos} />
            <Stack.Screen name="FormAlunos" component={FormAlunos} />
        </Stack.Navigator>
    );
}
