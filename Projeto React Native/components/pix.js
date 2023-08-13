import React from 'react';
import {
  View,
  Text,
  Button,
  Animated,
  TextInput,
  Dimensions,
  Easing,
} from 'react-native';
import { db } from '../config/config';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export class Pix extends React.Component {
  constructor(props) {
    super(props);
    this.saldo = 0;
    this.name = 'William';
    this.destinatario = '';
    this.meuSaldo = 0;
    this.achei = false;
    this.state = {
      valor: new Animated.Value(0),
      dimensao: Dimensions.get('window'),
    };
    this.som = new Audio.Sound();
    this.som.loadAsync(require('../assets/ding.wav'))
  }

  enviar() {
    if (this.saldo == 0 || this.saldo < 0 || this.destinatario == '') {
      alert('Digite um saldo válido/Nome válido');
      return;
    }
    db.ref('/contas')
      .orderByChild('name')
      .equalTo(this.name)
      .once('value', (snapshot) => {
        let data = snapshot.val();
        if (data == null) {
          alert('Crie uma conta para realizar o pix');
        } else {
          const atual = Object.values(data)[0].saldo;
          const futuro = atual - this.saldo;
          if (futuro < 0) {
            alert('saldo insuficiente');
            return;
          }
          this.destinatarioExiste();
          if (this.achei === true) {
            db.ref(`contas/${Object.keys(data)[0]}`).update({ saldo: futuro });
            this.atividades();
            alert('Pix Realizado com sucesso');
            this.tocar();
          }
        }
        this.achei = false;
      });
  }

  destinatarioExiste() {
    db.ref('/contas')
      .orderByChild('name')
      .equalTo(this.destinatario)
      .once('value', (snapshot) => {
        let data = snapshot.val();
        if (data == null) {
          alert('Destinatário não encontrado');
        } else {
          try {
            const atual = Object.values(data)[0].saldo;
            console.log(Object.keys(data)[0]);
            const futuro = atual + this.saldo;
            db.ref(`contas/${Object.keys(data)[0]}`).update({ saldo: futuro });
            this.achei = true;
          } catch (err) {
            console.log(err);
          }
        }
      });
  }

  atividades() {
    db.ref(`/${this.name}Atividades`).push({
      tipo: 'PIX enviado',
      quantidade: this.saldo,
    });
    db.ref(`/${this.destinatario}Atividades`).push({
      tipo: 'PIX recebido',
      quantidade: this.saldo,
    });
  }

  animacao() {
    
    this.state.valor.setValue(0);
    Animated.timing(this.state.valor, {
      toValue: 150,
      duration: 3000,
      easing: Easing.linear,
    }).start();
  }

  tocar(){
    this.som.setPositionAsync(0);
    this.som.playAsync();
  }
  

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          padding: 50,
        }}>
        <View>
          <Text>Para realizar o PIX;</Text>
          <Text>Digite o nome do destinatário</Text>
          <Text>Digite o valor desejado</Text>
          <View
            style={{
              marginTop: 100,
              marginBottom: 100,
            }}>
            <Text>Digite o nome do destinatário</Text>
            <View
              style={{
                marginTop: 10,
              }}>
              <TextInput
                onFocus={false}
                placeholderTextColor="#D3D3D3"
                style={{
                  fontSize: 22,
                  borderColor: 'gray',
                  borderBottomWidth: 1,
                  outlineStyle: 'none',
                }}
                placeholder="Nome"
                onChangeText={(texto) => {
                  this.destinatario = texto;
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginBottom: 100,
            }}>
            <Text>Digite a quantidade</Text>
            <View
              style={{
                marginTop: 10,
              }}>
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
          </View>
        </View>
        <View>
          <Button
            title="Enviar"
            onPress={() => {
              this.animacao();
              this.enviar();
            }}
          />
        </View>
        <View
          style={{
            marginTop:20,
            flex: 1,
            flexDirection: 'row',
          }}>
          <MaterialCommunityIcons name="wallet" color={'black'} size={32} />
          <Animated.View
            style={{
              width: 32,
              height: 32,
              marginLeft: this.state.valor,
            }}>
            <MaterialCommunityIcons
              name="cash-multiple"
              color={'black'}
              size={32}
            />
          </Animated.View>
         <MaterialCommunityIcons name="account-hard-hat" color={'black'} size={32} />
        </View>
      </View>
    );
  }
}