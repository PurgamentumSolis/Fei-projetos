# divisao de codigos:
# codigos para menu
# codigo para o jogo
# codigo do menu

#------------------------------------------------------------------ Codigos para menu-------------------------------------------------------------
import os

#funcao criar novo jogador em .txt
def criarNovoJogador():
    nome = input("Digite o nome de usuario do jogador: ")  #recebe o nome do usuario
    if os.path.isfile (nome + ".txt"):   #verificar desponibilidade do nome
        print("Usuario ja registrado!!!!")
    else:
        arquivo = open(nome + ".txt","w") # eu tentei criar uma pasta para os usuarios mas n funcionou ent desisti
        arquivo.write("0\n") # atribui valores de vitoria e derrota para 0 para novos jogadores
        arquivo.write("0")
        arquivo.close()

#funcao de excluir o .txt do jogador
def excluirJogador(): 
    nome = input("Digite o nome a ser excluido: ")
    if os.path.isfile(nome + ".txt"):  # verificar nome se existe
        print("Excluir jogador", nome)
        os.remove(nome + ".txt") # exculir nome
    else:
        print("Jogador nao existe!!!")

#funcao para ler o .txt do jogador mostrando vitorias, derotas e empates
def lerHistorico():
    nome = input("Digite o nome do jogador: ")
    if os.path.isfile(nome + ".txt"):  # verificar o .txt do usuario digitado
        arquivo = open(nome + ".txt")
        historico = arquivo.readlines()
        vitorias = int(historico[0])
        derrotas = int(historico[1])
        print("Vitorias: {}; Derrotas: {}".format(vitorias, derrotas)) # mostrar pontos
    else:
        print("Jogador nao existente")



#-------------------------------------------------------------- Codigo para o jogo----------------------------------------------------------------4
# definir tamanho da matriz
matriz = [
    [' ', ' ', ' ',' ',' ' ],
    [' ', ' ', ' ', ' ',' '],
    [' ', ' ', ' ',' ', ' '],
    [' ', ' ', ' ',' ', ' '],
    [' ', ' ', ' ',' ', ' ']
]

# funcao de marcar vitorias e derrotas
def marcarVitoria(vencedor,perdedor):
    arquivo = open(vencedor + ".txt","r")
    historico = arquivo.readlines()
    vitorias = int(historico[0]) + 1
    derrotas = int(historico[1])
    arquivo = open(vencedor + ".txt","w")
    arquivo.write("{}\n{}".format(vitorias, derrotas))
    arquivo.close()
    
    arquivo = open(perdedor + ".txt","r")
    historico = arquivo.readlines()
    vitorias = int(historico[0]) + 0
    derrotas = int(historico[1]) + 1 
    arquivo = open(perdedor + ".txt","w")
    arquivo.write("{}\n{}".format(vitorias, derrotas))
    arquivo.close()
    exit()

#definir posicao e formato do tabuleiro
def imprimirJogo(): 
    tabuleiro = """
      {} | {} | {} | {} | {} 
    ----+---+---+---+---
      {} | {} | {} | {} | {} 
    ----+---+---+---+---
      {} | {} | {} | {} | {} 
    ----+---+---+---+---
      {} | {} | {} | {} | {} 
    ----+---+---+---+---
      {} | {} | {} | {} | {}   
      
    """.format(matriz[0][0],matriz[0][1],matriz[0][2],matriz[0][3],matriz[0][4],
    matriz[1][0],matriz[1][1],matriz[1][2],matriz[1][3],matriz[1][4],
    matriz[2][0],matriz[2][1],matriz[2][2],matriz[2][3],matriz[2][4],
    matriz[3][0],matriz[3][1],matriz[3][2],matriz[3][3],matriz[3][4],
    matriz[4][0],matriz[4][1],matriz[4][2],matriz[4][3],matriz[4][4],)
    print(tabuleiro)

#movimento do jogador
def jogada(jogador,p1,p2):
    invalida = True
    if jogador == 1:
        print("Vez do O")
    else:
        print("Vez do X")
    while invalida:
        x = int(input("Linha da Jogada:  "))
        y = int(input("Coluna da Jogada:  "))
        if matriz[x][y] == ' ':
            if jogador == 1:
                matriz[x][y] = 'O'
            else:
                matriz[x][y] = 'X'
            invalida = False
        else:
            print("Jogada Inválida Insira novamente!")
            invalida = True
 # checando as linhas
    if(x==0):
        if (matriz[x+1][y] == matriz[x+2][y] and matriz [x][y] == matriz[x+3][y] ):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
                
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            
            return True

    if(x==1):
        if (matriz[x+1][y] == matriz[x+2][y] == matriz [x][y] == matriz[x+3][y] or matriz[x+1][y] == matriz[x+2][y] == matriz [x][y] == matriz[x-1][y] ):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
                
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            
            return True        

    if(x == 2):
        if (matriz[x][y] == matriz[x-1][y] == matriz[x-2][y] == matriz [x+1][y] or matriz[x][y] == matriz[x+1][y] == matriz[x+2][y] == matriz [x-1][y]):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True

    if(x==3):
        if (matriz[x][y] == matriz[x-1][y] == matriz[x-2][y] == matriz [x+1][y] or matriz[x][y] == matriz[x-1][y] == matriz[x-2][y] == matriz [x-3][y]):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True 

    if(x==4):
        if (matriz[x][y] == matriz[x-1][y] == matriz[x-2][y] == matriz [x-3][y]):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True              
 # checando as colunas
    if(y == 0):
        if matriz [x][y] == matriz [x][y+1] == matriz [x][y+2] == matriz [x][y+3]:
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True
    if(y== 1):
        if (matriz[x][y] == matriz[x][y+1] == matriz[x][y+2] == matriz [x][y+3] or matriz[x][y] == matriz[x][y+1] == matriz[x][y+2] == matriz [x][y-1] ):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True          
    if(y == 2):
        if (matriz[x][y-1] == matriz[x][y-2] == matriz [x][y]== matriz[x][y+1] or matriz[x][y] == matriz[x][y+1] == matriz[x][y+2] == matriz[x][y-1]):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True
    if (y == 3):
        if (matriz[x][y-1] == matriz[x][y-2] == matriz [x][y]== matriz[x][y+1] or matriz[x][y] == matriz[x][y-1] == matriz[x][y-2] == matriz[x][y-3]):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True
    if ( y == 4):
        if (matriz[x][y-1] == matriz[x][y-2] == matriz [x][y]== matriz[x][y-3]):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True   
 # checando os diagonis vou precisar fazer 2 regras diferentes para os que estao na parede e o para [1,1];[1,3];[3,1][3,3] que nao estao encostado na parede
    # diagonais de cima esquerdo para baixo direita
    if (x == 0  and y == 0 or x == 1 and y == 0 or x == 0 and y == 1):
        if (matriz[x+1][y+1] == matriz[x][y] == matriz[x+2][y+2] == matriz[x+3][y+3] ):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True
    if(x == 1  and y == 1): 
        if (matriz[x][y] == matriz[x+2][y+2] == matriz[x+3][y+3] == matriz[x+1][y+1] or matriz[x][y] == matriz[x+1][y+1] == matriz[x+2][y+2] == matriz[x-1][y-1]):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True

    #diagonais de baixo direita para cima esquerda 
    if(x==4  and y == 4 or x == 4 and y == 3 or x == 3 and y == 4):
        if (matriz[x][y] == matriz[x-1][y-1] == matriz[x-2][y-2] == matriz[x-3][y-3] ):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True   
    if(x == 3  and y == 3):
        if (matriz[x][y] == matriz[x-2][y-2] == matriz[x-3][y-3] == matriz[x-1][y-1] or matriz[x][y] == matriz[x-2][y-2] == matriz[x+1][y+1] == matriz[x-1][y-1]):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True   

    #diagonais de cima direita para baixo esquerda
    if(x==3  and y == 0 or x == 4 and y == 0 or x == 4 and y == 1):
        if (matriz[x][y] == matriz[x-1][y+1] == matriz[x-2][y+2] == matriz[x-3][y+3] ):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True  
    if(x==3  and y == 1):
        if ( matriz[x][y] == matriz[x-1][y+1] == matriz[x-2][y+2] == matriz[x-3][y+3] or matriz[x][y] == matriz[x-1][y+1] == matriz[x-2][y+2] == matriz[x+1][y-1] ):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True  

    #diagonais de baixo esquerda para cima direita
    if(x==0  and y == 3 or x == 0 and y == 4 or x == 1 and y == 4):
        if (matriz[x][y] == matriz[x+1][y-1] == matriz[x+2][y-2] == matriz[x+3][y-3] ):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True          
    if(x==1  and y == 3):
        if (matriz[x][y] == matriz[x+1][y-1] == matriz[x+2][y-2] == matriz[x+3][y-3] or matriz[x][y] == matriz[x+1][y-1] == matriz[x+2][y-2] == matriz[x-1][y+1]):
            if(jogador == 1):
                print("O jogador 2 ganhou!")
                marcarVitoria(p2,p1)
            else: 
                print(" O jogador 1 ganhou!")
                marcarVitoria(p1,p2)
            return True
    return False

# soclicitar e verificar nomes de jogadores
def jogo():
    p1 = input("Nome do jogador 1 (X): ")
    p2 = input("Nome do jogador 2 (O): ")
    if os.path.isfile(p1 + ".txt") and os.path.isfile(p2 + ".txt"): # verificar jogador
         print("{} e {}  sao validos" .format(p1,p2))
         print("---------------------------------------")
    else:
         print("Um dos nomes nao existe ") 
         exit() 

    #terminar o jogo
    fim_do_jogo = False
    numero_jogadas = 0
    #se for numero_jogadas for 0 eh jogada do (X) se for 1 eh jogada (O)
    while(fim_do_jogo == False and numero_jogadas < 25 ):
        fim_do_jogo = jogada(numero_jogadas %2, p1,p2)
        numero_jogadas += 1
        imprimirJogo()
    if(fim_do_jogo == False):
        print("Deu velha")

#-------------------------------------------------------------codigo do Menu-----------------------------------------------------------------------

def main ():  # menu principal
    while True:
        print()
        print("---------- Menu ----------")
        print("1 - Criar novo jogador")
        print("2 - Exibir historico")
        print("3 - Excluir Jogador")
        print("4 - Iniciar Partida (necesita de 2 jogadores ja criados)")
        print("---------------------------")

        opcao = input("Escolha uma das opcoes: ")

        if opcao == "1":
            criarNovoJogador()
        elif opcao == "2":
            lerHistorico()
        elif opcao == "3":
            excluirJogador()
        elif opcao == "4":
            jogo()                     
main()

