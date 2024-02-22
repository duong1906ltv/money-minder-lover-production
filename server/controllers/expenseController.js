// Import any necessary dependencies
// For example, assuming you have an Expense model
import Expense from '../models/Expense.js';

// Controller methods
export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createExpense = async (req, res) => {
    try {
        const newExpense = await Expense.create(req.body);
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (expense) {
            res.json(expense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedExpense) {
            res.json(updatedExpense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (deletedExpense) {
            res.json(deletedExpense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
