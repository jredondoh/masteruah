Ejercicio 4 - SWARM (4 puntos)

Lanzo swarm apuntando a mi nodo de rinkeby, con mi cuenta y apuntando la dirección ENS de rinkeby.(0xe7410170f87102df0055eb195163a03b7f2bff4a)

> swarm --ens-api "test:0xe7410170f87102df0055eb195163a03b7f2bff4a@http://127.0.0.1:33000" --bzzaccount 0xb9225c26f0390cc7eb9d9f530c423175f4273012 --datadir /home/jredondoh/.ethereum/rinkeby/

Reutilizando la DApp del ejercicio 2, la subo a swarm:

> swarm --recursive up dist/

Obteniendo el hash:
c1a2faec33e3382e672569601a58c426b2f58232f256e151c32574ea1421ea2e

![img](img/act_04_swarm_upload.png)

Accedo en el navegador a:

http://localhost:8500/bzz:/c1a2faec33e3382e672569601a58c426b2f58232f256e151c32574ea1421ea2e/index.html

Y la DApp funciona como en local.

![img](img/act_04_dapp_ok_no_ens.png)

Transacción:
0xc3e3730660dfff8f717ff172d3f1c9dc7fed736334dae07a7c62a425e45cab68


Usando el public resolver de la actividad 1:
![img](img/act_04_link_01.png)

Enlacé mi dirección .test de ENS con el hash de swarm.

![img](img/act_04_link_02.png)

> publicResolver.setContent(namehash("jredondoh.test"), "0xc1a2faec33e3382e672569601a58c426b2f58232f256e151c32574ea1421ea2e",{from:eth.coinbase})

Transacción:
0xe0aea9de2941d174d41bd433e525d84d2e79a7d691b01b28230259f318766d0c

Y la DApp funciona como en local, accediendo a través de ENS.

![img](img/act_04_dapp_ok_ens.png)

Transacción:
0xcdd8066cced561f866db1a1d130a574bf97c968f037819ba7154e7dac39a9438