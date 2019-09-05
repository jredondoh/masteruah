# Carmen Sandiego DApp

## INSTRUCCIONES PARA EL DEPLOYMENT Y PRUEBA DE LA DAPP

Lanzar ganache

Lanzar metamask en nuestro buscador seleccionando como red localhost:port apuntando al puerto en el que se está ejecutando ganache.

Importar alguna cuenta de ganache usando la clave privada.

Me he basado en el truffle webpack por lo que hay que tener truffle instalado:
> npm install -g truffle

En la carpeta descargada de github, para tener las librerías de openzeppelin:
> npm init -y

> npm install --save-exact openzeppelin-solidity

Luego:
> truffle compile

> truffle migrate --development --reset

Las direcciones de los contratos desplegados para CarmenWhereabouts1 y 2 deben de ser guardados ya que son necesarios para la configuración del sistema y las pruebas.

Para ejecutar en localhost:
> cd app

> npm run dev

Abriendo un navegador con Metamask en el localhost:8080 tendríamos acceso a nuestra aplicación.

## LA APLICACIÓN

Es un juego de Carmen Sandiego en el que los jugadores pueden mover al personaje o intentar adivinar dÓnde está (pasando como parámetro un número).
La configuración inicial solamente la puede hacer el dueño del contrato y en ella sitúa al personaje en una posición inicial y apunta a un algoritmo de movimientos. 

En la aplicación web aparece también un botón de depuración para poder obtener la posición del personaje en todo momento, el balance del contrato y la dirección del jugador loggeado con Metamask.

No he podido hacer que se actualice el indicador de la web con la dirección de metamask cuando cambia. Hay que refrescar la página.
Sin embargo sé que hay que usar 
> web3.currentProvider.publicConfigStore.on('update',callback);

Pero no he conseguido que el callback pueda acceder a la lista de cuentas. Apreciaría mucho que me lo contase en la corrección de la PEC.


Para tener una versión no de servidor:
> cd app

> npm run build

Abrir el equivalente a file:///*************/app/dist/index.html

## LIBRERÍAS

Se necesita que se despliegue el contrato de la librería SafeMath y que se enlace con los contratos que lo usan.

## CIRCUIT BREAKER

Como circuit_breaker he implementado un mecanismo de pausa del contrato con la librería Pausable de OpenZeppelin y un método de auto-destrucción para recuperar los fondos y que solamente puede ser llamado cuando el contrato está pausado y por el dueño del contrato.

## FALLOS DE SEGURIDAD

Basándome en la [guía](https://blog.sigmaprime.io/solidity-security.html) referenciada en la asignatura Seguridad y Privacidad, he analizado estos posibles fallos de seguridad

| Vulnerabilidad | Estrategia|
|----------------|-----------|
Re-entrancy | La transferencia de ether se realiza siempre después de la actualización del estado.
Arithmetic over/under flows | Librería SafeMath usada.
Unexpected ether | No aplica.
Delegate call |	No se usa
Default visibilities | Usando compilador de Solidity  versión superior a 0.5.0 que ya no los permite.
Entropy illusion | Entrop|a no usada en la lógica.
External contract referencing | No aplica.
Short address/parameter attack | Parámetros de entrada comprobados para métodos no de configuración.
Unchecked CALL return values | El método transfer es usado en vez de CALL.
Race conditions / Front running | No hay recursos compartidos por varios contratos.
Denial of Service (DOS) |  No aplica, ya que no usa servicios externos.
Block timestamp manipulation | No se usan variables temporales
Constructors with care - Usando compilador de Solidity  versión superior a 0.5.0 con keyword constructor
Unitialized storage pointers | Variables storage solamente manipulables por dueño del contrato en la fase de configuración
Floating points precision | Solamente enteros son usados
Tx.origin authentication | No se usa tx.origin

## MECANISMOS DE ACTUALIZACIÓN

Ya que el contrato hereda de Pausable, se puede pausar para efectuar las actualizaciones necesarias.

El algoritmo del juego se encuentra en una librería accedida a través de un puntero en storage y puede ser modificado sin tener que modificar la interfaz ni manipular los fondos en el contrato principal.

## CAMPAÑA DE PRUEBAS

En la campaña de pruebas he cubierto todas las posibles llamadas a métodos, primero de manera nominal y luego los posibles casos de error previstos: no llamado por dueño, llamado en pausa o no, incumplimiento de requisitos.

Para ejecutar los tests es necesario actualizar los valores de las constantes algorithm_addr1 y algorithm_addr2 con las direcciones de despliegue de los contratos de CarmenWhereabouts y CarmenWhereabouts2 respectivamente.

También hay que asegurarse que la dirección que ha realizado el despliegue de los contratos es accesible como eth.accounts[0].

Todos los test han dado correctos.


## TESTNET
Se ha desplegado en rinkeby con la orden:
> truffle migrate --network rinkeby 

Ya que se había preparado el fichero truffle-config.js para ello.

Las direcciones de despliegue de los contratos son:  

SafeMath  
0xFFFe943BA1BEc7cC204C7a56041F6cfF50083c90  
CarmenWhereabouts  
0xcB02fC8a370e246f6FD9249955E9d95CB62B8287  
CarmenWhereabouts2  
0x8ffB2a8e36B8CaD290c9d57c20306a8128162e88  
CarmenSandiego  
0xbFdDF47BF98Bf7cd39c4f955d78615b992E644F2  

He intentado verificar el código usando:  
https://rinkeby.etherscan.io/verifyContract-solc?a=0xcb02fc8a370e246f6fd9249955e9d95cb62b8287&c=v0.5.9%2bcommit.e560f70d&lictype=4

pero obtengo el error:  
CarmenSandiego.sol:2:1: ParserError: Source "openzeppelin-solidity/contracts/math/SafeMath.sol" not found: File import callback not supported  
import "openzeppelin-solidity/contracts/math/SafeMath.sol"  
^---------------------------------------------------------^  
CarmenSandiego.sol:3:1: ParserError: Source "openzeppelin-solidity/contracts/ownership/Ownable.sol" not found: File import callback not supported  
import "openzeppelin-solidity/contracts/ownership/Ownable.sol"  
^-------------------------------------------------------------^  
CarmenSandiego.sol:4:1: ParserError: Source "openzeppelin-solidity/contracts/lifecycle/Pausable.sol" not found: File import callback not supported
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol"  
^--------------------------------------------------------------^  
CarmenWhereabouts.sol:2:1: ParserError: Source "openzeppelin-solidity/contracts/math/SafeMath.sol" not found: File import callback not supported
import "openzeppelin-solidity/contracts/math/SafeMath.sol"  
^---------------------------------------------------------^  
CarmenWhereabouts2.sol:2:1: ParserError: Source "openzeppelin-solidity/contracts/math/SafeMath.sol" not found: File import callback not supported
import "openzeppelin-solidity/contracts/math/SafeMath.sol"  
^---------------------------------------------------------^  


## IPFS
Con el daemon corriendo en otro terminal:
> ipfs daemon

Con la versión de distribución generada en un paso anterior:

> ipfs add -r app/dist/

Obteniendo como respuesta:

> added QmbLJFQcDiMB8b6z5Wstre5wzs7ceYASwm69xX42z9afXk dist/index.html \
added QmXKoE9VbhjYoovJc9AHE8sydamvbAwkwb39nAbK1gSt2k dist/index.js\
added QmP1Kk57puiS8drwxNt7fbgaEFDSqD7iM2pizGC2FY4nVM dist

Y accediendo a la DApp en el navegador con:
http://127.0.0.1:8080/ipfs/QmXKoE9VbhjYoovJc9AHE8sydamvbAwkwb39nAbK1gSt2k/
