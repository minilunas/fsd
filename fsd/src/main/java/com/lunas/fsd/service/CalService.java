package com.lunas.fsd.service;

import com.lunas.fsd.pojo.SalaryForm;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CalService {
    public List calSalary(SalaryForm form) {
        List<SalaryForm> list = new ArrayList<>();
        for(int i=0;i<form.getPrediction().longValue();i++){
            SalaryForm salary = new SalaryForm();
            salary.setYear(i + 1);
            salary.setIncrement_fre(form.getIncrement_fre());
            salary.setIncrement(form.getIncrement());
            salary.setDeduction(form.getDeduction());
            salary.setDeduction_fre(form.getDeduction_fre());
            BigDecimal startSalary = null;
            if(i==0) {
                startSalary = form.getStarting_salary();
            }else {
                startSalary = list.get(list.size()-1).getIncrementAmount();
            }
            salary.setStarting_salary(startSalary);
            salary.setIncrementAmount(calAmount(startSalary,form.getIncrement_fre(),salary.getIncrement(),salary));
            salary.setDeductionAmount(calDeductionAmount(salary.getIncrementAmount(),form.getDeduction_fre(),salary.getDeduction(),salary));
            BigDecimal growth = salary.getIncrementAmount().subtract(salary.getDeductionAmount());
            salary.setSalaryGrowth(new BigDecimal(growth.setScale(2,BigDecimal.ROUND_HALF_DOWN).doubleValue()));
            salary.setSalaryGrowthPer(salary.getSalaryGrowth().subtract(salary.getStarting_salary()).divide(salary.getStarting_salary(), 2, BigDecimal.ROUND_HALF_UP));
            list.add(salary);
        }


        return list;
    }

    private BigDecimal calAmount(BigDecimal base, String fre, BigDecimal per, SalaryForm salary) {
        BigDecimal result = new BigDecimal(0);

        switch (fre){
            case "quarterly":
                salary.setSalary1(base.add(base.multiply(per.multiply(new BigDecimal("0.01")))));
                salary.setSalary2(salary.getSalary1().add(salary.getSalary1().multiply(per.multiply(new BigDecimal("0.01")))));
                salary.setSalary3(salary.getSalary2().add(salary.getSalary2().multiply(per.multiply(new BigDecimal("0.01")))));
                salary.setSalary4(salary.getSalary3().add(salary.getSalary3().multiply(per.multiply(new BigDecimal("0.01")))));
                result =salary.getSalary4();
                break;
            case "half_yearly":
                salary.setSalary1(base.add(base.multiply(per.multiply(new BigDecimal("0.01")))));
                salary.setSalary2(salary.getSalary1());
                salary.setSalary3(salary.getSalary2().add(salary.getSalary2().multiply(per.multiply(new BigDecimal("0.01")))));
                salary.setSalary4(salary.getSalary3());
                result =salary.getSalary4();
                break;
            case "annually":
                salary.setSalary1(base);
                salary.setSalary2(base);
                salary.setSalary3(base);
                salary.setSalary4(base.add(base.multiply(per.multiply(new BigDecimal("0.01")))));
                result =salary.getSalary4();
                break;
        }
        return new BigDecimal(result.setScale(2,BigDecimal.ROUND_HALF_DOWN).doubleValue());
    }

    /**
     * 计算扣减
     * @param base
     * @param fre
     * @param per
     * @return
     */
    private BigDecimal calDeductionAmount(BigDecimal base, String fre, BigDecimal per, SalaryForm salary) {
        BigDecimal result = new BigDecimal(0);

        result =salary.getSalary1().multiply(per.multiply(new BigDecimal("0.01"))).add(salary.getSalary2().multiply(per.multiply(new BigDecimal("0.01"))))
                .add(salary.getSalary3().multiply(per.multiply(new BigDecimal("0.01")))).add(salary.getSalary4().multiply(per.multiply(new BigDecimal("0.01"))));
        return new BigDecimal(result.setScale(2,BigDecimal.ROUND_HALF_DOWN).doubleValue());
    }
}
