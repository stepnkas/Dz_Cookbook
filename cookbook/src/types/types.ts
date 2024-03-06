export type CreatedRecipe = {
    title: string,
    description: string,
    ingredient: string,
    userId: string,
    priority?: string
  };

export type Recipe = {
    createdAt: string,
    description: string,
    id: string,
    priority: string,
    ingredient: string,
    title: string,
    updatedAt:string,
    userId: string
  }