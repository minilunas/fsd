package com.lunas.fsd;

import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

public class LambdaTest {

    public static void main(String[] args) {
        //Prior Java 8 :
        List<String> features = Arrays.asList("Lambdas", "Default Method",
                "Stream API", "Date and Time API");
        for (String feature : features) {
            System.out.println(feature);
        }

        //In Java 8:
        features.forEach(n -> System.out.println(n));

        // Even better use Method reference feature of Java 8
        // method reference is denoted by :: (double colon) operator
        // looks similar to score resolution operator of C++
        features.forEach(System.out::println);


        filter(features, (str)->str.toString().startsWith("L"));
    }

    public static void filter(List<String> names, Predicate condition) {
        for(String name: names)  {
            if(condition.test(name)) {
                System.out.println(name + " ");
            }
        }
    }
}
