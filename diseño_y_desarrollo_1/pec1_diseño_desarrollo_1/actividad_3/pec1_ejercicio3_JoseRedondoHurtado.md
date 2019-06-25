**PEC1 - DISEÑO Y DESARROLLO 1**

**José Redondo Hurtado**

**EJERCICIO 3**

https://gist.github.com/cryptogoth/10a98e8078cfd69f7ca892ddbdcf26bc 
 - Obtenga el address correspondiente al bloque génesis de la red Rinkeby mediante
la consola del cliente Geth y demuestre cómo lo ha obtenido. No use la función
getBlock(...)​.
> admin.nodeInfo.protocols.eth.genesis

    "0x6341fd3daf94b748c72ced5a5b26028f2474f5f00d824504e4fa37a75767e177"


- Obtenga sólo la cantidad de peers a los que está conectado. Demuestre cómo lo
ha obtenido.
> net.listening

    true

> net.peerCount

    1

- Obtenga información acerca de los peers a los que está conectado e indique el
hash del bloque actual de éstos.


Para el primero (y único) de mis peers:
> admin.peers[0]



- Añada manualmente mediante la consola de Geth un ​bootnode​ de la red Rinkeby

https://github.com/ethereum/go-ethereum/blob/79b11121a7e4beef0d0297894289200b9842c36c/params/bootnodes.go#L23 

Cojo uno de Rinkeby
"enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303" 
> admin.addPeer("enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303")

