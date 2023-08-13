import React from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import { db } from '../config/config';

export class Atividades extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      WilliamAtividades: []
    }
  }

  componentDidMount(){
    db.ref('/WilliamAtividades').on('value', snapshot => {
      let data = snapshot.val();
      let dados = Object.values(data)
      this.setState({WilliamAtividades: dados})
    })
  }

  render() {
    return (
      <View>
      <Text style={{alignSelf: 'center'}}> O mais recente fica em cima</Text>
        { this.state.WilliamAtividades.length >= 0 ? 
            <FlatList
              inverted
              data={this.state.WilliamAtividades} 
              renderItem={( {item} ) => 
                <View>
                  <Text style={{fontSize: 20, marginLeft:20, marginBottom:5}}>
                  {item.tipo}          R${item.quantidade}</Text>
                </View>
              }
              /> : 
            <Text>{"Sem Atividades"}</Text>  }
      </View>
    );
  }
}
