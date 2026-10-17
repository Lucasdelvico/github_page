# src/main.py

def main():
    tarefas = []
    
    while True:
        print("\n1. Cadastrar | 2. Listar | 3. Sair")
        opcao = input("Opção: ").strip()
        
        if opcao == "1":
            # Validação do título
            while not (titulo := input("Título: ").strip()):
                print("Título obrigatório!")
                
            descricao = input("Descrição: ").strip()
            
            # Validação da prioridade
            while (prioridade := input("Prioridade (Alta/Média/Baixa): ").strip().capitalize()) not in ["Alta", "Média", "Media", "Baixa"]:
                print("Prioridade inválida!")
            if prioridade == "Media": 
                prioridade = "Média"
                
            data_limite = input("Data limite: ").strip()
            
            tarefas.append({
                "titulo": titulo, 
                "descricao": descricao, 
                "prioridade": prioridade, 
                "data_limite": data_limite, 
                "status": "Pendente"
            })
            print("Cadastrado com sucesso!")
            
        elif opcao == "2":
            if not tarefas:
                print("Nenhuma tarefa cadastrada.")
            for i, t in enumerate(tarefas, 1):
                print(f"{i}. [{t['status']}] {t['titulo']} ({t['prioridade']}) - {t['data_limite']}")
            print(f"Total: {len([t for t in tarefas if t['status'] == 'Pendente'])} pendentes")
            
        elif opcao == "3":
            break
        else:
            print("Opção inválida.")

if __name__ == "__main__":
    main()