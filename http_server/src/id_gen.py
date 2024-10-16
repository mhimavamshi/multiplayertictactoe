import random
import string

CLIENT_ID_LENGTH = 6

def clientID_gen():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=CLIENT_ID_LENGTH))


GAME_ID_LENGTH = 7

def gameID_gen():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=GAME_ID_LENGTH))