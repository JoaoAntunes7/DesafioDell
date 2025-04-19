#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <stdbool.h>

typedef struct StartUp {
    char nome[100];
    char slogan[200];
    int ano;
    int pontos, pitches, bugs, tracoes, investidores, fakeNews;
    bool vivo; //verifica se ainda está no torneio
};

void clrscr(){
    system("@cls||clear");
}

void evento(struct StartUp s[], int i, int evento){
    i--;
    switch(evento) {
        case 1: s[i].pontos += 6; s[i].pitches++; break;
        case 2: s[i].pontos -= 4; s[i].bugs++; break;
        case 3: s[i].pontos += 3; s[i].tracoes++; break;
        case 4: s[i].pontos -= 6; s[i].investidores++; break;
        case 5: s[i].pontos -= 8; s[i].fakeNews++; break;

        case -1: break;
    }
}

void administrarBatalha(struct StartUp* s, int escolha){
    //fazer condição pra n pegar batalha inexistente
    clrscr();
    printf("Pitch Convicente (1)\nProduto com Bugs(2)\nBoa Tração de Usuários(3)\nInvestidor Irritado(4)\nFake News no Pitch(5)\n");
    int event, startup;
    switch (escolha){
    case 1:
        printf("Batalha 1\n");
        printf("%s[%d] VS %s[%d]\n", s[0].nome, s[0].pontos, s[1].nome, s[1].pontos);
        printf("Escolha a Start Up e um determinado evento\n Ex: 1 (StartUp 1) 3 (Boa Tração)\n");
        scanf("%d %d", startup, event);
        evento(s, startup, event);
        break;
    
    default:
        break;
    }
}

void gerarBatalhas(struct StartUp s[], int n, int round){
    for(int i=0; i<n; i++){ //troca a posição de cada startup aleatoriamente
        int j = rand() % n;
        struct StartUp aux = s[i];
        s[i] = s[j];
        s[j] = aux;
    }

    for(int i=0; i<n; i++){
        printf("2. %s - %d\n", s[i].nome, s[i].pontos);
    }

    int batalha=1;
    int vencedor, escolha;

    printf("Round %d\n", round);
    for(int i=0; i<n; i+=2){
        printf("Batalha %d: %s[%d] VS %s[%d]\n", (batalha++), s[i].nome, s[i].pontos, s[i+1].nome, s[i+1].pontos);
    }
    //loop
    printf("Escolha a batalha que deseja administar: ");
    scanf("%d", &escolha);
    administrarBatalha(s, escolha); //ta enviando *s = struct StartUp s[] !!

    for(int i=0; i<n; i+=2){ //forma as batalhas tendo em conta o número de vivos/2 . No console -> a[10] VS b[2]
       
        //scanf("%d", &vencedor);
        clrscr();
        if(vencedor == 1){
            s[i+1].vivo = 0;
            s[i].pontos += 30;
        } else {
            s[i].vivo = 0;
            s[i+1].pontos += 30;
        }
    }
}



int compare(const void *a, const void *b){ //função para comparar os pontos das start ups 
    struct StartUp *s1 = (struct StartUp *)a;
    struct StartUp *s2 = (struct StartUp *)b;

   return (s2->pontos - s1->pontos);
}

int main(){
    int numTotal = 0; //número fixo de start ups
    int numVivos=0;   //número variável de start ups
    struct StartUp s[8]; //cria um array de 8 posições (nº max) de um objeto StartUp
    struct StartUp total[8];
    
    clrscr();
    while(1){ //!!depois adicionar sistema para usuário decidir se quer adicionar mais de 4 até 8
        if(numTotal == 4)
            break;

        printf("Crie as Start Ups (no mínimo 4 e no máximo 8) | Start Ups criadas: %d\n", numTotal);
        printf("Nome: ");
        scanf("%s", &s[numTotal].nome);
        printf("Slogan: ");
        scanf(" %s", &s[numTotal].slogan);
        printf("Ano: ");
        scanf("%d", &s[numTotal].ano);
        clrscr();
        s[numTotal].pontos = 70;
        s[numTotal].vivo = 1;
        numTotal++;

    } 

    if(numTotal % 4 != 0 && numTotal > 8){ //número de startups deve ser múltiplo de 4 e menor que 8 
        printf("Número inadequado de StartUps!\n");
        return 1;
    }

    numVivos = numTotal; //número de start ups vivas recebe o número de start ups cadastradas
    int n=0; 
    int round=1;
    while(1){ //enquanto não tiver um vencedor

        gerarBatalhas(s, numVivos, round);

        int ind=0;
        for(int i=0; i<numVivos; i++){ //reorganiza s com as startups vivas
            if(s[i].vivo){ //se StartUp está viva
                s[ind++] = s[i]; //s[0...] <- s.vivo
            } else {
                total[n++] = s[i];  
            }
        } //da pra mudar i<numTotal (nº total de participantes msm mortos) para salvar seus resultados, caso estejam mortos eles seriam salvos no s[numVivos++]
        numVivos = ind; //número de vivos ajustado

        for(int i=0; i<numTotal; i++){
            printf("%s - %d\n", s[i].nome, s[i].pontos);
        }
   
        //qsort(s, numVivos, sizeof(struct StartUp), compare); //ordena em ordem decrescente, usando o algoritmo quick sort da biblioteca <stdlib.h>

        if(numVivos == 1){
            total[n] = s[0]; //última posição do total recebe o ganhador (último vivo)
            qsort(total, numTotal, sizeof(struct StartUp), compare); //ordena em ordem decrescente, usando o algoritmo quick sort da biblioteca <stdlib.h>
            printf("O vencedor é %s, com %d pontos!\nSlogan: %s\n", total[0].nome, total[0].pontos, total[0].slogan);
            printf("===========================================================\n");
            printf("Lista Final:\n");
            for(int i=0; i<numTotal; i++){
                printf("%d. %s - %d pontos\n", (i+1), total[i].nome, total[i].pontos);
                printf("  Pitches [ %d ] | Bugs [ %d ] | Trações [ %d ] | Investidores [ %d ] | Fake News [ %d ]\n", total[i].pitches, total[i].bugs, total[i].tracoes, total[i].investidores, total[i].fakeNews);
            }
            break;
        }

       round++;
    }

    return 0;
}