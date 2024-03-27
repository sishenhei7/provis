export interface VisGraphItem {
  name: string
  path: string
  type: 'page' | 'component'
  roots: VisGraphItem[]
  parents: VisGraphItem[]
}
