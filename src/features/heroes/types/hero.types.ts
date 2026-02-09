export type Hero = {
  id: string
  name: string
  slug: string
  alterEgo: string
  publisher: 'DC' | 'Marvel' | 'Image' | 'Other'
  alignment: 'hero' | 'villain'
  status: 'active' | 'retired'
  firstAppearance: string
  team: string
  characters: string
  description: string
  powers: string[]
  stats: {
    strength: number
    intelligence: number
    speed: number
    durability: number
  }
  imageUrl: string
  createdAt: string
  updatedAt: string
}
