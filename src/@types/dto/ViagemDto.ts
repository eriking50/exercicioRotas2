export interface ViagemDto {
  totalVagas: number,
  dataPartida: Date,
  origem: string,
  destino: string,
  onibusId: number
}

export interface ViagemAtualizarDto {
  dataPartida?: Date,
  ativo?: boolean
}