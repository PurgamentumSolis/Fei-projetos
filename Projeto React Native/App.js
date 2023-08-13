import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './components/home';
import { Deposito } from './components/deposito';
import { Atividades } from './components/atividades';
import { Pix } from './components/pix';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const Navegacao = createBottomTabNavigator();

class App extends React.Component{
  render(){
    return( 
      <NavigationContainer>
        <Navegacao.Navigator>
          <Navegacao.Screen name="Home" component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={32} />)
          }} 
          />
          <Navegacao.Screen name="Deposito" component={ Deposito} 
          options={{
            tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="wallet-plus" color={color} size={32} />)
          }}
          />
          <Navegacao.Screen name="Pix" component={Pix} 
          options={{
            tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cash-fast" color={color} size={32} />)
          }}
          />
          <Navegacao.Screen name="Atividades" component={Atividades} 
          options={{
            tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="clipboard-text-clock-outline" color={color} size={32} />)
          }}
          />
        </Navegacao.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;