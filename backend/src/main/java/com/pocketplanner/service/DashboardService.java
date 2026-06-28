package com.pocketplanner.service;

import com.pocketplanner.dto.DashboardDTO;
import com.pocketplanner.entity.Budget;
import com.pocketplanner.entity.Expense;
import com.pocketplanner.repository.BudgetRepository;
import com.pocketplanner.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public DashboardDTO getDashboard() {

        Double totalBudget = budgetRepository.findAll()
    .stream()
    .mapToDouble(Budget::getAmount)
    .sum();
        Double totalExpenses = expenseRepository.findAll()
                .stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        Double remainingBalance = totalBudget - totalExpenses;

        return new DashboardDTO(
                totalBudget,
                totalExpenses,
                remainingBalance
        );
    }
}