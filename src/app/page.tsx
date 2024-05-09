'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import readXlsxFile from 'read-excel-file';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
export default function Home() {
  const [sindicatos, setSindicatos] = useState([]);
  const getSindicatos = async () => {
    let data = JSON.stringify({
      categoria: '',
      uf: 'PR',
      baseTerritorial: 'cascavel',
      classe: 'Rural',
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3333/api/sindicatoPorClasseUF',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getSindicatos();
  }, []);
  return (
    <main className="flex min-h-screen p-4">
      <div className="flex flex-row h-12 items-end w-full gap-4">
        <div className="w-full">
          <p>Categoria</p>
          <Input />
        </div>
        <div className="w-full">
          <p>Estado</p>
          <Input />
        </div>
        <div className="w-full">
          <p>Base Territorial</p>
          <Input />
        </div>
        <div className="w-full">
          <p>Classe</p>
          <Input />
        </div>
        <div>
          <Button variant="outline">Pesquisar</Button>
        </div>
      </div>
    </main>
  );
}
