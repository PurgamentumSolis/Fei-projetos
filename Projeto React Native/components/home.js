import React from 'react';
import { View, Button, TextInput, Image, StyleSheet,Text, FlatList } from 'react-native';
import { db } from '../config/config';
import pp from '../assets/pp.png';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.name = "William"
    this.state = {
      Contas:[]
    }
  }
  
  componentDidMount(){
    db.ref('/contas')
    .orderByChild("name")
    .equalTo(this.name)
    .on('value', snapshot => {
      let data = snapshot.val();
      let dados = Object.values(data)
      this.setState({Contas: dados})
    })
  }

  render() {
    return (
      <View>
        <Image source = {pp}
        /*mudar abaixo configs da foto*/
          style={{width: 70,
           height: 70,
           borderRadius: 40,
           overflow: "hidden",
           marginLeft: 10,
           marginTop: 10}}
           /> 

        <Text style= {{ position: 'absolute',
        /*mudar nome e posicao abaixo*/
           fontSize: 20,
           marginLeft: 125,
           marginTop: 25
           }}>William </Text>
          <Text> </Text>

        {this.state.Contas.length >= 0 ?
        this.state.Contas.map(object => (
          <Text style={{fontSize: 30, borderTopColor:"red", borderTopWidth: StyleSheet.hairlineWidth }}>
          Saldo: R$ {object.saldo}</Text>)):
          <Text>"Erro no sistema"</Text>}

        
      </View>
    );
  }
}






