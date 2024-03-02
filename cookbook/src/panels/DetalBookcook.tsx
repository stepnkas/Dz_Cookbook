import { Button, Div, FormItem, FormLayoutGroup, Input, Panel, PanelHeader, PanelHeaderClose, Separator, Textarea, Title, Text } from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { Recipe } from "../types/types";
import { useUnit } from "effector-react";
import { $userServer } from "../store/user";
import { $recipeId } from "../store/recipe";
import { getOnerecipe, putOnerecipe } from "../api/recipe";
import { Icon20EditCircleFillBlue, Icon24Delete } from "@vkontakte/icons";

type TaskRecipesProps = {
    id: any,
    go: any,
};

const RecipeDetails: React.FC<TaskRecipesProps> = ({ id, go }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const userServer = useUnit($userServer);
    const [editedTitle, setEditedTitle] = useState(recipe?.title || "");
    const [editedDescription, setEditedDescription] = useState(recipe?.descr || "");
    const [editedIngredient, setEditedIngredient] = useState(recipe?.ingredient || "");
    const recipeId = useUnit($recipeId);

    useEffect(() => {
        const getCurrentRecipe = async () => {
            const currentRecipe: Recipe = await getOnerecipe(userServer.id, recipeId);
            setRecipe(currentRecipe);
        }
        getCurrentRecipe();
    }, [recipeId]);

    useEffect(() => {
        if (recipe) {
            setEditedTitle(recipe?.title);
            setEditedDescription(recipe?.descr);
            setEditedIngredient(recipe?.ingredient);
        }
    }, [recipe]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(e.target.value);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setEditedDescription(e.target.value);
    };

    const handleIngredientChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setEditedIngredient(e.target.value);
    };

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };

    const handleSaveButtonClick = async () => {
        const dataRecipe = {
            cookbook: recipeId,
            title: editedTitle,
            descr: editedDescription,
            ingredient: editedIngredient
        }
        const updateRecipe = await putOnerecipe(dataRecipe);
        setRecipe(updateRecipe);
        setIsEditing(false);
    };
    return (
        <Panel id={id}>
            <PanelHeader before={<PanelHeaderClose onClick={() => go({ currentTarget: { to: "home" } })} />} >
                Детали задачи
            </PanelHeader>
            <Div style={{ padding: "20px" }}>
                {isEditing ? (
                    <FormLayoutGroup>
                        <FormItem top="Название блюда">
                            <Input
                                value={editedTitle}
                                onChange={handleTitleChange}
                                placeholder="Введите название"
                            />
                        </FormItem>
                        <FormItem top="Описание приготовления">
                            <Textarea
                                value={editedDescription}
                                onChange={handleDescriptionChange}
                                placeholder="Введите способ приготовления"
                            />
                        </FormItem>
                        <FormItem top="Ингредиенты">
                            <Textarea
                                value={editedIngredient}
                                onChange={handleIngredientChange}
                                placeholder="Введите Ингредиенты"
                            />
                        </FormItem>
                        <Button
                            size="l"
                            style={{ margin: "18px" }}
                            onClick={handleSaveButtonClick}
                        >
                            Сохранить
                        </Button>
                    </FormLayoutGroup>
                ) : (
                    <>
                        <Div style={{ padding: 20 }}>
                            <Title level="3" style={{ padding: "20px 0px" }}>
                                Название блюда: {recipe?.title}
                            </Title>
                            <Separator />
                            <Text style={{ padding: "20px 0px" }}>
                                Описание приготовления: {recipe?.descr}
                            </Text>
                            <Text style={{ padding: "20px 0px" }}>
                                Ингредиенты: {recipe?.ingredient}
                            </Text>
                        </Div>
                        <Div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button
                                mode="secondary"
                                before={<Icon20EditCircleFillBlue />}
                                onClick={handleEditButtonClick}
                            >
                                Редактировать
                            </Button>
                            <Button before={<Icon24Delete />}>Удалить</Button>
                        </Div>
                    </>
                )}
            </Div>
        </Panel>
    )
}

export default RecipeDetails;