import secrets
import string

cpf = [int(secrets.choice(string.digits)) for i in range(9)]

soma = sum(cpf[i] * (10 - i) for i in range(9))
resto = (soma * 10) % 11
dv1 = 0 if resto == 10 else resto
cpf.append(dv1)

# Calcula o segundo dígito verificador
soma = sum(cpf[i] * (11 - i) for i in range(10))
resto = (soma * 10) % 11
dv2 = 0 if resto == 10 else resto
cpf.append(dv2)

# Exibe o CPF
cpf_str = ''.join(map(str, cpf))
print(cpf_str)

print(f"{cpf_str[:3]}.{cpf_str[3:6]}.{cpf_str[6:9]}-{cpf_str[9:]}")