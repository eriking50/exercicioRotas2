
import { Between, EntityRepository, Repository } from "typeorm";
import { Viagem } from "../models/ViagemEntity";
import { IViagemRepository } from "../@types/repositories/IViagemRepository";
import { ViagemFiltroDto } from "../@types/dto/ViagemFiltroDto";

@EntityRepository(Viagem)
export class ViagemRepository extends Repository<Viagem> implements IViagemRepository{
  findByIdWithViacao(idViagem: number): Promise<Viagem> {
    return this.findOne({
      relations: ['viacao'],
      where: {
        id: idViagem
      }
    })
  }
  findById(idViagem: number): Promise<Viagem> {
    return this.findOne({
      where: {
        id: idViagem
      }
    })
  }
  findAll(filtro: ViagemFiltroDto): Promise<Viagem[]> {
    return this.find({
      where: {
        dataPartida: Between(filtro.dataInicio, filtro.dataFinal),
        destino: filtro.destino,
        origem: filtro.origem
      }
    });
  }
  findByIdWithUsuarios(idViagem: number): Promise<Viagem> {
    return this.findOne({
      relations: ['usuarios'],
      where: {
        id: idViagem
      }
    })
  }
}