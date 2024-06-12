cement <- read.table("cement.txt", header=T)
attach(cement)

pairs(cement)

model.0 <- lm(y ~ 1)
summary(model.0)
add1(model.0, ~ x1 + x2 + x3 + x4, test="F")

model.4 <- lm(y ~ x4)
add1(model.4, ~ . + x1 + x2 + x3, test="F")

model.14 <- lm(y ~ x1 + x4)
drop1(model.14, ~ ., test="F")

add1(model.14, ~ . + x2 + x3, test="F")

model.124 <- lm(y ~ x1 + x2 + x4)
drop1(model.124, ~ ., test="F")

model.12 <- lm(y ~ x1 + x2)
add1(model.12, ~ . + x3 + x4, test="F")

detach(cement)

# Best Subsets Regression

install.packages("leaps")
library(leaps)

cement <- read.table("cement.txt", header=T)
attach(cement)

subset <- regsubsets(y ~ x1 + x2 + x3 + x4, 
                     method="exhaustive", 
                     nbest=2, 
                     data=cement)
cbind(summary(subset)$outmat, 
      round(summary(subset)$adjr2, 3))

install.packages("caret")
library(caret)
set.seed(1)
cv <- trainControl(method="cv", number=5)
model.0 <- train(y ~ x4,
               data=cement, trControl=cv, method='lm') 
model.0$results

model.0$resample
mean(model.0$resample$RMSE)

model.1 <- train(y ~ x1 + x2,
                 data=cement, trControl=cv, method='lm') 
model.1$results

loocv <- trainControl(method="loocv")
model.2 <- train(y ~ x4,
                 data=cement, trControl=loocv, method='lm') 
model.2$results

model.2$resample

model.3 <- train(y ~ x1 + x2,
                 data=cement, trControl=loocv, method='lm')
model.3$results
