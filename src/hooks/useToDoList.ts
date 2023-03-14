import { useState, useEffect } from 'react';
import { TextInput } from 'react-native/types';
import { toDo } from '../types/index'
import AsyncStorage from '@react-native-async-storage/async-storage';


//how we want to use our to dos
export default () => {
    const [todos, setToDos] = useState<toDo[]>([]);

    //add to do
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

    const saveToDos = async (todos: ) => {
        try {
            const stringifyToDos = JSON.stringify(todos);
            await AsyncStorage.setItem('todos', stringifyToDos)
        } catch (error) {
            console.log(error);
        }
    }

    return [addToDo, getToDos, todos];

};