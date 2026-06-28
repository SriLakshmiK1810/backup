package com.pocketplanner.dto;

public class DashboardDTO {

    private Double totalBudget;
    private Double totalExpenses;
    private Double remainingBalance;

    public DashboardDTO(Double totalBudget, Double totalExpenses, Double remainingBalance) {
        this.totalBudget = totalBudget;
        this.totalExpenses = totalExpenses;
        this.remainingBalance = remainingBalance;
    }

    public Double getTotalBudget() {
        return totalBudget;
    }

    public Double getTotalExpenses() {
        return totalExpenses;
    }

    public Double getRemainingBalance() {
        return remainingBalance;
    }
}