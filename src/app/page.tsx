'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import readXlsxFile from 'read-excel-file';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
const estadosBrasileiros = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];
export default function Home() {
  const [sindicatos, setSindicatos] = useState([]);
  const [categorias, setCategorias] = useState('');
  const [uf, setUf] = useState('PR');
  const [baseTerritorial, setBaseTerritorial] = useState('');
  const [classe, setClasse] = useState('');
  const getSindicatos = async (categoria, uf, baseTerritorial, classe) => {
    let data = JSON.stringify({
      categoria: categoria,
      uf: uf,
      baseTerritorial: baseTerritorial,
      classe: classe,
    });
    console.log(data);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://find-sindicato.netlify.app/api/sindicatoPorClasseUF',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setSindicatos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="flex flex-col min-h-screen p-4">
      <div className="flex flex-row h-12 items-end w-full gap-4">
        <div className="w-full">
          <p>Categoria</p>
          <Input
            value={categorias}
            onChange={(event) => {
              setCategorias(event.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <p>Estado</p>
          <Select
            onValueChange={(event) => {
              setUf(event);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={uf} />
            </SelectTrigger>
            <SelectContent>
              {estadosBrasileiros.map((estado) => (
                <SelectItem value={estado}>{estado}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <p>Base Territorial</p>
          <Input
            value={baseTerritorial}
            onChange={(event) => {
              setBaseTerritorial(event.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <p>Classe</p>
          <Input
            value={classe}
            onChange={(event) => {
              setClasse(event.target.value);
            }}
          />
        </div>
        <div>
          <Button
            onClick={async () => {
              await getSindicatos(categorias, uf, baseTerritorial, classe);
            }}
            variant="outline"
          >
            Pesquisar
          </Button>
        </div>
      </div>
      {sindicatos.length == 0 ? (
        <p>Não tem sindicatos</p>
      ) : (
        sindicatos.map(
          (sindicato) => (
            console.log(sindicato),
            (
              <div className="flex  bg-slate-400 p-2 flex-col my-4">
                <p>{sindicato.Denominação}</p>
                <p>{sindicato.Classe}</p>
                <p> CNPJ: {sindicato.CNPJ}</p>
                <p>{sindicato['Código Sindical Completo']}</p>
                <p>
                  {sindicato.Logradouro}, {sindicato.Número} -{' '}
                  {sindicato.Bairro} - {sindicato.Complemento} - {sindicato.CEP}
                </p>
                <p>
                  {sindicato['Localidade da sede']}, {sindicato['UF da sede']}
                </p>
                <p></p>
                <p>Email</p>
                <p>{sindicato['E-mail']}</p>
                <p>Telefone:</p>
                <p>{sindicato['Telefone 1']}</p>
              </div>
            )
          )
        )
      )}
    </main>
  );
}
