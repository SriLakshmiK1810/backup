package com.pocketplanner.controller;

import com.pocketplanner.dto.DashboardDTO;
import com.pocketplanner.entity.Budget;
import com.pocketplanner.repository.BudgetRepository;
import com.pocketplanner.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private BudgetRepository budgetRepository;

@GetMapping
public DashboardDTO getDashboard(@RequestParam Long userId) {

    Double totalExpenses =
            expenseRepository.getTotalExpensesByUserId(userId);

    if (totalExpenses == null) totalExpenses = 0.0;

    Budget budget =
            budgetRepository.findTopByUserIdOrderByIdDesc(userId);

    Double totalBudget = budget != null ? budget.getAmount() : 0.0;
    Double remainingBalance = totalBudget - totalExpenses;

    return new DashboardDTO(
            totalBudget,
            totalExpenses,
            remainingBalance
    );
}
}