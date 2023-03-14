import { useState } from 'react';
import { toDo } from '../types/index'
import AsyncStorage from '@react-native-async-storage/async-storage';


//what we want to do with our to dos
export default () => {
    const [todos, setToDos] = useState<toDo[]>([]);

    const addToDo = (textInput: string) => {
        const newToDo: toDo = { id: Math.random(), task: textInput, completed: false }
        setToDos([...todos, newToDo])
    };

    const getToDos = async () => {
        try {
            const todos = await AsyncStorage.getItem('todos');
            if (todos != null) {
                setToDos(JSON.parse(todos));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const saveToDos = async (todos: any) => {
        try {
            const stringifyToDos = JSON.stringify(todos);
            await AsyncStorage.setItem('todos', stringifyToDos)
        } catch (error) {
            console.log(error);
        }
    }

    const markComplete = (todoId: number) => {
    const newTodosItem = todos.map(item => {
      if (item.id == todoId) {
        return {...item, completed: true};
      }
      return item;
    });

    setToDos(newTodosItem);
  };
  const deleteTodo = (todoId: number) => {
    const newTodosItem = todos.filter(item => item.id != todoId);
    setToDos(newTodosItem);
  };
  const clearAllToDos = () => {
    setToDos([]);
  };

    return [addToDo, getToDos, saveToDos, markComplete, deleteTodo, clearAllToDos, todos] as const;

};