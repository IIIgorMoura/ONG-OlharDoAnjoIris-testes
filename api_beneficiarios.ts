// pages/api/beneficiarios.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Simulação de banco de dados (substitua por acesso real ao MySQL ou Firebase)
let beneficiarios: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Retorna todos os beneficiários
      res.status(200).json(beneficiarios);
      break;

    case 'POST':
      // Cria um novo beneficiário
      const data = req.body;

      if (!data.nomeResponsavel || !data.cpfResponsavel || !data.telefoneContato) {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
      }

      const novoBeneficiario = {
        id: Date.now().toString(),
        ...data,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };

      beneficiarios.push(novoBeneficiario);
      res.status(201).json(novoBeneficiario);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${req.method} não permitido`);
  }
}




// teste 2
// pages/api/beneficiarios.ts

import { NextApiRequest, NextApiResponse } from 'next';

let beneficiarios: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(beneficiarios);
      break;

    case 'POST':
      const data = req.body;

      if (!data.nomeResponsavel || !data.cpfResponsavel || !data.telefoneContato) {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
      }

      const novo = {
        id: Date.now().toString(),
        ...data,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      };

      beneficiarios.push(novo);
      res.status(201).json(novo);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${req.method} não permitido`);
  }
}

