from tkinter import *

def displayWindow() :
    def func1() :
        if var.get() == 1 :
            labelMain.configure(text="일번")
        elif var.get() == 2 :
            labelMain.configure(text="이번")

    subWindow = Toplevel(window)
    subWindow.geometry('256x256')

    var = IntVar()
    rb1 = Radiobutton(subWindow, text="일번", variable=var, value=1, command=func1)
    rb2 = Radiobutton(subWindow, text="이번", variable=var, value=2, command=func1)

    btn = Button(subWindow, text="닫기", command = subWindow.destroy )
    btn.pack()
    rb1.pack();
    rb2.pack();



## 전역 변수
selectRadio = ''

### 메인 코드부
if __name__ == '__main__' :
    window = Tk()

    ### 메뉴 만들기 ###
    mainMenu = Menu(window)
    window.configure(menu=mainMenu)
    window.geometry('256x256')
    fileMenu = Menu(mainMenu)
    mainMenu.add_cascade(label="파일", menu=fileMenu)
    fileMenu.add_command(label="서브윈도우", command=displayWindow)

    labelMain = Label(window, text="안녕하세요")

    labelMain.pack()
    window.mainloop()