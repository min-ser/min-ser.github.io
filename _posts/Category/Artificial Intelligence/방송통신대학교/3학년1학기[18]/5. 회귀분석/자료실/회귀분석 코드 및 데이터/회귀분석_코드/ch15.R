leukemia <- read.table("leukemia_remission.txt", header=T)
attach(leukemia)

model.0 <- glm(REMISS ~ 1, family="binomial")
summary(model.0)

model.1 <- glm(REMISS ~ LI, family="binomial")
summary(model.1)

model.2 <- glm(REMISS ~ LI + TEMP, family="binomial")
summary(model.2)

predict(model.2,
        newdata=data.frame(LI=c(1.1, 0.7), 
                           TEMP=c(0.98, 0.99)),
        type="link")

predict(model.2,
        newdata=data.frame(LI=c(1.1, 0.7), 
                           TEMP=c(0.98, 0.99)),
        type="response")

prob = predict(model.2,
        newdata=data.frame(LI=c(1.1, 0.7), 
                           TEMP=c(0.98, 0.99)),
        type="response")
pred = ifelse(prob > 0.5, 1, 0)
prob
pred

model.3 <- glm(REMISS ~ CELL + SMEAR + INFIL + LI + BLAST + TEMP, family="binomial")
summary(model.3)

anova(model.0, test="Chisq")
anova(model.1, test="Chisq")
anova(model.2, test="Chisq")
anova(model.3, test="Chisq")

pchisq(8.2988, df=1, lower.tail=FALSE)
pchisq(1.2564, df=1, lower.tail=FALSE)
2 * pnorm((3.26/1.338), lower.tail=FALSE)

logLik(model.0)
logLik(model.2)
1 - (logLik(model.2)[1]/logLik(model.0)[1]) #r2
1 - (model.2$deviance/model.0$deviance)

pearson_residual <- residuals(model.2, type="pearson")
deviance_residual <- residuals(model.2, type="deviance")

plot(fitted(model.2), pearson_residual)
plot(fitted(model.2), deviance_residual)

qqnorm(pearson_residual, main="", datax=TRUE)
qqline(pearson_residual, datax=TRUE)

qqnorm(deviance_residual, main="", datax=TRUE)
qqline(deviance_residual, datax=TRUE)

hatvalues(model.2)
rstudent(model.2)
cooks.distance(model.2)

detach(leukemia)