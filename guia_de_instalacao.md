# Guia de Instalação
###### 1 - Primeiro leia o nosso [guia de contribuição](CONTRIBUTING.md) onde são explicados todos os passos para contribuir. Ahh, não esquece de ler nosso [código de conduta](CODE_OF_CONDUCT.md).
Para poder executar e contribuir com o projeto, você deve ter o [Docker](https://docs.docker.com/install/) e o [Docker Compose](https://docs.docker.com/compose/install/) em sua máquina.
Caso reste duvidas você também pode entrar em contato conosco criando uma issue ou pelo email dulce.application@gmail.com.

###### 2 - Em seguida siga os comandos para executar o ambiente de produção:

```bash
$ cd 2018.1-Dulce_User/Environments/Development
```
```bash
$ sudo docker-compose -f build.yml  build
```

```bash
$ sudo docker-compose -f start-deps.yml up -d
```

```bash
$ sudo docker-compose -f start-login.yml up
```
Pronto o seu ambiente de trabalho já está funcionando, para acessar o ambiente de teste pelo terminal digite o seguinte comando:

```bash
$ sudo docker exec -it **NomeDoServiço** bash
```

#### Para rodar e escrever os testes você deve abrir o docker de testes, para isso siga as seguintes instruções:


```bash
$ cd 2018.1-Dulce_User/Environments/Test
```
```bash
$ sudo docker-compose -f build.yml  build
```
```bash
$ sudo docker-compose -f start-login.yml up -d
```
Pronto o seu ambiente de trabalho já está funcionando, acessar o ambiente de teste pelo terminal digite o seguinte comando:

```bash
$ sudo docker exec -it **NomeDoServiço** bash
```

#### Para fechar e encerrar os dockers utilize o seguinte comando:
OBS: esse comando para todos os dockers que estão rodando em sua máquina.

```bash
$ sudo docker stop $(sudo docker ps -q)
```

## OBS
Os serviços estão rodando em background devido a flag ```-d ```, se desejar rodar o docker e verificar o andamento basta retirar essa flag da execução.
