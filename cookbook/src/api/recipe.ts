import { createEffect } from "effector";
import { CreatedRecipe } from "../types/types";
import { api } from "./axiosInstance";


export const createRecipeFx = createEffect( async (task: CreatedRecipe) => {
    const { data } = await api.post('api/recipe/create', task)
    return data;
});

export const getRecipeFx = createEffect( async (idUser: string) => {
    const { data } = await api.get('api/recipe/' + idUser);
    return data;
});

export const deleteRecipeFx = createEffect( async (id: string) => {
    const { data } = await api.delete('api/recipe/delete/' + id);
    return data;
});

export const getOnerecipe = async (userServerId: string, taskId: string) => {
    const { data } = await api.get('api/recipe/' + userServerId + '?recipe=' + taskId);
    return data;
}

export const putOnerecipe = async (dataRecipe: any) => {
    const { data } = await api.put('api/recipe/update', dataRecipe);
    return data;
}