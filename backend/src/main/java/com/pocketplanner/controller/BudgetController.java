package com.pocketplanner.controller;

import com.pocketplanner.entity.Budget;
import com.pocketplanner.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping
    public Budget saveBudget(@RequestBody Budget budget) {
        return budgetService.saveBudget(budget);
    }
    @GetMapping("/latest")
public Budget getLatestBudget() {
    return budgetService.getLatestBudget();
}
}