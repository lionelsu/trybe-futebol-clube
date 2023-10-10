// 1 - Definimos a entidades - Não deve ter nada externo, é o motivo da aplicação existir.

// 2 - Definimos os repositories - Pode interagir com as entidades e tem os metodos relacionados a pegar, editar, salvar, deletar, mas não os instancia(executa).

// 3 - Definimos os casos de uso (services) - Vai interagir com as entidades e as repositories para pegar, editar, salvar, deletar coisas dos repositorios. Os casos de uso além de ler, modificam.

// 4 - Definimos os controllers - Apenas leitura, é uma das camadas mais externas e apenas vai solicitar dados, não deve calcular nada.
export interface Team {
  id: number;
  teamName: string;
}
