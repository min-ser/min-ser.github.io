iqsize <- read.table("iqsize.txt", header=T)
attach(iqsize)

pairs(cbind(PIQ, Brain, Height, Weight))

model <- lm(PIQ ~ Brain + Height + Weight)
summary(model)

anova(model)

Brain2 = Brain * 2
model <- lm(PIQ ~ Brain + Brain2)
summary(model)

detach(iqsize)


