package com.StruckCroissant.GameDB.exception;

import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.NativeWebRequest;
import org.zalando.problem.Problem;
import org.zalando.problem.ThrowableProblem;
import org.zalando.problem.spring.web.advice.ProblemHandling;

@RestControllerAdvice
public class ApplicationExceptionHandler implements ProblemHandling {
  @ExceptionHandler
  @Override
  public ResponseEntity<Problem> handleProblem(
      final @NotNull ThrowableProblem problem,
      final @NotNull NativeWebRequest request
  ) {
    return ProblemHandling.super.handleProblem(problem, request);
  }
}
