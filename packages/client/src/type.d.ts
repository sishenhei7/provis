export interface VisGraphItem {
  name: string
  path: string
  roots: VisGraphItem[]
  parents: VisGraphItem[]
}
