import React, { useReducer, useState, useEffect } from "react";
import { useColorScheme, FlatList, StyleSheet, TextInput, SafeAreaView, Button, Text, View } from "react-native/types";
import useToDoList from "../hooks/useToDoList"
import { toDo } from '../types/index'

const ToDoList = () => {
    const [textInput, setTextInput] = useState('');
    const [addToDo, getToDos, todos] = useToDoList;
    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {getToDos()},[])
    return (
        <SafeAreaView>
            <TextInput value={textInput} placeholder="Add Todo!" onChangeText={(text) => setTextInput(text)}></TextInput>
            <Button title={'Set a To Do'} onPress={(textInput) => { addToDo(textInput) }}></Button>
            <FlatList keyExtractor={(toDo: toDo) => toDo.id.toString()} data={todos} renderItem={({ item }) => { return (<View style={item.completed ? styles.completed: styles.failure}><Text>{item.task}</Text></View>) }}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({completed: {borderWidth: 2, borderColor:'green'}, failure: {borderWidth: 2, borderColor: 'red'}
});

export default ToDoList;
