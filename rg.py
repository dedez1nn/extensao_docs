import secrets
import string

rg = ''.join(secrets.choice(string.digits) for i in range(9))

print(rg)