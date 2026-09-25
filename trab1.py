import time
from abc import ABC, abstractmethod


# --- CLASSE BASE ABSTRACTA ---
class Programa(ABC):
    """Classe base abstrata para todos os utilitários."""

    def __init__(self, nome: str):
        self.nome = nome

    @abstractmethod
    def executar(self) -> None:
        """Método principal que todo programa deve implementar."""
        pass


# --- UTILITÁRIOS DE TEMPO ---
class Cronometro(Programa):

    def __init__(self):
        super().__init__("Cronômetro")

    def executar(self) -> None:
        print(f"\n=== {self.nome.upper()} ===")
        input("Pressione ENTER para iniciar a contagem...")
        inicio = time.time()
        input("Contando... Pressione ENTER para parar.")
        fim = time.time()
        print(f"Tempo decorrido: {round(fim - inicio, 2)} segundos\n")


class Temporizador(Programa):

    def __init__(self):
        super().__init__("Temporizador")

    def executar(self) -> None:
        print(f"\n=== {self.nome.upper()} ===")
        try:
            segundos = int(input("Segundos para a contagem regressiva: "))
            for i in range(segundos, 0, -1):
                print(f"Restam: {i}s")
                time.sleep(1)
            print("⏰ Acabou o tempo!\n")
        except ValueError:
            print("Entrada inválida! Digite um número inteiro.\n")


# --- CALCULADORAS ---
class CalculadoraIMC(Programa):

    def __init__(self):
        super().__init__("Calculadora de IMC")

    def executar(self) -> None:
        print(f"\n=== {self.nome.upper()} ===")
        try:
            peso = float(input("Peso (kg): "))
            altura = float(input("Altura (m): "))
            if altura <= 0:
                print("Altura deve ser maior que zero!")
                return
            imc = peso / (altura**2)
            print(f"Seu IMC: {round(imc, 2)}\n")
        except ValueError:
            print("Entrada inválida! Digite valores numéricos.\n")


class MediaNotas(Programa):

    def __init__(self):
        super().__init__("Média de Notas")

    def executar(self) -> None:
        print(f"\n=== {self.nome.upper()} ===")
        try:
            n1 = float(input("Nota 1: "))
            n2 = float(input("Nota 2: "))
            media = (n1 + n2) / 2
            print(f"Média final: {media:.2f}\n")
        except ValueError:
            print("Entrada inválida! Digite valores numéricos.\n")


# --- GERENCIAMENTO DE MENUS ---
class PastaMenu:
    """Representa um grupo/pasta contendo múltiplos programas."""

    def __init__(self, titulo: str, programas: list[Programa]):
        self.titulo = titulo
        self.programas = programas

    def exibir(self) -> None:
        while True:
            print(f"\n[ PASTA: {self.titulo} ]")
            for idx, prog in enumerate(self.programas, start=1):
                print(f"{idx} - {prog.nome}")
            print("0 - Voltar ao Menu Principal")

            opcao = input("Escolha um programa: ").strip()

            if opcao == "0":
                break
            elif opcao.isdigit() and 1 <= int(opcao) <= len(self.programas):
                # Polimorfismo: executa sem se importar com a subclasse específica
                self.programas[int(opcao) - 1].executar()
            else:
                print("Opção inválida! Tente novamente.")


class SistemaPrincipal:
    """Gerencia a navegação entre as pastas e o encerramento do sistema."""

    def __init__(self):
        self.pastas = {
            "1": PastaMenu(
                "Manipuladores de Tempo", [Cronometro(), Temporizador()]
            ),
            "2": PastaMenu(
                "Calculadoras", [CalculadoraIMC(), MediaNotas()]
            ),
        }

    def iniciar(self) -> None:
        while True:
            print("\n=== PROGRAMAS ===")
            print("1 - Abrir Pasta: Manipuladores de Tempo")
            print("2 - Abrir Pasta: Calculadoras")
            print("0 - Fechar tudo")

            opcao = input("Escolha uma opção: ").strip()

            if opcao == "0":
                print("Encerrando o programa...")
                break
            elif opcao in self.pastas:
                self.pastas[opcao].exibir()
            else:
                print("Pasta não encontrada!")


# --- EXECUÇÃO DO SISTEMA ---
if __name__ == "__main__":
    app = SistemaPrincipal()
    app.iniciar()