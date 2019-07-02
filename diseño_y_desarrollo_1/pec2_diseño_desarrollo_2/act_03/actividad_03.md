Ejercicio 3 - SWARM (2 puntos)

Lanzo swarm apuntando a mi nodo de rinkeby:

> swarm --ens-api "test:0xe7410170f87102df0055eb195163a03b7f2bff4a@http://127.0.0.1:33000" --bzzaccount 0xb9225c26f0390cc7eb9d9f530c423175f4273012 --datadir /home/jredondoh/.ethereum/rinkeby/

Creo mi página web en la carpeta swarm_activity y la subo a swarm de manera encriptada:
> swarm --recursive up --encrypt swarm_activity/

Obteniendo como hash:

90564f001281919c3204a73bc550bcf79fc4390937d574a586d89e9814efdb4501ee8afeb2199741d0a5aa6493a2cf244cc8d28fac3e4c03dacb1bc9ac677b57

![img](img/act_03_swarm_upload.png)

Después accedo con el navegador:

http://localhost:8500/bzz:/90564f001281919c3204a73bc550bcf79fc4390937d574a586d89e9814efdb4501ee8afeb2199741d0a5aa6493a2cf244cc8d28fac3e4c03dacb1bc9ac677b57/index.html

![img](img/act_03_index.png)

Y puedo navegar entre los enlaces sin que el hash de la barra de direcciones cambie:

![img](img/act_03_doc1.png)
![img](img/act_03_doc2.png)
