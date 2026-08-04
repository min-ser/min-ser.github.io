coolhearts <- read.table("coolhearts.txt", header=T)
attach(coolhearts)

model.1 <- lm(Inf. ~ Area + X2 + X3)
summary(model.1)
anova(model.1)

plot(Area, Inf., type="n", ylim=c(-0.2, 1),
     xlab="Size of area at risk (grams)",
     ylab="Size of infarcted area (grams)")
for (i in 1:32) points(Area[i], Inf.[i], pch=Group[i], col=Group[i])
for (i in 1:3) lines(Area[Group==i], fitted(model.1)[Group==i], lty=i, col=i)
legend("topleft", legend=c("no cooling", 
                           "late cooling",
                           "early cooling"),
       col=3:1, pch=3:1, inset=0.02)

detach(coolhearts)
