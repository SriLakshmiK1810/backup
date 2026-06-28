package com.pocketplanner.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotNull
    @Positive
    private Double amount;

    @NotBlank
    private String category;
    @NotBlank
private String paymentMode;

@NotBlank
private String expenseType;
private String billImage;

private String merchantName;
public String getBillImage() {
    return billImage;
}

public void setBillImage(String billImage) {
    this.billImage = billImage;
}

public String getMerchantName() {
    return merchantName;
}

public void setMerchantName(String merchantName) {
    this.merchantName = merchantName;
}

    private LocalDate date;

    public Expense() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    public String getPaymentMode() {
    return paymentMode;
}

public void setPaymentMode(String paymentMode) {
    this.paymentMode = paymentMode;
}

public String getExpenseType() {
    return expenseType;
}

public void setExpenseType(String expenseType) {
    this.expenseType = expenseType;
}

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}