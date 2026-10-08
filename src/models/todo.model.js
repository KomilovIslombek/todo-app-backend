import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = new mongoose.model('Todo', todoSchema);
export default Todo;
