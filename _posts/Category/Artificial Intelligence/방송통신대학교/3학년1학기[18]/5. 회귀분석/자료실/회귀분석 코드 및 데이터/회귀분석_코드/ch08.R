coolhearts <- read.table("coolhearts.txt", header=T)
attach(coolhearts)

model.1 <- lm(Inf. ~ Area + X2 + X3)
summary(model.1)
anova(model.1)

model.2 <- lm(Inf. ~ X2 + X3 + Area)
summary(model.2)
anova(model.2)

model.3 <- lm(Inf. ~ Area)
summary(model.3)
anova(model.3)

detach(coolhearts)
