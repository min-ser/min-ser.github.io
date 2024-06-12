iqsize <- read.table("iqsize.txt", header=T)
attach(iqsize)
model <- lm(PIQ ~ Brain + Height)

predict(model, interval="confidence", se.fit=T,
        newdata=data.frame(Brain=90, Height=70))

predict(model, interval="prediction",
        newdata=data.frame(Brain=90, Height=70))

plot(x=fitted(model), y=residuals(model),
     xlab="Fitted values", ylab="Residuals",
     panel.last = abline(h=0, lty=2))

plot(x=Brain, y=residuals(model),
     ylab="Residuals",
     panel.last = abline(h=0, lty=2))

plot(x=Height, y=residuals(model),
     ylab="Residuals",
     panel.last = abline(h=0, lty=2))

hist(residuals(model), main="")

qqnorm(residuals(model), main="", datax=TRUE)
qqline(residuals(model), datax=TRUE)

plot(x=Weight, y=residuals(model),
     ylab="Residuals",
     panel.last = abline(h=0, lty=2))

shapiro.test(residuals(model)) 

fits <- fitted(model)
n_sample <- length(fits)
mid_index <- round(n_sample/2)
mid_index

group1_index <- order(fits)[1:mid_index]
group1_error <- residuals(model)[group1_index]

group2_index <- order(fits)[(mid_index+1):n_sample]
group2_error <- residuals(model)[group2_index]

f <- var(group1_error)/var(group2_error)
pf(f,(length(group1_error)-1),(length(group2_error)-1),lower.tail=FALSE)
