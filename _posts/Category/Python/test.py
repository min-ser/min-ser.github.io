import matplotlib.pylab as plt
import random
import statistics
count = 20
one = 0
two = 0
three = 0
four = 0
five = 0
six = 0

#주사위 랜덤
for i in range(0, count):
    num = random.randrange(1,6+1)
    if num == 1:
        one = one + 1
    elif num == 2:
        two = two + 1
    elif num == 3:
        three = three + 1
    elif num == 4:
        four = four + 1
    elif num == 5:
        five = five + 1
    elif num == 6:
        six = six + 1
print(one, two, three, four, five ,six)

#count max 알고리즘
list_x = [1,2,3,4,5,6]
list_y = [one, two, three, four, five ,six]
mean = (one*1 + two*2 + three*3 + four*4 + five*5 + six*6)/6
print("최대값 : ",(max(list_y)))
print("평균값 : ",statistics.mean(list_y))
plt.ylim(0,max(list_y))
# x축, y축
# plt.hlines(2,1,3, colors="gray", linestyles="solid", li)
# plt.plot(list_x,list_y, label="주사위")
plt.axhline(y=mean, xmax=1, color='r', linestyle='-')

plt.show()