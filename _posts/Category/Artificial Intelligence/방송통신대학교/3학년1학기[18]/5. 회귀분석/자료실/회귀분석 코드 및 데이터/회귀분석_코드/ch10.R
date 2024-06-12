birthsmokers <- read.table("birthsmokers.txt", header=T)
attach(birthsmokers)

pairs(cbind(Wgt, Gest, Smoke))

model <- lm(Wgt ~ Gest + Smoke)

plot(x=Gest, y=Wgt, ylim=c(2300, 3700), 
     col=ifelse(Smoke==1, "red", "blue"),
     panel.last = 
       c(lines(sort(Gest[Smoke==0]),
               fitted(model)[Smoke==0][order(Gest[Smoke==0])],
               col="blue"),
         lines(sort(Gest[Smoke==1]),
               fitted(model)[Smoke==1][order(Gest[Smoke==1])],
               col="red")))

summary(model)
anova(model)
confint(model)

predict(model, interval="confidence",
        newdata=data.frame(Gest=c(38, 38), Smoke=c(1, 0)))

model.0 <- lm(Wgt ~ Gest, subset=Smoke==0)
summary(model.0)

predict(model.0, interval="confidence",
        newdata=data.frame(Gest=38))

model.1 <- lm(Wgt ~ Gest, subset=Smoke==1)
summary(model.1)

predict(model.1, interval="confidence",
        newdata=data.frame(Gest=38))

Smoke2 <- ifelse(Smoke==1, 0, 1)
model.2 <- lm(Wgt ~ Gest + Smoke + Smoke2)
summary(model.2)

Smoke3 <- ifelse(Smoke==1, 1, -1)
model.3 <- lm(Wgt ~ Gest + Smoke3)
summary(model.3)

predict(model, interval="confidence",
        newdata=data.frame(Gest=38, Smoke=1))

predict(model.3, interval="confidence",
        newdata=data.frame(Gest=38, Smoke3=1))

predict(model, interval="confidence",
        newdata=data.frame(Gest=38, Smoke=0))

predict(model.3, interval="confidence",
        newdata=data.frame(Gest=38, Smoke3=-1))

# Depression
depression <- read.table("depression.txt", header=T)
attach(depression)

head(depression)

to_num <- function(x) {
  if (x == "A") 1
  else if (x == "B") 2
  else if (x == "C") 3
}
plot(x=age, y=y, col=sapply(TRT, to_num))
legend("topleft", col=1:3, pch=1,
       inset=0.02, x.intersp = 1.5, y.intersp = 1.3,
       legend=c("Trt A", "Trt B", "Trt C"))

age.x2 <- age*x2
age.x3 <- age*x3
model.1 <- lm(y ~ age + x2 + x3 + age.x2 + age.x3)
anova(model.1)

pf(24.49, 4, 30, lower.tail=FALSE)
pf(22.84, 2, 30, lower.tail=FALSE)

plot(x=age, y=y, ylim=c(20, 80), col=sapply(TRT, to_num),
     panel.last = c(lines(sort(age[TRT=="A"]),
                          fitted(model.1)[TRT=="A"][order(age[TRT=="A"])],
                          col=1),
                    lines(sort(age[TRT=="B"]),
                          fitted(model.1)[TRT=="B"][order(age[TRT=="B"])],
                          col=2),
                    lines(sort(age[TRT=="C"]),
                          fitted(model.1)[TRT=="C"][order(age[TRT=="C"])],
                          col=3)))
legend("topleft", col=1:3, pch=1, lty=1,
       inset=0.02, x.intersp = 1.5, y.intersp = 1.3,
       legend=c("Trt A", "Trt B", "Trt C"))

plot(x=fitted(model.1), y=residuals(model.1),
     panel.last = abline(h=0, lty=2))

qqnorm(residuals(model.1), main="", datax=TRUE)
qqline(residuals(model.1), datax=TRUE)

