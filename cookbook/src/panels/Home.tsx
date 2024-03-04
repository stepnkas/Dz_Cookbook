import {
  Button,
  Card,
  CardGrid,
  FormItem,
  FormLayoutGroup,
  Group,
  Input,
  Panel, PanelHeader, Textarea
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Icon24Add, Icon24Delete } from '@vkontakte/icons';
import { CreatedRecipe, Recipe } from '../types/types';
import { createRecipeFx, deleteRecipeFx, getRecipeFx } from '../api/recipe';
import { useUnit } from 'effector-react';
import { $recipes, filterRecipes, setRecipeId } from '../store/recipe';
import { $userServer } from '../store/user';

interface Props {
  id: string;
  go: any;
  fetchedUser?: UserInfo;
}

const Home = ({ id, go, fetchedUser }: Props) => {
  const [recipes, userServer] = useUnit([$recipes, $userServer]);
  const [newRecipe, setNewRecipe] = useState("");
  const [newRecipeDiscription, setNewRecipeDiscription] = useState("");
  const [newRecipeIngredient, setNewRecipeIngredient] = useState("");

  useEffect(() => {
    if (userServer) {
      getRecipeFx(userServer.id);
    }
  }, [userServer]);

  const addRecipe = async () => {
    if (!newRecipeDiscription.trim() || !newRecipe.trim() || !newRecipeIngredient.trim()) return;

    const dataToCreatedNewRecipe: CreatedRecipe = {
      title: newRecipe,
      descr: newRecipeDiscription,
      ingredient: newRecipeIngredient,
      userId: userServer.id,
    };

    const dataRecipe: Recipe = await createRecipeFx(dataToCreatedNewRecipe);

    if (dataRecipe) {
      setNewRecipe("");
      setNewRecipeDiscription("");
      setNewRecipeIngredient("");
    }
  };

  const deleteRecipe = async (taskId: string) => {
    const isDelite = await deleteRecipeFx(taskId);
    if (isDelite == 200) {
      filterRecipes(taskId);
    }
  };

  return (
    <Panel id={id} centered={true}>
      <PanelHeader> Поворская книжка </PanelHeader>
      <FormLayoutGroup>
        <FormItem top='Новое блюдо'>
          <Input type='text' value={newRecipe} onChange={(e: any) => setNewRecipe(e.target.value)} placeholder='Блюдо' required />
        </FormItem>
        <FormItem top="Способ приготовления">
          <Textarea value={newRecipeDiscription} onChange={(e) => setNewRecipeDiscription(e.target.value)} placeholder='Способ приготовления' required />
        </FormItem>
        <FormItem top="ингредиенты">
          <Textarea value={newRecipeIngredient} onChange={(e) => setNewRecipeIngredient(e.target.value)} placeholder='ингредиенты' required />
        </FormItem>
        <FormItem>
          <Button size='l' stretched before={<Icon24Add />} onClick={addRecipe}>
            Добавить
          </Button>
        </FormItem>
      </FormLayoutGroup>
      <Group>
        <CardGrid>
          {recipes.map((recipe) => (
            <Card mode='shadow' key={recipe.id} onClick={() => { setRecipeId(recipe.id); go({ currentTarget: { dataset: { to: "detali" } } }) }} >
              <div style={{
                padding: "16px",
                maxHeight: "100px",
                overflow: "hidden",
              }}>
                <div
                  style={{
                    marginBottom: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  { recipe.title.length > 11 ? recipe.title.substring(0, 11) + "..." : recipe.title }
                </div>
                <div
                  style={{
                    marginBottom: "12px",
                    color: "#555",
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  { recipe?.descr?.length > 11 ? recipe.descr.substring(0, 11) + "..." : recipe.descr }
                </div>
                <div
                  style={{
                    marginBottom: "12px",
                    color: "#555",
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  { recipe.ingredient.length > 11 ? recipe.ingredient.substring(0, 11) + "..." : recipe.ingredient }
                </div>
                <Button before={<Icon24Delete />} onClick={(e) => {
                  e.stopPropagation();
                  deleteRecipe(recipe.id);
                }}>
                  Удалить
                </Button>
              </div>
            </Card>
          ))}
        </CardGrid>
      </Group>
    </Panel>
  )
}

export default Home;