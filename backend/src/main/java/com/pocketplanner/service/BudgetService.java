package com.pocketplanner.service;
import com.pocketplanner.dto.BudgetReportDTO;
import com.pocketplanner.entity.Budget;
import com.pocketplanner.entity.Expense;
import com.pocketplanner.repository.BudgetRepository;
import com.pocketplanner.repository.ExpenseRepository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    // Save every new budget
    public Budget saveBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    // Get the latest budget
    public Budget getLatestBudget() {
        return budgetRepository.findTopByOrderByIdDesc();
    }
    
@Autowired
private ExpenseRepository expenseRepository;

public List<BudgetReportDTO> getReports() {

    List<Budget> budgets = budgetRepository.findAllByOrderByStartDateDesc();

    List<BudgetReportDTO> reports = new ArrayList<>();

    for (Budget budget : budgets) {

        double spent = expenseRepository
                .findByDateBetween(
                        budget.getStartDate(),
                        budget.getEndDate()
                )
                .stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double remaining = budget.getAmount() - spent;

        String status;
        String message;

        if (spent > budget.getAmount()) {

            status = "Exceeded";

            message =
                    "❌ You exceeded your budget by ₹"
                            + (spent - budget.getAmount());

        } else {

            status = "Within Budget";

            message =
                    "✅ You stayed within your budget and saved ₹"
                            + remaining;

        }

        reports.add(

                new BudgetReportDTO(

                        budget.getPeriod()
                                + " ("
                                + budget.getStartDate()
                                + " - "
                                + budget.getEndDate()
                                + ")",

                        budget.getAmount(),

                        spent,

                        remaining,

                        status,

                        message
                )

        );

    }

    return reports;

}
}