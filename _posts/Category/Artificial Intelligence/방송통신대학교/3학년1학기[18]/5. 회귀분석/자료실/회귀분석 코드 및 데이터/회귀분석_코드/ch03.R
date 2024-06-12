skincancer <- read.table("skincancer.txt", header=T)
attach(skincancer)
model <- lm(Mort ~ Lat)
predict(model, interval="confidence", se.fit=T, level = 0.95,
        newdata=data.frame(Lat=40))
predict(model, interval="prediction", level = 0.95,
        newdata=data.frame(Lat=40))
plot(x=Lat, y=Mort,
     xlab="Latitude (at center of state)", ylab="Mortality (deaths per 10 million)",
     ylim=c(60, 260),
     panel.last = c(lines(sort(Lat), fitted(model)[order(Lat)]),
                    lines(sort(Lat), 
                          predict(model, 
                                  interval="confidence")[order(Lat), 2], col="green"),
                    lines(sort(Lat), 
                          predict(model, 
                                  interval="confidence")[order(Lat), 3], col="green"),
                    lines(sort(Lat), 
                          predict(model, 
                                  interval="prediction")[order(Lat), 2], col="purple"),
                    lines(sort(Lat), 
                          predict(model, 
                                  interval="prediction")[order(Lat), 3], col="purple")))
detach(skincancer)
