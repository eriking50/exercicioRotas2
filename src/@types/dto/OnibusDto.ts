import { OnibusStatus } from "../enum/OnibusStatus";

export interface OnibusDto {
  marca: string,
  ano: number,
  numeroAssentos: number,
  placa: string,
  status?: OnibusStatus,
  viacaoId: number
}

export interface OnibusAtualizarDto {
    marca?: string,
    ano?: number,
    numeroAssentos?: number,
    placa?: string,
    status?: OnibusStatus
  }