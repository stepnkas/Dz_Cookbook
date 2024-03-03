import { createEffect } from "effector";
import { CreatedRecipe } from "../types/types";
import { api } from "./axiosInstance";


export const createRecipeFx = createEffect( async (task: CreatedRecipe) => {
    const { data } = await api.post('api/cookbook/create', task)
    return data;
});

export const getRecipeFx = createEffect( async (idUser: string) => {
    const { data } = await api.get('api/tocookbook/' + idUser);
    return data;
});

export const deleteRecipeFx = createEffect( async (id: string) => {
    const { data } = await api.delete('api/tocookbook/delete/' + id);
    return data;
});

export const getOnerecipe = async (userServerId: string, taskId: string) => {
    const { data } = await api.get('api/tocookbook/' + userServerId + '?tocookbookid=' + taskId);
    return data;
}

export const putOnerecipe = async (dataRecipe: any) => {
    const { data } = await api.put('api/tocookbook/update', dataRecipe);
    return data;
}