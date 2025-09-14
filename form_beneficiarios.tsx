// components/FormularioBeneficiario.tsx

'use client';

import { useState } from 'react';

interface Menor {
  nome: string;
  idade?: number | null;
}

export default function FormularioBeneficiario() {
  const [form, setForm] = useState({
    nomeResponsavel: '',
    rgResponsavel: '',
    cpfResponsavel: '',
    localNascimento: '',
    localDocumento: '',
    dataDocumento: '',
    telefoneContato: '',
    imagemDocumento: '',
  });

  const [menores, setMenores] = useState<Menor[]>([]);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const adicionarMenor = () => {
    setMenores([...menores, { nome: '', idade: null }]);
  };

  const removerMenor = (index: number) => {
    const novos = [...menores];
    novos.splice(index, 1);
    setMenores(novos);
  };

  const atualizarMenor = (index: number, campo: string, valor: string) => {
    const novos = [...menores];
    novos[index] = {
      ...novos[index],
      [campo]: campo === 'idade' ? parseInt(valor) || null : valor,
    };
    setMenores(novos);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nomeResponsavel || !form.cpfResponsavel || !form.telefoneContato) {
      setErro('Preencha os campos obrigatórios: nome, CPF e telefone.');
      return;
    }

    try {
      const response = await fetch('/api/beneficiarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, menores }),
      });

      if (response.ok) {
        setSucesso('Beneficiário cadastrado com sucesso!');
        setErro('');
        setForm({
          nomeResponsavel: '',
          rgResponsavel: '',
          cpfResponsavel: '',
          localNascimento: '',
          localDocumento: '',
          dataDocumento: '',
          telefoneContato: '',
          imagemDocumento: '',
        });
        setMenores([]);
      } else {
        const err = await response.json();
        setErro(err.error || 'Erro ao cadastrar.');
      }
    } catch (error) {
      console.error(error);
      setErro('Erro de conexão.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Cadastro de Beneficiário</h2>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}

      <input type="text" name="nomeResponsavel" placeholder="Nome do responsável *" value={form.nomeResponsavel} onChange={handleChange} />
      <input type="text" name="rgResponsavel" placeholder="RG do responsável" value={form.rgResponsavel} onChange={handleChange} />
      <input type="text" name="cpfResponsavel" placeholder="CPF do responsável *" value={form.cpfResponsavel} onChange={handleChange} />
      <input type="text" name="localNascimento" placeholder="Local de nascimento" value={form.localNascimento} onChange={handleChange} />
      <input type="text" name="localDocumento" placeholder="Local de assinatura do documento" value={form.localDocumento} onChange={handleChange} />
      <input type="date" name="dataDocumento" placeholder="Data do documento" value={form.dataDocumento} onChange={handleChange} />
      <input type="text" name="telefoneContato" placeholder="Telefone *" value={form.telefoneContato} onChange={handleChange} />
      <input type="text" name="imagemDocumento" placeholder="URL da imagem do documento" value={form.imagemDocumento} onChange={handleChange} />

      <h4>Menores sob responsabilidade</h4>
      {menores.map((menor, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Nome"
            value={menor.nome}
            onChange={(e) => atualizarMenor(index, 'nome', e.target.value)}
          />
          <input
            type="number"
            placeholder="Idade"
            value={menor.idade ?? ''}
            onChange={(e) => atualizarMenor(index, 'idade', e.target.value)}
            style={{ width: '80px', marginLeft: '10px' }}
          />
          <button type="button" onClick={() => removerMenor(index)} style={{ marginLeft: '10px' }}>
            Remover
          </button>
        </div>
      ))}
      <button type="button" onClick={adicionarMenor}>+ Adicionar menor</button>

      <br /><br />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
