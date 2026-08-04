oldfaithful <- read.table("oldfaithful.txt", header=T)
attach(oldfaithful)

model <- lm(next. ~ duration)

hist(residuals(model), main="", breaks=12)

qqnorm(residuals(model), main="")
qqline(residuals(model))

residual = c(1,1,1,1,2,3,4,5,6)
p = seq(0.1,0.9,0.1)
sample_quantiles = quantile(residual, p, type = 1)
print(sample_quantiles)
theoretical_quantiles = qnorm(p, mean = mean(residual), sd = sd(residual))
print(theoretical_quantiles)
qqplot(theoretical_quantiles, sample_quantiles)

std_residual = scale(residual)
print(std_residual)
p = seq(0.1,0.9,0.1)
sample_quantiles = quantile(std_residual, p, type = 1)
print(sample_quantiles)
theoretical_quantiles = qnorm(p)
print(theoretical_quantiles)
qqplot(theoretical_quantiles, sample_quantiles)

detach(oldfaithful)