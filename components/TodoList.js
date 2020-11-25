import React from 'react';
import {
  FlatList
} from 'react-native';
import TodoItem from './TodoItem'

const TodoList = ({ todoItems, completeTodoItem, removeTodoItem }) => (
  <FlatList
    data={todoItems}
    renderItem={({ item }) => (
      <TodoItem
        title={item.title}
        isComplete={item.isComplete}
        complete={() => completeTodoItem(item.id)}
        remove={() => removeTodoItem(item.id)}
      />
    )}
    keyExtractor={item => item.id}
  />
)

export default TodoList