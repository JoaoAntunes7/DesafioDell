#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <stdbool.h>

#define MAX_STARTUPS 8
#define LINHAS 40

typedef struct StartUp{
    char nome[100];
    char slogan[200];
    int ano;
    int pontos, pitches, bugs, tracoes, investidores, fakeNews;
    bool vivo; //verifica se ainda está no torneio
};

void startup_new(struct StartUp* s, char nome[], char slogan[], int ano){ //construtor da StartUp 
    strcpy(s->nome, nome);
    strcpy(s->slogan, slogan);
    s->ano = ano;
    s->pontos = 70;
    s->pitches = 0;
    s->bugs = 0;
    s->tracoes = 0;
    s->investidores = 0;
    s->fakeNews = 0;
    s->vivo = 1;
}

typedef struct Batalha{
    struct StartUp s1;
    struct StartUp s2;
    bool ganhador;
};

void batalha_new(struct Batalha* b, struct StartUp s1, struct StartUp s2){ //construtor da Batalha
    b->s1 = s1;
    b->s2 = s2;
    b->ganhador = 0;
}

void clrscr(){
    system("@cls||clear");
}

void evento(struct StartUp* s, int evento){
    switch(evento) {
        case 1: s->pontos += 6; s->pitches++; break;
        case 2: s->pontos -= 4; s->bugs++; break;
        case 3: s->pontos += 3; s->tracoes++; break;
        case 4: s->pontos -= 6; s->investidores++; break;
        case 5: s->pontos -= 8; s->fakeNews++; break;
    }
}

void sharkFight(struct Batalha* b){ //decide aleatoriamente o vencedor, dando +2 pontos
    bool r = rand() % 2; //número entre 0 e 1
    if(!r){
        b->s1.pontos += 32;
        b->s2.vivo = 0;
    } else {
        b->s2.pontos += 32;
        b->s1.vivo = 0;
    }
}

void administrarBatalha(struct Batalha b[], int escolha){
    int event, num;
    int ind = escolha -1;

    while(1){
        clrscr(); //limpa tela
        printf("* Pitch Convicente (1)\n* Produto com Bugs(2)\n* Boa Tração de Usuários(3)\n* Investidor Irritado(4)\n* Fake News no Pitch(5)\n* Sair(-1 x)");
        printf("->Batalha %d<-\n", escolha);
        printf("-- %s[%d] VS %s[%d] --\n", b[ind].s1.nome, b[ind].s1.pontos, b[ind].s2.nome, b[ind].s2.pontos);
        printf("Escolha a Start Up e um determinado evento\nEx: 1 (StartUp 1) 3 (Boa Tração)\n");
        scanf("%d %d", &num, &event);
        if(num == -1){
            if(b[ind].s1.pontos > b[ind].s2.pontos){
                b[ind].s1.pontos += 30;
                b[ind].s2.vivo = 0;
            } else if(b[ind].s1.pontos < b[ind].s2.pontos) {
                b[ind].s2.pontos += 30;
                b[ind].s1.vivo = 0;
            } else {
                sharkFight(&b[ind]); 
            }
            b[ind].ganhador = 1;
           break;
        }
        if(num == 1){
            evento(&b[ind].s1, event);  //altera a 1ª startup da batalha
        } else if(num == 2) {
            evento(&b[ind].s2, event);  //altera a 2ª startup da batalha
        }
    }
}

void gerarBatalhas(struct StartUp s[], int n, int round){
    struct Batalha b[MAX_STARTUPS/2];
    int escolha;
    int ind=0;
    int batalhasDecididas = 0;

    for(int i=0; i<n; i++){ //troca a posição de cada startup aleatoriamente
        int j = rand() % n;
        struct StartUp aux = s[i];
        s[i] = s[j];
        s[j] = aux;
    }

    for(int i=0; i<n; i+=2){ //incializa os valores de b
       batalha_new(&b[ind++], s[i], s[i+1]);
    }

    while(1){
        if(batalhasDecididas == (n/2)) 
        break;
        clrscr(); //limpa tela
        printf("Round %d\n", round);
        for(int i=0; i<(n/2); i++){ //forma as batalhas tendo em conta o número de vivos/2 . No console -> a[10] VS b[2]
            if(b[i].ganhador != 1){
                printf("Batalha %d: %s[%d] VS %s[%d]\n", (i+1), b[i].s1.nome, b[i].s1.pontos, b[i].s2.nome, b[i].s2.pontos);
            } else {
                printf("Batalha %d já decidida: %s[%d] VS %s[%d]\n", (i+1), b[i].s1.nome, b[i].s1.pontos, b[i].s2.nome, b[i].s2.pontos);
            }
        }

        printf("Escolha a batalha que deseja administar: ");
        scanf("%d", &escolha);
        if(b[escolha-1].ganhador || escolha<1 || escolha >4) //não repete batalha já administrada e não pega batalha não existente
            continue;
        administrarBatalha(b, escolha); 
        batalhasDecididas++;
    }

    ind = 0;
    for(int i=0; i<n; i+=2){
        s[i] = b[ind].s1;
        s[i+1] = b[ind++].s2;
    }
}

void lerString(char* c, int tam) { //converter char em string 
    fgets(c, tam, stdin);
    c[strcspn(c, "\n")] = '\0';    //remove \n
}

int compare(const void *a, const void *b){ //função para comparar os pontos das start ups 
    struct StartUp *s1 = (struct StartUp *)a;
    struct StartUp *s2 = (struct StartUp *)b;

   return (s2->pontos - s1->pontos);
}

void leArquivo(struct StartUp geradas[]){
    int ind = 0;   //indice das linhas

    FILE *file = fopen("startups.txt", "r");
    if(!file){ //erro ao abrir o arquivo
        printf("Erro ao abrir o Arquivo!");
        return;
    }
    char linha[100];
    while(fgets(linha, sizeof(linha), file)){
        char nome[50];
        char slogan[100];
        int ano;

        char *token = strtok(linha, ";");
        if (!token) continue;
        strcpy(nome, token);
        nome[strcspn(nome, "\n")] = '\0';

        token = strtok(NULL, ";");
        if (!token) continue;
        strcpy(slogan, token);
        slogan[strcspn(slogan, "\n")] = '\0';

        token = strtok(NULL, ";");
        if (!token) continue;
        ano = atoi(token);

        startup_new(&geradas[ind++], nome, slogan, ano);
    }
    fclose(file);
}

int main(){
    srand(time(NULL));
    int numTotal = 0; //número de todas as start ups criadas
    int numVivos=0;   //número das start ups restantes
    struct StartUp s[MAX_STARTUPS]; //cria um array de 8 posições (nº max) de um objeto StartUp -> armazena startup vivas
    struct StartUp total[MAX_STARTUPS]; //cria um array para armazenar todas as startups e organiza-las 
    
    while(1){
        if(numTotal == 8)
            break;

        clrscr();
        int escolha,num;
        printf("Crie as Start Ups (4 ou 8) | Start Ups criadas: %d\n", numTotal);
        printf("1.Gerar uma Start Up\n2.Cadastrar uma Start Up\n3.Pronto\n");
        printf("Escolha: ");
        scanf("%d", &escolha);
        if(escolha == 1){
            printf("Número de Start Ups a serem geradas: ");
            scanf("%d", &num);
            if((MAX_STARTUPS - numTotal - num) >= 0){ //8 - nº de start ups criadas - nº de start ups a serem geradas
                struct StartUp read[LINHAS]; 
                leArquivo(read);

                for(int i=0; i<num; i++){ //armazena start ups aleatórias do txt no s
                    int j = rand() % LINHAS; //pega um número aleatorio entre 0 e 40-1
                    if(read[j].vivo){ //para não repetir start ups
                        s[numTotal] = read[j];
                        read[j].vivo = 0;  
                        numTotal++;
                    } else {
                        i--; //repete o loop até achar alguma start up não repetida
                    }
                }
            } else {
                //nº excedeu o número max de start ups
            }
        } else if(escolha == 2) {
            char nome[50];
            char slogan[100];
            int ano;
            getchar(); //usado para limpar \n deixado no buffer e conseguir usar lerString()
            printf("Nome: ");
            lerString(nome, sizeof(nome));      
            printf("Slogan: ");
            lerString(slogan, sizeof(slogan));  
            printf("Ano: ");
            scanf("%d", &ano);
            getchar(); 
            startup_new(&s[numTotal], nome, slogan, ano);
            numTotal++;

        } else if(escolha == 3){
            if((numTotal % 4 == 0) && (numTotal <= 8)){
                break;
            } else {
               //nº inadequado de start ups
            } 
        } else {
            //nº de escolha inexistente
        }
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

        if(numVivos == 1){
            total[n] = s[0]; //última posição do total recebe o ganhador (último vivo)
            qsort(total, numTotal, sizeof(struct StartUp), compare); //ordena em ordem decrescente, usando o algoritmo quick sort da biblioteca <stdlib.h>
            clrscr(); //limpa tela
            printf("O vencedor é %s, com %d pontos!\nSlogan: %s\nAno: %d\n", total[0].nome, total[0].pontos, total[0].slogan, total[0].ano);
            printf("===========================================================\n");
            printf("Lista Final:\n");
            for(int i=0; i<numTotal; i++){
                printf("%d. %s - %d pontos\n", (i+1), total[i].nome, total[i].pontos);
                printf("  Pitches [ %d ] | Bugs [ %d ] | Trações [ %d ] | Investidores [ %d ] | Fake News [ %d ]\n  ", total[i].pitches, total[i].bugs, total[i].tracoes, total[i].investidores, total[i].fakeNews);
            }
            break;
        }

       round++;
    }

    return 0;
}
