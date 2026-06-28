package com.pocketplanner.repository;
import java.time.LocalDate;
import java.util.List;

import com.pocketplanner.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    

@Query("SELECT COALESCE(SUM(e.amount),0) FROM Expense e")
Double getTotalExpenses();

List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
}