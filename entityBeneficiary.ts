// models/baseModel.ts

import { Timestamp } from "firebase/firestore";

export interface BaseModel {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}



// models/entityBeneficiary.ts

import { Timestamp } from "firebase/firestore";
import { BaseModel } from "./baseModel";

export interface Minor {
  name: string;
  age?: number | null;
}

export interface IBeneficiary extends BaseModel {
  id?: string;
  guardianName: string;
  guardianRg: string;
  guardianCpf: string;
  minors: Minor[];
  birthPlace: string;
  documentPlace: string;
  documentDate: string;
  contactPhone: string;
  documentImage?: string;
}

export class Beneficiary implements IBeneficiary {
  id?: string;
  guardianName: string;
  guardianRg: string;
  guardianCpf: string;
  minors: Minor[];
  birthPlace: string;
  documentPlace: string;
  documentDate: string;
  contactPhone: string;
  documentImage?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;

  constructor(data: IBeneficiary) {
    this.id = data.id;
    this.guardianName = data.guardianName;
    this.guardianRg = data.guardianRg;
    this.guardianCpf = data.guardianCpf;
    this.minors = data.minors;
    this.birthPlace = data.birthPlace;
    this.documentPlace = data.documentPlace;
    this.documentDate = data.documentDate;
    this.contactPhone = data.contactPhone;
    this.documentImage = data.documentImage;
    this.createdAt = Timestamp.now();
    this.updatedAt = Timestamp.now();
    this.deletedAt = data.deletedAt;
  }

  toJson(): any {
    return {
      id: this.id,
      guardianName: this.guardianName,
      guardianRg: this.guardianRg,
      guardianCpf: this.guardianCpf,
      minors: this.minors,
      birthPlace: this.birthPlace,
      documentPlace: this.documentPlace,
      documentDate: this.documentDate,
      contactPhone: this.contactPhone,
      documentImage: this.documentImage,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      deletedAt: this.deletedAt?.toISOString()
    };
  }

  static fromJson(json: any): Beneficiary {
    return new Beneficiary({
      id: json.id,
      guardianName: json.guardianName,
      guardianRg: json.guardianRg,
      guardianCpf: json.guardianCpf,
      minors: json.minors || [],
      birthPlace: json.birthPlace,
      documentPlace: json.documentPlace,
      documentDate: json.documentDate,
      contactPhone: json.contactPhone,
      documentImage: json.documentImage,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      deletedAt: json.deletedAt
    });
  }
}
