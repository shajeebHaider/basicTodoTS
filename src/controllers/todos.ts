import express, { RequestHandler } from "express";
import { Todo } from "../models/todos";
import { error } from "console";

const TODO: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
	const text = (req.body as { text: string }).text;
	const newTodo = new Todo(Math.random().toString(), text);

	TODO.push(newTodo);
	res.status(201).json({ message: "created todo", createdTodo: newTodo });
};

export const getTodo: RequestHandler = (req, res, next) => {
	res.json({ todos: TODO });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
	const todoId = req.params.id;

	const updatedText = (req.body as { text: string }).text;

	const todoIndex = TODO.findIndex(todo => todo.id === todoId);

	if (todoIndex < 0) {
		throw new Error("could not find todo");
	} else {
		TODO[todoIndex] = new Todo(TODO[todoIndex].id, updatedText);
		res.json({ message: "Updated!", updateTodo: TODO[todoIndex] });
	}
};

export const deleteTodo: RequestHandler = (req, res, next) => {
	const todoId = req.params.id;
	const todoIndex = TODO.findIndex(todo => todo.id === todoId);

	if (todoIndex < 0) {
		throw new Error("could not find todo");
	} else {
		TODO.splice(todoIndex, 1);
		res.json({ message: "deleted!", deleteTodo: TODO[todoIndex - 1] });
	}
};
