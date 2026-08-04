## Word Recall

wordrecall <- read.table("wordrecall.txt", header=T)
attach(wordrecall)
head(wordrecall)

# model 1

model.1 <- lm(prop ~ time)
summary(model.1)

plot(x=time, y=prop, ylim=c(-0.1, 0.9),
     panel.last = lines(sort(time), 
                        fitted(model.1)[order(time)]))

plot(x=fitted(model.1), y=residuals(model.1),
     panel.last = abline(h=0, lty=2))

qqnorm(residuals(model.1), main="", datax=TRUE)
qqline(residuals(model.1), datax=TRUE)

shapiro.test(residuals(model.1))

# model 2

lntime <- log(time)
model.2 <- lm(prop ~ lntime)
summary(model.2)

plot(x=lntime, y=prop,
     panel.last = lines(sort(lntime), 
                        fitted(model.2)[order(lntime)]))

plot(x=fitted(model.2), y=residuals(model.2),
     panel.last = abline(h=0, lty=2))

qqnorm(residuals(model.2), main="", datax=TRUE)
qqline(residuals(model.2), datax=TRUE)

shapiro.test(residuals(model.2))

# model 3
prop1.25 <- prop^-1.25
model.3 <- lm(prop1.25 ~ time)
summary(model.3)

plot(x=time, y=prop1.25,
     panel.last = lines(sort(time), 
                        fitted(model.3)[order(time)]))

plot(x=fitted(model.3), y=residuals(model.3),
     panel.last = abline(h=0, lty=2))

qqnorm(residuals(model.3), main="", datax=TRUE)
qqline(residuals(model.3), datax=TRUE)

shapiro.test(residuals(model.3))

predict(model.2, interval="prediction",
        newdata=data.frame(lntime=log(1000)))

coefficients(model.2)[2]*log(10)

confint(model.2)
confint(model.2)[2,]
confint(model.2)[2,]*log(10)

detach(wordrecall)

## Mammal Gestation
mammgest <- read.table("mammgest.txt", header=T)
attach(mammgest)
head(mammgest)

model.1 <- lm(Gestation ~ Birthwgt)
summary(model.1)

plot(x=Birthwgt, y=Gestation,
     panel.last = lines(sort(Birthwgt), 
                        fitted(model.1)[order(Birthwgt)]))

plot(x=fitted(model.1), y=residuals(model.1),
     panel.last = abline(h=0, lty=2))

qqnorm(residuals(model.1), main="", datax=TRUE)
qqline(residuals(model.1), datax=TRUE)

shapiro.test(residuals(model.1))

lnGest <- log(Gestation)
model.2 <- lm(lnGest ~ Birthwgt)
summary(model.2)

plot(x=Birthwgt, y=lnGest,
     panel.last = lines(sort(Birthwgt), 
                        fitted(model.2)[order(Birthwgt)]))

plot(x=fitted(model.2), y=residuals(model.2),
     panel.last = abline(h=0, lty=2))

qqnorm(residuals(model.2), main="", datax=TRUE)
qqline(residuals(model.2), datax=TRUE)

shapiro.test(residuals(model.2))

exp(predict(model.2, interval="prediction",
            newdata=data.frame(Birthwgt=50)))

exp(coefficients(model.2)[2])
exp(confint(model.2)[2,])

detach(mammgest)

# Shortleaf

shortleaf <- read.table("shortleaf.txt", header=T)
attach(shortleaf)
head(shortleaf)

# model 1

model.1 <- lm(Vol ~ Diam)
summary(model.1)

plot(x=Diam, y=Vol,
     panel.last = lines(sort(Diam), 
                        fitted(model.1)[order(Diam)]))

plot(x=fitted(model.1), y=residuals(model.1),
     panel.last = abline(h=0, lty=2))

qqnorm(residuals(model.1), main="", datax=TRUE)
qqline(residuals(model.1), datax=TRUE)

shapiro.test(residuals(model.1))

# model 2

lnDiam <- log(Diam)
model.2 <- lm(Vol ~ lnDiam)
summary(model.2)

plot(x=lnDiam, y=Vol,
     panel.last = lines(sort(lnDiam), 
                        fitted(model.2)[order(lnDiam)]))

plot(x=fitted(model.2), y=residuals(model.2),
     panel.last = abline(h=0, lty=2))

qqnorm(residuals(model.2), main="", datax=TRUE)
qqline(residuals(model.2), datax=TRUE)

shapiro.test(residuals(model.2))

# model 3

lnVol <- log(Vol)
model.3 <- lm(lnVol ~ lnDiam)
summary(model.3)

plot(x=lnDiam, y=lnVol,
     panel.last = lines(sort(lnDiam), 
                        fitted(model.3)[order(lnDiam)]))

plot(x=fitted(model.3), y=residuals(model.3),
     panel.last = abline(h=0, lty=2))

qqnorm(residuals(model.3), main="", datax=TRUE)
qqline(residuals(model.3), datax=TRUE)

shapiro.test(residuals(model.3))

exp(predict(model.3, interval="confidence",
            newdata=data.frame(lnDiam=log(10))))

2^(coefficients(model.3)[2])
2^(confint(model.3)[2,])

detach(shortleaf)
