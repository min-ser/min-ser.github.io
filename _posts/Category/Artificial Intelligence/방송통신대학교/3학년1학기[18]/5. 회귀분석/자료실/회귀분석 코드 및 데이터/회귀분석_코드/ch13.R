influence3 <- read.table("influence3.txt", header=T)
attach(influence3)

plot(x, y)

model.1 <- lm(y ~ x)
lev <- hatvalues(model.1)
round(lev, 6)
sum(lev)

detach(influence3)

influence4 <- read.table("influence4.txt", header=T)
attach(influence4)

plot(x, y)

model.2 <- lm(y ~ x)

lev <- hatvalues(model.2)
round(lev, 6)

dffit <- dffits(model.2)
round(dffit, 6)

cook <- cooks.distance(model.2)
round(cook, 6)

detach(influence4)

influence2 <- read.table("influence2.txt", header=T)
attach(influence2)

plot(x, y)

model.1 <- lm(y ~ x)

sta <- rstandard(model.1)
round(sta, 6)

stu <- rstudent(model.1)
round(stu, 6)

dffit <- dffits(model.1)
round(dffit, 6)

cook <- cooks.distance(model.1)
round(cook, 6)

detach(influence2)
