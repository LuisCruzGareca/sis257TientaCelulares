import type { Usuario } from './Usuario'
export interface Compras {
  id: number
  direccion_envio: string
  total: string
  usuario: Usuario
}
