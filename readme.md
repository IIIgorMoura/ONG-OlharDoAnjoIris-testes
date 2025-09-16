## 🧍‍♀️ Entidade: Beneficiário

Este modelo representa os dados coletados no formulário de autorização de uso de imagem dos beneficiários da ONG.

### 📦 Arquivo
O modelo está implementado em:  
`/models/entityBeneficiary.ts`

### 🧾 Campos

| Campo               | Tipo         | Descrição |
|---------------------|--------------|-----------|
| `id`                | `string`     | Identificador único do registro |
| `guardianName`   | `string`     | Nome completo do responsável legal |
| `guardiarRg`     | `string`     | RG do responsável |
| `guardianCpf`    | `string`     | CPF do responsável |
| `minors`           | `{ nome: string; idade?: number \| null }[]` | Lista de menores sob responsabilidade, com nome e idade opcional |
| `birthPlane`   | `string`     | Local de nascimento do responsável |
| `documentPlace`    | `string`     | Cidade/local onde o documento foi assinado |
| `documentDate`     | `string`     | Data da assinatura do documento |
| `contactPhone`   | `string`     | Telefone para contato |
| `documentImage`   | `string`     | Imagem completa do documento (URL ou base64) |
| `createdAt`         | `Timestamp`  | Data de criação do registro |
| `updatedAt`         | `Timestamp`  | Data da última atualização |
| `deletedAt`         | `Timestamp`  | Data de exclusão lógica (soft delete), se aplicável |

### 💡 Observações

- O campo `documentImage` deve armazenar **URL** do arquivo hospedado (ex: Firebase Storage, S3) ou string em **base64** temporariamente.
- A assinatura não é armazenada separadamente, pois já consta na imagem completa do documento.
- O campo `minors` é um array de objetos contendo nome e idade opcional para melhor estruturação dos dados.

---

## 📁 Exemplo de uso no código:

```ts
import { Beneficiario } from "@/models/entityBeneficiario";

// Criando novo beneficiário
const novo = new Beneficiario({
  guardianName: "Joana da Silva",
  guardianRg: "1234567",
  cpfResponsavel: "111.222.333-44",
  minors: [
    { name: "Ana", age: 5 },
    { name: "Lucas", age: 8 },
    { name: "Pedro" } // idade opcional
  ],
  birthPlace: "São Paulo - SP",
  documentPlace: "Campinas - SP",
  documentDate: "2023-08-10",
  contactPhone: "(11) 91234-5678",
  documentImage: "https://...",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null
});




