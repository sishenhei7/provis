export interface VisGraphItem {
  id: number
  name: string
  path: string
  type: 'page' | 'component'
  roots: VisGraphItem[]
  parents: VisGraphItem[]
}
