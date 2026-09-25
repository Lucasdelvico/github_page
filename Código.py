import time

class MeusProgramas:

    def cronometro(self):
        print("\n CRONÔMETRO")
        input("Pressione ENTER para iniciar e ENTER para parar...")
        inicio = time.time()
        input("Contando...")
        fim = time.time()
        print(f"Tempo: {round(fim - inicio, 2)} segundos\n")

    def temporizador(self):
        print("\n TEMPORIZADOR")
        segundos = int(input("Segundos: "))
        for i in range(segundos, 0, -1):
            print(f"Restam: {i}s")
            time.sleep(1)
        print("acabou o tempo!\n")
 
    def calculadora_imc(self):
        print("\n CALCULADORA IMC")
        peso = float(input("Peso (kg): "))
        altura = float(input("Altura (m): "))
        imc = peso / (altura * altura)
        print(f"Seu IMC: {round(imc, 2)}\n")

    def media_notas(self):
        print("\n MÉDIA DE NOTAS")
        n1 = float(input("Nota 1: "))
        n2 = float(input("Nota 2: "))
        media = (n1 + n2) / 2
        print(f"Média final: {media}\n")

    def pasta_tempo(self):
        while True:
            print("\n[PASTA 1: manipuladores de tempo]")
            print("1 - Cronômetro")
            print("2 - Temporizador")
            print("0 - Voltar ao Menu Principal")
            opcao = input("Escolha um programa: ")

            if opcao == "1":
                self.cronometro()
            elif opcao == "2":
                self.temporizador()
            elif opcao == "0":
                break  
            else:
                print("Opção inválida!")

    def pasta_calculadoras(self):
        while True:
            print("\n[PASTA 2: Calculadoras]")
            print("1 - Calculadora de IMC")
            print("2 - Média de Notas")
            print("0 - Voltar ao Menu Principal")
            opcao = input("Escolha um programa: ")

            if opcao == "1":
                self.calculadora_imc()
            elif opcao == "2":
                self.media_notas()
            elif opcao == "0":
                break  
            else:
                print("Opção inválida!")

    def menu_principal(self):
        while True:
            print("\nPROGRAMAS ")
            print("1 - Abrir Pasta: manipuladores de Tempo")
            print("2 - Abrir Pasta: Calculadoras")
            print("0 - Fechar tudo")
            opcao = input("Escolha uma pasta: ")

            if opcao == "1":
                self.pasta_tempo()
            elif opcao == "2":
                self.pasta_calculadoras()
            elif opcao == "0":
                print("encerrando programa...")
                break
            else:
                print("Pasta não encontrada!")

software = MeusProgramas()
software.menu_principal()