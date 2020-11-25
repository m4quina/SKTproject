import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoList from './TodoList'
const uuid = require('uuid').v4

const Todo = () => {

    const [todoItems, setTodoItems] = useState([])
    
    useEffect(() => {
      restoreTodosFromAsync();
    }, []);

    const asyncStorageKey = '@todos';

    const storeTodosInAsync = newTodos => {
      const stringifiedTodos = JSON.stringify(newTodos);
  
      AsyncStorage.setItem(asyncStorageKey, stringifiedTodos).catch(err => {
        console.warn('Error storing todos in Async');
        console.warn(err);
      });
    };

    const restoreTodosFromAsync = () => {
      AsyncStorage.getItem(asyncStorageKey)
        .then(stringifiedTodos => {
          console.log('Restored Todos:');
          console.log(stringifiedTodos);
          const parsedTodos = JSON.parse(stringifiedTodos);
          if (!parsedTodos || typeof parsedTodos !== 'object') return;
          setTodoItems(parsedTodos);
        })
        .catch(err => {
          console.warn('Error restoring todos from async');
          console.warn(err);
        });
    };

    const [text, setText] = useState('')

    changeText = text => setText(text)

    const addTodoItem = () => {
      //console.log('HELLO THERE!');
      if(text.length > 0){
        const newTodos = [{id: uuid(), title: text, isComplete: false}, ...todoItems];
        console.log('HELLO THERE!');
        console.log('Todos AFTER submit');
        console.log(todoItems);

        setTodoItems(newTodos);
        storeTodosInAsync(newTodos);
      }
    setText('')
    }

    const completeTodoItem = id => {
      AsyncStorage.getItem(asyncStorageKey)
      .then(stringifiedTodos => {
        console.log('Restored Todos:');
        console.log(stringifiedTodos);
        const parsedTodos = JSON.parse(stringifiedTodos);

        parsedTodos.filter(function(todo) {
          if(todo.id === id){
            todo.isComplete = !todo.isComplete
          }
        });

        if (!parsedTodos || typeof parsedTodos !== 'object') return;
        setTodoItems(parsedTodos);
        storeTodosInAsync(parsedTodos);
      })
      .catch(err => {
        console.warn('Error restoring todos from async');
        console.warn(err);
      });
    }

    const removeTodoItem = idToRemove => setTodoItems(
      AsyncStorage.getItem(asyncStorageKey)
      .then(stringifiedTodos => {
        console.log('Restored Todos:');
        console.log(stringifiedTodos);
        const parsedTodos = JSON.parse(stringifiedTodos);

        const filteredTodos = parsedTodos.filter((todo) => todo.id !== idToRemove);

        if (!filteredTodos || typeof filteredTodos !== 'object') return;
        setTodoItems(filteredTodos);
        storeTodosInAsync(filteredTodos);
      })
      .catch(err => {
        console.warn('Error restoring todos from async');
        console.warn(err);
      })
    )

    return (
      <>
          <TodoList
            todoItems={todoItems}
            completeTodoItem={completeTodoItem}
            removeTodoItem={removeTodoItem}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Добавить задачу..."
            value={text}
            onChangeText={changeText}
            onSubmitEditing={addTodoItem}
          />
      </>
    )

  }

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 40,
    paddingHorizontal: 20,
    borderWidth: StyleSheet.hairlineWidth
  }
})

export default Todo