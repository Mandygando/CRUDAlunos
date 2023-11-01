import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import Home from '../screens/Home';

import StackAluno from '../screens/Alunos/StackAluno';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Alunos" component={StackAluno} />
        </Drawer.Navigator>
    );
}
