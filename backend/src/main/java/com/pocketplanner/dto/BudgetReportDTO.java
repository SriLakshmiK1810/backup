package com.pocketplanner.dto;

public class BudgetReportDTO {

    private String period;
    private Double budget;
    private Double spent;
    private Double remaining;
    private String status;
    private String message;

    public BudgetReportDTO(String period,
                           Double budget,
                           Double spent,
                           Double remaining,
                           String status,
                           String message) {
        this.period = period;
        this.budget = budget;
        this.spent = spent;
        this.remaining = remaining;
        this.status = status;
        this.message = message;
    }

    public String getPeriod() {
        return period;
    }

    public Double getBudget() {
        return budget;
    }

    public Double getSpent() {
        return spent;
    }

    public Double getRemaining() {
        return remaining;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}