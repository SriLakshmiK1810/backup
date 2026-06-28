package com.pocketplanner.repository;

import com.pocketplanner.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    Budget findTopByOrderByIdDesc();

    List<Budget> findAllByOrderByStartDateDesc();

    Optional<Budget> findFirstByStartDateLessThanEqualAndEndDateGreaterThanEqual(
            LocalDate startDate,
            LocalDate endDate
    );
}