import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import Home from '../screens/Home';

import StackAluno from '../screens/Alunos/StackAluno';
import StackAlunosAsyncStorage from '../screens/AlunosAsyncStorage/StackAlunosAsyncStorage';
import ListaPerfumesAsyncStorage from '../screens/ListaPerfumes/ListaPerfumesAsyncStorage';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Alunos" component={StackAluno} />
            <Drawer.Screen name="AlunosAsyncStorage" component={StackAlunosAsyncStorage} />
            <Drawer.Screen name="PerfumesAsyncStorage" component={ListaPerfumesAsyncStorage} />
        </Drawer.Navigator>
    );
}
