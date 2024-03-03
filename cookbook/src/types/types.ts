export type CreatedRecipe = {
    title: string,
    descr: string,
    ingredient: string,
    userId: string,
    priority?: string
  };

export type Recipe = {
    createdAt: string,
    descr: string,
    id: string,
    priority: string,
    ingredient: string,
    title: string,
    updatedAt:string,
    userId: string
  }