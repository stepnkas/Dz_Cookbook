export type CreatedRecipe = {
    title: string,
    description: string,
    ingredient: string,
    userId: string
  };

export type Recipe = {
    createdAt: string,
    description: string,
    id: string,
    ingredient: string,
    title: string,
    updatedAt:string,
    userId: string
  }