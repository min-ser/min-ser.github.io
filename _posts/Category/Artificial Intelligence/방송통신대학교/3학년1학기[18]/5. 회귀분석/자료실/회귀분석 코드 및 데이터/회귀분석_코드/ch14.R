install.packages("scatterplot3d")
library(scatterplot3d)

# uncorrpreds
uncorrpreds <- read.table("uncorrpreds.txt", header=T)
attach(uncorrpreds)

pairs(uncorrpreds)

cor(x1,x2)

model.1 <- lm(y ~ x1)
summary(model.1)
anova(model.1)

model.2 <- lm(y ~ x2)
summary(model.2)
anova(model.2)

model.12 <- lm(y ~ x1 + x2)
summary(model.12)
anova(model.12)

model.21 <- lm(y ~ x2 + x1)
summary(model.21)
anova(model.21)

scatterplot3d(x1, x2, y, type="h", color="steelblue", angle=220)

detach(uncorrpreds)

# bloodpress
bloodpress <- read.table("bloodpress.txt", header=T)
attach(bloodpress)

pairs(bloodpress[,c(2:5)])
pairs(bloodpress[,c(2,6:8)])

round(cor(bloodpress[,c(2:8)]),3)

pairs(bloodpress[,c(2,5,8)])

scatterplot3d(Stress, BSA, BP, type="h", color="steelblue", angle=220)

model.1 <- lm(BP ~ Stress)
summary(model.1)
anova(model.1)

model.2 <- lm(BP ~ BSA)
summary(model.2)
anova(model.2)

model.12 <- lm(BP ~ Stress + BSA)
summary(model.12)
anova(model.12)

model.21 <- lm(BP ~ BSA + Stress)
summary(model.21)
anova(model.21)

pairs(bloodpress[,c(2,5,4)])

round(cor(bloodpress[,c(2,5,4)]),3)

model.1 <- lm(BP ~ Weight)
summary(model.1)
anova(model.1)

model.2 <- lm(BP ~ BSA)
summary(model.2)
anova(model.2)

model.12 <- lm(BP ~ Weight + BSA)
summary(model.12)
anova(model.12)

model.21 <- lm(BP ~ BSA + Weight)
summary(model.21)
anova(model.21)

scatterplot3d(BSA, Weight, BP, type="h", color="steelblue", angle=220)

predict(model.1, interval="prediction",
        newdata=data.frame(Weight=92))
predict(model.2, interval="prediction",
        newdata=data.frame(BSA=2))
predict(model.12, interval="prediction",
        newdata=data.frame(Weight=92, BSA=2))

install.packages('car')
library(car)
model.1 <- lm(BP ~ Age + Weight + BSA + Dur + Pulse + Stress)
summary(model.1)
vif(model.1)

model.2 <- lm(Weight ~ Age + BSA + Dur + Pulse + Stress)
summary(model.2)

install.packages("corrplot")
library(corrplot)
corrplot(round(cor(bloodpress[,c(2:8)]),2), method="number")

model.3 <- lm(BP ~ Age + Weight + Dur + Stress)
summary(model.3)
vif(model.3)

detach(bloodpress)

