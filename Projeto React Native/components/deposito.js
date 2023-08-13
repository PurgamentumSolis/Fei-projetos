import React from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import { db } from '../config/config';
import { Audio } from 'expo-av';

export class Deposito extends React.Component {
  constructor(props) {
    super(props);
    this.saldo = 0;
    this.name = 'William';
    this.som = new Audio.Sound();
    this.som.loadAsync(require('../assets/ding.wav'))
  }

  tocar(){
    this.som.setPositionAsync(0);
    this.som.playAsync();
  }

  depositar() {
    if (this.saldo == 0 || this.saldo < 0) {
      alert('Digite um saldo válido');
      return;
    }
    db.ref('/contas')
      .orderByChild('name')
      .equalTo(this.name)
      .once('value', (snapshot) => {
        let data = snapshot.val();
        if (data == null) {
          this.criar();
          this.atividades();
          alert('Conta criada');
        } else {
          const atual = Object.values(data)[0].saldo;
          const futuro = atual + this.saldo;
          db.ref(`contas/${Object.keys(data)[0]}`).update({ saldo: futuro });
          this.atividades();
          alert('Saldo atualizado');
          this.tocar();
        }
      });
  }

  atividades() {
    db.ref(`/${this.name}Atividades`).push({
      tipo: 'depósito',
      quantidade: this.saldo,
    })
  }

  criar() {
    db.ref('/contas').push({
      name: this.name,
      saldo: this.saldo,
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          padding:50
        }}>
        <View>
          <View
            style={{
              marginBottom: 100,
            }}>
            <Text>Digite a quantidade</Text>
          </View>
          <TextInput
            onFocus={false}
            placeholderTextColor="#D3D3D3"
            style={{
              fontSize: 22,
              borderColor: 'gray',
              borderBottomWidth: 1,
              outlineStyle: 'none',
            }}
            keyboardType="numeric"
            placeholder="R$0.00"
            onChangeText={(texto) => {
              this.saldo = Number(texto);
            }}
          />
        </View>
        <View>
          <Button title="Depositar" onPress={() => this.depositar()} />
        </View>
      </View>
    );
  }
}