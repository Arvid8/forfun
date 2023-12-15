import pyautogui
import time
import random
import signal
import sys

def signal_handler(sig, frame):
    print('Exiting...')
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

moveLeft = True

while True:
    moveby = 1
    x = -moveby if moveLeft else moveby  # Adjust the range as needed
    pyautogui.moveRel(x, 0)

    moveLeft = False if moveLeft else True

    localtime = time.localtime()
    result = time.strftime("%I:%M:%S %p", localtime)

    sleepTime = random.randint(10, 60)
    print('Moved (relative: %s, %s), next move is in %s s' % (x, 0, sleepTime))
    time.sleep(sleepTime)
