package com.lunas.fsd.pojo;

import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.DecimalMin;
import java.math.BigDecimal;
@Validated
public class SalaryForm {
    int year;
    @DecimalMin("1")
    BigDecimal starting_salary;//起薪

    @DecimalMin("0")
    BigDecimal increment;//增量

    String increment_fre;//增量频率
    BigDecimal incrementAmount;//金额
    BigDecimal salary1;//
    BigDecimal salary2;//
    BigDecimal salary3;//
    BigDecimal salary4;//
    @DecimalMin("0")
    BigDecimal deduction;//扣除
    String deduction_fre;

    BigDecimal deductionAmount;//扣除金额

    BigDecimal prediction;//预测
    BigDecimal salaryGrowth;//增长
    BigDecimal salaryGrowthPer;//增长比率

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public BigDecimal getStarting_salary() {
        return starting_salary;
    }

    public void setStarting_salary(BigDecimal starting_salary) {
        this.starting_salary = starting_salary;
    }

    public BigDecimal getIncrement() {
        return increment;
    }

    public void setIncrement(BigDecimal increment) {
        this.increment = increment;
    }



    public BigDecimal getIncrementAmount() {
        return incrementAmount;
    }

    public void setIncrementAmount(BigDecimal incrementAmount) {
        this.incrementAmount = incrementAmount;
    }

    public BigDecimal getDeduction() {
        return deduction;
    }

    public void setDeduction(BigDecimal deduction) {
        this.deduction = deduction;
    }

    public String getIncrement_fre() {
        return increment_fre;
    }

    public void setIncrement_fre(String increment_fre) {
        this.increment_fre = increment_fre;
    }

    public String getDeduction_fre() {
        return deduction_fre;
    }

    public void setDeduction_fre(String deduction_fre) {
        this.deduction_fre = deduction_fre;
    }

    public BigDecimal getDeductionAmount() {
        return deductionAmount;
    }

    public void setDeductionAmount(BigDecimal deductionAmount) {
        this.deductionAmount = deductionAmount;
    }

    public BigDecimal getPrediction() {
        return prediction;
    }

    public void setPrediction(BigDecimal prediction) {
        this.prediction = prediction;
    }

    public BigDecimal getSalaryGrowth() {
        return salaryGrowth;
    }

    public void setSalaryGrowth(BigDecimal salaryGrowth) {
        this.salaryGrowth = salaryGrowth;
    }

    public BigDecimal getSalaryGrowthPer() {
        return salaryGrowthPer;
    }

    public void setSalaryGrowthPer(BigDecimal salaryGrowthPer) {
        this.salaryGrowthPer = salaryGrowthPer;
    }

    public BigDecimal getSalary1() {
        return salary1;
    }

    public void setSalary1(BigDecimal salary1) {
        this.salary1 = salary1;
    }

    public BigDecimal getSalary2() {
        return salary2;
    }

    public void setSalary2(BigDecimal salary2) {
        this.salary2 = salary2;
    }

    public BigDecimal getSalary3() {
        return salary3;
    }

    public void setSalary3(BigDecimal salary3) {
        this.salary3 = salary3;
    }

    public BigDecimal getSalary4() {
        return salary4;
    }

    public void setSalary4(BigDecimal salary4) {
        this.salary4 = salary4;
    }
}
