import time

class Cronometro:

    def executar(self):
        print("\n CRONÔMETRO")
        input("Pressione ENTER para iniciar e ENTER para parar...")
        inicio = time.time()
        input("Contando...")
        fim = time.time()
        print(f"Tempo: {round(fim - inicio, 2)} segundos\n")


class Temporizador:

    def executar(self):
        print("\n TEMPORIZADOR")
        segundos = int(input("Segundos: "))
        for i in range(segundos, 0, -1):
            print(f"Restam: {i}s")
            time.sleep(1)
        print("Acabou o tempo!\n")


class CalculadoraIMC:

    def executar(self):
        print("\n CALCULADORA IMC")
        peso = float(input("Peso (kg): "))
        altura = float(input("Altura (m): "))
        imc = peso / (altura * altura)
        print(f"Seu IMC: {round(imc, 2)}\n")


class MediaNotas:

    def executar(self):
        print("\n MÉDIA DE NOTAS")
        n1 = float(input("Nota 1: "))
        n2 = float(input("Nota 2: "))
        media = (n1 + n2) / 2
        print(f"Média final: {media}\n")


class Menu:

    def __init__(self):
        self.cronometro = Cronometro()
        self.temporizador = Temporizador()
        self.imc = CalculadoraIMC()
        self.media = MediaNotas()

    def pasta_tempo(self):
        while True:
            print("\n[PASTA 1: Tempo]")
            print("1 - Cronômetro | 2 - Temporizador | 0 - Voltar")
            opcao = input("Escolha: ")

            if opcao == "1":
                self.cronometro.executar()
            elif opcao == "2":
                self.temporizador.executar()
            elif opcao == "0":
                break

    def pasta_calculadoras(self):
        while True:
            print("\n[PASTA 2: Calculadoras]")
            print("1 - IMC | 2 - Média de Notas | 0 - Voltar")
            opcao = input("Escolha: ")

            if opcao == "1":
                self.imc.executar()
            elif opcao == "2":
                self.media.executar()
            elif opcao == "0":
                break

    def principal(self):
        while True:
            print("\n=== MENU PRINCIPAL ===")
            print("1 - Tempo | 2 - Calculadoras | 0 - Sair")
            opcao = input("Escolha: ")

            if opcao == "1":
                self.pasta_tempo()
            elif opcao == "2":
                self.pasta_calculadoras()
            elif opcao == "0":
                print("Encerrando...")
                break

app = Menu()
app.principal()
