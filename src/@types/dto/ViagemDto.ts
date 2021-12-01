export interface ViagemDto {
  totalVagas: number,
  dataPartida: Date,
  origem: string,
  destino: string,
  onibusId: number
}

export interface ViagemAtualizarDto {
  totalVagas?: number,
  dataPartida?: Date,
  origem?: string,
  destino?: string,
  onibusId?: number
}