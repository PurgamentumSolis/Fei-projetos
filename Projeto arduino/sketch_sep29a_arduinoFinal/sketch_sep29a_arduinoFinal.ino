int volatile interrupt = 0;
// usb de baixo
void setup() {
  pinMode(13, OUTPUT); // LED
  pinMode(A5, INPUT); // LUZ
  pinMode(3, INPUT_PULLUP); //BOTAO
  attachInterrupt(digitalPinToInterrupt(3), enviar, FALLING);
  Serial.begin(9600);
}

int zero[] = {0,0,0,0};
int um[] = {0,0,0,1};
int dois[] = {0,0,1,1};
int tres[] = {0,0,1,0};
int quatro[] = {0,1,1,0};
int cinco[] = {0,1,1,1};
int seis[] = {0,1,0,1};
int sete[] = {0,1,0,0};
int oito[] = {1,1,0,0};
int nove[] = {1,1,0,1};
int dez[] = {1,1,1,1};
int onze[] = {1,1,1,0};
int doze[] = {1,0,1,0};
int treze[] = {1,0,1,1};
int quatorze[] = {1,0,0,1};

int numeros[15][4] = {   {0,0,0,0},
                         {0,0,0,1},
                        {0,0,1,1},
                        {0,0,1,0},
                        {0,1,1,0},
                        {0,1,1,1},
                        {0,1,0,1},
                        {0,1,0,0},
                        {1,1,0,0},
                        {1,1,0,1},
                        {1,1,1,1},
                        {1,1,1,0},
                        {1,0,1,0},
                        {1,0,1,1},
                        {1,0,0,1},
                    };

int recebe[4];
//trocar analogRead(A5)<400 para > 300
int contador = 0;
int numero = 0;

int vezesEnvidas = 0;
  
void loop() {
  //Serial.println(analogRead(A5));
  //trocar aqui
  //contador = 0;
  if(analogRead(A5)>300 && contador!=4){
    while(contador<=3){
      long t = millis();
       //trocar aqui
      while(analogRead(A5)>300){};
     
      if((millis() - t) > 1000){
        Serial.println("peguei um");
        recebe[contador] = 1;
        contador++;
        Serial.println(contador);
      }
      else if((millis() - t) > 350){
        Serial.println("peguei zero");
        recebe[contador] = 0;
        contador++;
        Serial.println(contador);
        }
      else{
       continue;
      }
    }
  }
  else if(contador==4){
    Serial.println("Vetor:");
    Serial.println(recebe[0]);
    Serial.println(recebe[1]);
    Serial.println(recebe[2]);
    Serial.println(recebe[3]);
   
    if((memcmp(recebe, zero, sizeof(recebe)))==0){
    Serial.println("recebi o 0");
      if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[2][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[3][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, um, sizeof(recebe)))==0){
    Serial.println("recebi o 1");
      if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[3][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[4][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, dois, sizeof(recebe)))==0){
    Serial.println("recebi o 2");
      if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[4][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[5][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, tres, sizeof(recebe)))==0){
    Serial.println("recebi o 3");
      if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[5][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[6][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, quatro, sizeof(recebe)))==0){
    Serial.println("recebi o 4");
      if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[6][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[7][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, cinco, sizeof(recebe)))==0){
    Serial.println("recebi o 5");
      if(vezesEnvidas == 1){
        Serial.println(" final = recebi o 5");
      }
      else if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[7][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[8][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, seis, sizeof(recebe)))==0){
    Serial.println("recebi o 6");
      if(vezesEnvidas == 1){
        Serial.println(" final = recebi o 6");
      }
      else if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[8][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[9][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, sete, sizeof(recebe)))==0){
    Serial.println("recebi o 7");
      if(vezesEnvidas == 1){
        Serial.println(" final = recebi o 7");
      }
      else if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[9][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[10][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, oito , sizeof(recebe)))==0){
    Serial.println("recebi o 8");
      if(vezesEnvidas == 1){
        Serial.println(" final = recebi o 8");
      }
      else if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[10][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[11][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, nove, sizeof(recebe)))==0){
    Serial.println("recebi o 9");
      if(vezesEnvidas == 1){
        Serial.println(" final = recebi o 9");
      }
      else if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[11][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[12][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, dez , sizeof(recebe)))==0){
    Serial.println("recebi o 10");
      if(vezesEnvidas == 1){
        Serial.println(" final = recebi o 10");
      }
      else if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[12][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[13][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, onze , sizeof(recebe)))==0){
    Serial.println("recebi o 11");
      if(vezesEnvidas == 1){
        Serial.println(" final = recebi o 11");
      }
      else if(interrupt==0){
        int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[13][x];
        }
        imprimir(aux);
      }
      else{
      int aux[4];
        for(int x =0 ; x <4 ;x++){
          aux[x] = numeros[14][x];
        }
        imprimir(aux);
      }
    }
    else if((memcmp(recebe, doze , sizeof(recebe)))==0){
    Serial.println("recebi o 12");
    }
    else if((memcmp(recebe, treze, sizeof(recebe)))==0){
    Serial.println("recebi o 13");
    }
    else if((memcmp(recebe, quatorze, sizeof(recebe)))==0){
    Serial.println("recebi o 14");
    }

    contador=0;  
  }

//Serial.println(analogRead(A5)); /// lede vermelho <300 desligado
};

void imprimir(int vetor[]){
  delay(2000);
  for(int x =0 ; x <4 ;x++){
    if(vetor[x] == 1){
      digitalWrite(13,HIGH);
      delay(1500);
      digitalWrite(13,LOW); 
      delay(1500);
      Serial.println("mandei o  1");
     }
     else{
      digitalWrite(13,HIGH);
      delay(400);
      digitalWrite(13,LOW);
      delay(400);
       Serial.println("mandei o 0");
     }
    }
  vezesEnvidas++;
  contador = 0;
}

void enviar(){
  delay(100000);
  interrupt = 1;
  int primeiroEnvio[]={1,1,0,1};
  for(int x =0 ; x <4 ;x++){
    /*if(primeiroEnvio[x] == 0){
      digitalWrite(13,HIGH);
      delay(1500);
      digitalWrite(13,LOW); 
      delay(1500);  
     }
     else{
      digitalWrite(13,HIGH);
      delay(400);
      digitalWrite(13,LOW);
      delay(400);  
     }*/
     if(primeiroEnvio[x] == 0){
      digitalWrite(13,HIGH);
      delay(100000);
      digitalWrite(13,LOW);
      delay(100000); 
     }

     else{
      digitalWrite(13,HIGH);
      delay(400000);
      digitalWrite(13,LOW);
      delay(400000);  
   
     }  
  }
};
