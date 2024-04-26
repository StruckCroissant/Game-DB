package com.StruckCroissant.GameDB.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = NullOrNotBlankValidator.class)
public @interface NullOrNotBlank {
  String message() default "{javax.validation.constraints.NullOrNotBlank.message}";
  Class<?>[] groups() default { };
  Class<? extends Payload>[] payload() default {};
}
