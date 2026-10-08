import Todo from '../models/todo.model.js';

export const getAllTodos = async () => {
  return await Todo.find();
};

export const save = async todoDocument => {
  const newTodo = new Todo(todoDocument);
  return await newTodo.save();
};

export const getOneTodoById = async ({ id }) => {
  return await Todo.findById(id);
};

export const deleteTodoById = async ({ id }) => {
  return await Todo.findByIdAndDelete(id);
};

export const updateTodoById = async (id, dataToUpdate) => {
  return await Todo.findByIdAndUpdate(id, dataToUpdate, { new: true, runValidators: true });
};
