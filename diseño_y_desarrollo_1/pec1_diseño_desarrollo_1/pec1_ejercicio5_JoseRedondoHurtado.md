**PEC1 - DISEÑO Y DESARROLLO 1**

**José Redondo Hurtado**


**EJERCICIO 5:**

- function sumValues (uint _a, uint _b) public view returns (uint _c) {}
- function getGasDetails() public payable{}
- function __callback(bytes32 id, string memory result) public{}
- function jrh(uint8 _a, address _address) internal{}

Para calcularlos se ejecuta la función hash Keccak-256 (SHA-3), yo usé una función online para calcular este hash (http://emn178.github.io/online-tools/keccak_256.html), sobre:
- el nombre de la función
- su tipo de parámetros, sin espacios
- usar solamente los 4 primeros bytes. 

Por lo tanto para las funciones propuestas lo calculamos sobre:

sumValues(uint,uint)

    06cbb876

getGasDetails()

    3d86f4af

_callback(bytes32,string)

    cee77be9

jrh(uint8,address)

    fd0498f3
