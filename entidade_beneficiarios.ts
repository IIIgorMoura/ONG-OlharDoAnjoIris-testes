// models/baseModel.ts

import { Timestamp } from "firebase/firestore";

export interface BaseModel {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}



// models/beneficiario.ts

import { Timestamp } from "firebase/firestore";
import { BaseModel } from "./baseModel";

export interface Menor {
  nome: string;
  idade?: number | null;
}

export interface IBeneficiario extends BaseModel {
  id?: string; // string -> number ; se o ID no banco for auto_increment (MySQL)
  nomeResponsavel: string;
  rgResponsavel: string;
  cpfResponsavel: string;
  menores: Menor[];
  localNascimento: string;
  localDocumento: string;
  dataDocumento: string; // string -> Date ; se quiser salvar como data no MySQL
  telefoneContato: string;
  imagemDocumento?: string; // URL ou base64
}

export class Beneficiario implements IBeneficiario {
  id?: string; // string -> number ; (se usar auto-incremento no MySQL)
  nomeResponsavel: string;
  rgResponsavel: string;
  cpfResponsavel: string;
  menores: Menor[];
  localNascimento: string;
  localDocumento: string;
  dataDocumento: string; // string -> Date (opcional, se quiser usar campo DATE no MySQL)
  telefoneContato: string;
  imagemDocumento?: string;
  createdAt: Timestamp; // 'Date' se formos usar MySQL
  updatedAt: Timestamp; // 'Date' se formos usar MySQL
  deletedAt?: Timestamp; // 'Date' se formos usar MySQL

  constructor(data: IBeneficiario) {
    this.id = data.id;
    this.nomeResponsavel = data.nomeResponsavel;
    this.rgResponsavel = data.rgResponsavel;
    this.cpfResponsavel = data.cpfResponsavel;
    this.menores = data.menores;
    this.localNascimento = data.localNascimento;
    this.localDocumento = data.localDocumento;
    this.dataDocumento = data.dataDocumento;
    this.telefoneContato = data.telefoneContato;
    this.imagemDocumento = data.imagemDocumento;
    this.createdAt = Timestamp.now(); // = data.createdAt ?? new Date(); se formos usar MySQL
    this.updatedAt = Timestamp.now(); // = data.updatedAt ?? new Date(); se formos usar MySQL
    this.deletedAt = data.deletedAt;
  }

  toJson(): any {
    return {
      id: this.id,
      nomeResponsavel: this.nomeResponsavel,
      rgResponsavel: this.rgResponsavel,
      cpfResponsavel: this.cpfResponsavel,
      menores: this.menores,
      localNascimento: this.localNascimento,
      localDocumento: this.localDocumento,
      dataDocumento: this.dataDocumento,
      telefoneContato: this.telefoneContato,
      imagemDocumento: this.imagemDocumento,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      deletedAt: this.deletedAt?.toISOString()
    };
  }

  static fromJson(json: any): Beneficiario {
    return new Beneficiario({
      id: json.id,
      nomeResponsavel: json.nomeResponsavel,
      rgResponsavel: json.rgResponsavel,
      cpfResponsavel: json.cpfResponsavel,
      menores: json.menores || [],
      localNascimento: json.localNascimento,
      localDocumento: json.localDocumento,
      dataDocumento: json.dataDocumento,
      telefoneContato: json.telefoneContato,
      imagemDocumento: json.imagemDocumento,
      createdAt: json.createdAt, // json.createdAt ? new Date(json.createdAt) : new Date(),
      updatedAt: json.updatedAt, // json.updatedAt ? new Date(json.updatedAt) : new Date(),
      deletedAt: json.deletedAt // json.deletedAt ? new Date(json.deletedAt) : undefined
    });
  }
}
