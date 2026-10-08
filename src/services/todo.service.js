import * as todoRepository from '../repositories/todo.repository.js';

export const createTodo = async todoData => {
  const savedTodo = await todoRepository.save({
    title: todoData.title,
    completed: todoData?.completed || false,
  });

  const todoObj = savedTodo.toObject();
  const { ...safeTodoOutput } = todoObj;
  return safeTodoOutput;
};

export const getOneTodo = async todoData => {
  const foundTodo = await todoRepository.getOneTodoById({ id: todoData.id });
  return foundTodo;
};
