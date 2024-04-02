package com.sobolaw.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Slf4j
public class LoggingAspect {

    @Pointcut("execution(* com.sobolaw..*.*(..))")
    public void allMethods() {
    }


    @Before("allMethods()")
    public void logBefore(JoinPoint joinPoint) throws Throwable {
        String file = joinPoint.getSignature().getDeclaringType().getSimpleName();
        String method = joinPoint.getSignature().getName();
        StringBuilder args = new StringBuilder();
        String returnType = ((MethodSignature) joinPoint.getSignature()).getReturnType().getSimpleName();
        Object[] list = joinPoint.getArgs();
        for (Object o : list) {
            args.append(o.getClass().getSimpleName()).append(",");
        }
        if (!args.isEmpty()) {
            args.deleteCharAt(args.length() - 1);
        }
        if (file.contains("Controller"))
            log.trace("----------------------------------------------------------------------------------------");
        log.trace("{} {}.{}({}) <= {}", returnType, file, method, args, list);
    }


    @AfterReturning(pointcut = "allMethods()", returning = "result")
    public void logAfter(JoinPoint joinPoint, Object result) throws Throwable {
        String file = joinPoint.getSignature().getDeclaringType().getSimpleName();
        String method = joinPoint.getSignature().getName();
        StringBuilder args = new StringBuilder();
        String returnType = ((MethodSignature) joinPoint.getSignature()).getReturnType().getSimpleName();
        Object[] list = joinPoint.getArgs();
        for (Object o : list) {
            args.append(o.getClass().getSimpleName()).append(",");
        }
        if (!args.isEmpty()) {
            args.deleteCharAt(args.length() - 1);
        }
        log.trace("{} {}.{}({}) => {}", returnType, file, method, args, result);
    }


    @AfterThrowing(pointcut = "allMethods()", throwing = "exception")
    public void afterThrowingAdvice(JoinPoint joinPoint, Exception exception) {
        String file = joinPoint.getSignature().getDeclaringType().getSimpleName();
        String method = joinPoint.getSignature().getName();
        log.error("{}.{}() => {}", file, method, exception.toString());
    }

//    @Around("allMethods()")
//    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
//        long start = System.currentTimeMillis();
//        String file = joinPoint.getSignature().getDeclaringType().getSimpleName();
//        String method = joinPoint.getSignature().getName();
//        StringBuilder args = new StringBuilder();
//        String returnType = ((MethodSignature) joinPoint.getSignature()).getReturnType().getSimpleName();
//        Object[] list = joinPoint.getArgs();
//        for (Object o : list) {
//            args.append(o.getClass().getSimpleName()).append(",");
//        }
//        if (!args.isEmpty()) {
//            args.deleteCharAt(args.length() - 1);
//        }
//        try {
//            Object result = joinPoint.proceed();
//            long elapsedTime = System.currentTimeMillis() - start;
//            log.trace("[{}ms] {} {}.{}({}) => {}", elapsedTime, returnType, file, method, args, result);
//            return result;
//        } catch (Exception exception) {
//            log.error("{}.{}() => {}", file, method, exception.toString());
//            throw exception;
//        }
//
//    }

}
