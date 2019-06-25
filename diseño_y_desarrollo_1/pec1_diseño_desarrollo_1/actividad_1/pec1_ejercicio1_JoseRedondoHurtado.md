**PEC1 - DISEÑO Y DESARROLLO 1**

**José Redondo Hurtado**

**EJERCICIO 1**

![Pantallazo](img/pic_1_01.png)

> geth --datadir ./myDataDir init ./myGenesis.json

> geth --datadir ./myDataDir --networkid 1985 console 2>> myEth.log

para crear un nodo, he tenido que cambiar el path de la carpeta ya que:
https://github.com/ethereum/go-ethereum/issues/16342 

En la consola de geth:

> personal.newAccount("hola mundo")

    "0xf7bef114a8653f67ca8dc5450bb8f5b9c3fa08c1"

![Pantallazo](img/pic_1_02.png)

> miner.start()

> eth.getBalance(eth.coinbase)

> miner.stop()

![Pantallazo](img/pic_1_03.png)

