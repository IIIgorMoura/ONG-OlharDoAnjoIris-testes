## 🧍‍♀️ Entidade: Beneficiário

Este modelo representa os dados coletados no formulário de autorização de uso de imagem dos beneficiários da ONG.

### 📦 Arquivo
O modelo está implementado em:  
`/models/beneficiario.ts`

### 🧾 Campos

| Campo               | Tipo         | Descrição |
|---------------------|--------------|-----------|
| `id`                | `string`     | Identificador único do registro |
| `nomeResponsavel`   | `string`     | Nome completo do responsável legal |
| `rgResponsavel`     | `string`     | RG do responsável |
| `cpfResponsavel`    | `string`     | CPF do responsável |
| `menores`           | `{ nome: string; idade?: number \| null }[]` | Lista de menores sob responsabilidade, com nome e idade opcional |
| `localNascimento`   | `string`     | Local de nascimento do responsável |
| `localDocumento`    | `string`     | Cidade/local onde o documento foi assinado |
| `dataDocumento`     | `string`     | Data da assinatura do documento |
| `telefoneContato`   | `string`     | Telefone para contato |
| `imagemDocumento`   | `string`     | Imagem completa do documento (URL ou base64) |
| `createdAt`         | `Timestamp`  | Data de criação do registro |
| `updatedAt`         | `Timestamp`  | Data da última atualização |
| `deletedAt`         | `Timestamp`  | Data de exclusão lógica (soft delete), se aplicável |

### 💡 Observações

- O campo `imagemDocumento` deve armazenar **URL** do arquivo hospedado (ex: Firebase Storage, S3) ou string em **base64** temporariamente.
- A assinatura não é armazenada separadamente, pois já consta na imagem completa do documento.
- O campo `menores` é um array de objetos contendo nome e idade opcional para melhor estruturação dos dados.

---

## 📁 Exemplo de uso no código:

```ts
import { Beneficiario } from "@/models/beneficiario";

// Criando novo beneficiário
const novo = new Beneficiario({
  nomeResponsavel: "Joana da Silva",
  rgResponsavel: "1234567",
  cpfResponsavel: "111.222.333-44",
  menores: [
    { nome: "Ana", idade: 5 },
    { nome: "Lucas", idade: 8 },
    { nome: "Pedro" } // idade opcional
  ],
  localNascimento: "São Paulo - SP",
  localDocumento: "Campinas - SP",
  dataDocumento: "2023-08-10",
  telefoneContato: "(11) 91234-5678",
  imagemDocumento: "https://...",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null
});




