import chalk from 'chalk';
import {
  getAllTodos,
  getOneTodoById,
  deleteTodoById,
  updateTodoById,
} from '../repositories/todo.repository.js';
import * as todoService from '../services/todo.service.js';

export const getTodos = async (req, res, next) => {
  try {
    const todos = await getAllTodos();
    const formattedTodos = todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      message: 'Todos fetched successfully',
      data: formattedTodos,
      notFormattedTodos: todos,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneTodo = async (req, res, next) => {
  try {
    let { id } = req.params;
    console.log('id', chalk.blue(id));

    let foundTodo = await getOneTodoById({ id });
    // foundTodo = foundTodo.map(({ _id: id, ...rest }) => ({
    //   id,
    //   ...rest,
    // }));

    return res.status(200).json({
      success: true,
      message: 'Todo found successfully',
      data: foundTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const applyTodo = async (req, res, next) => {
  try {
    const { title, completed } = req.body;

    // Call the application engine
    const newTodo = await todoService.createTodo({ title, completed });

    return res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    let { id } = req.params;
    console.log('id', chalk.red(id));

    let deletedTodo = await deleteTodoById({ id });

    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: deletedTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    let { id } = req.params;
    let updates = req.body;
    console.log('id', chalk.yellow(id));

    let updatedTodo = await updateTodoById(id, updates);

    console.log(chalk.greenBright('updateTodo'), chalk.yellowBright(updatedTodo));

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: 'Задача не найдена',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};
