/**

PRA1 – Funciones y POO (UOC)

Autor: Mateo Berger

Fecha: 2025-11-11

Contenido:

class Pokemon (propiedades + getters/setters)

class PokemonList (add/remove/show)

Arrow fns en PokemonList: addMultiplePokemons, getPokemonsByWeightRange, sortPokemonsByBaseExperience

Función recursiva: findPokemonById

reduce: getMostCommonType

map+filter: getStrongPokemons

Al final: bloque de VALIDACIÓN por consola (tal y como nos lo pide la práctica)
*/

// 1. Creación de la clase Pokemon, que representa a un objeto Pokemon
class Pokemon {
  constructor({ id, name, description, height, weight, baseExperience, abilities, types, sprites, stats }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.height = height;
    this.weight = weight;
    this.baseExperience = baseExperience;
    this.abilities = abilities;
    this.types = types;
    this.sprites = sprites;
    this.stats = stats;
  }

  // === Getters y Setters ===
  get pokemonName() { return this.name; }
  set pokemonName(newName) { this.name = newName; }

  get pokemonWeight() { return this.weight; }
  set pokemonWeight(newWeight) { this.weight = newWeight; }

  // Tipo principal (primer tipo del array)
  get mainType() { return Array.isArray(this.types) && this.types.length > 0 ? this.types[0] : undefined; }
  set mainType(t) {
    if (!Array.isArray(this.types)) this.types = [];
    if (this.types.length === 0) this.types.push(t);
    else this.types[0] = t;
  }

  // Lectura cómoda del valor de ataque desde stats
  get attack() {
    const atk = (this.stats || []).find(s => s.name === 'attack');
    return atk ? atk.value : undefined;
  }
}

// 2. Creación de la clase PokemonList
class PokemonList {
  constructor() {
    this.items = [];
  }

  // Añadir un Pokémon a la lista
  addPokemon(pokemon) {
    this.items.push(pokemon);
  }

  // Eliminar un Pokémon de la lista por ID
  removePokemon(pokemonId) {
    this.items = this.items.filter(p => p.id !== pokemonId);
  }

  // Mostrar la lista de Pokémon (nombre, tipo principal e imagen)
  showList() {
    this.items.forEach(p => {
      const type = p?.types?.[0] ?? 'unknown';
      console.log(`${p.name} | tipo: ${type} | img: ${p.sprites}`);
    });
  }

  // 3. Funciones flecha

  // Añadir múltiples Pokémon a la vez
  addMultiplePokemons = (...pokemons) => {
    this.items.push(...pokemons);
};

  // Obtener Pokémon dentro de un rango de peso
  getPokemonsByWeightRange = (minWeight, maxWeight) => {
    return this.items.filter(p => p.weight >= minWeight && p.weight <= maxWeight);
  };

  // Ordenar Pokémon por experiencia base
  sortPokemonsByBaseExperience = () => {
    this.items.sort((a, b) => a.baseExperience - b.baseExperience);
    return this.items;
  };
}

// 4. Función recursiva para buscar un Pokémon por ID
function findPokemonById(pokemonList, id, index = 0) {
  const arr = Array.isArray(pokemonList) ? pokemonList
            : Array.isArray(pokemonList?.items) ? pokemonList.items
            : [];

  if (index >= arr.length) return null;
  return arr[index].id === id ? arr[index]
                              : findPokemonById(arr, id, index + 1);
}

// 5. Uso de reduce para encontrar el tipo más común
function getMostCommonType(pokemonList) {
  const arr = Array.isArray(pokemonList) ? pokemonList
            : Array.isArray(pokemonList?.items) ? pokemonList.items
            : [];

  const counts = arr.reduce((acc, p) => {
    (p.types || []).forEach(t => { acc[t] = (acc[t] ?? 0) + 1; });
    return acc;
  }, {});

  let best = null;
  let max = -1;
  for (const [type, n] of Object.entries(counts)) {
    if (n > max) { max = n; best = type; }
  }
  return best;
}

// 6. Uso de map y filter para obtener Pokémon fuertes por ataque
function getStrongPokemons(pokemons, minAttack) {
  const arr = Array.isArray(pokemons) ? pokemons
            : Array.isArray(pokemons?.items) ? pokemons.items
            : [];

  return arr
    .filter(p => (p.stats || []).some(s => s.name === 'attack' && s.value >= minAttack))
    .map(p => p.name);
}


/* ====================================
   DATOS DE EJEMPLO PARA LA VALIDACIÓN
   ==================================== */

// Creamos algunos Pokémon válidos
const pikachu = new Pokemon({
  id: 25,
  name: "Pikachu",
  description: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
  height: 4,
  weight: 60,
  baseExperience: 112,
  abilities: ["static", "lightning-rod"],
  types: ["electric"],
  sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  stats: [
    { name: "hp", value: 35 },
    { name: "attack", value: 55 },
    { name: "defense", value: 40 },
    { name: "speed", value: 90 }
  ]
});

const bulbasaur = new Pokemon({
  id: 1,
  name: "Bulbasaur",
  description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
  height: 7,
  weight: 69,
  baseExperience: 64,
  abilities: ["overgrow", "chlorophyll"],
  types: ["grass", "poison"],
  sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  stats: [
    { name: "hp", value: 45 },
    { name: "attack", value: 49 },
    { name: "defense", value: 49 },
    { name: "speed", value: 45 }
  ]
});

const charmander = new Pokemon({
  id: 4,
  name: "Charmander",
  description: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
  height: 6,
  weight: 85,
  baseExperience: 62,
  abilities: ["blaze", "solar-power"],
  types: ["fire"],
  sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  stats: [
    { name: "hp", value: 39 },
    { name: "attack", value: 52 },
    { name: "defense", value: 43 },
    { name: "speed", value: 65 }
  ]
});

/* ====================================
    EJEMPLOS DE USO Y VALIDACIÓN
    ==================================== */


// Uso de getters y setters
// Demuestro los getters
console.log('Nombre:', pikachu.pokemonName);
console.log('Peso:', pikachu.pokemonWeight);
console.log('Tipo principal:', pikachu.mainType);
console.log('Ataque:', pikachu.attack);
// Demuestro los setters
// nombre
const oldName = pikachu.pokemonName;
pikachu.pokemonName = oldName + ' TEST';
console.log('Nombre (después de setter):', pikachu.pokemonName);
pikachu.pokemonName = oldName; // Lo vuelvo a dejar como antes
// tipo principal
const oldType = pikachu.mainType;
pikachu.mainType = oldType === 'electric' ? 'fire' : 'electric';
console.log('Tipo principal (después de setter):', pikachu.mainType);
pikachu.mainType = oldType; // Lo vuelvo a dejar como antes
// peso
const oldWeight = pikachu.pokemonWeight;
pikachu.pokemonWeight = oldWeight + 1;
console.log('Peso (después de setter):', pikachu.pokemonWeight);
pikachu.pokemonWeight = oldWeight; // Lo vuelvo a dejar como antes

// Crear una lista de Pokémons
const list = new PokemonList();

// Ejemplo 1: añadir un Pokémon
list.addPokemon(pikachu);

// Ejemplo 2: añadir múltiples Pokémons
list.addMultiplePokemons(bulbasaur, charmander);

// Ejemplo 3: eliminar un Pokémon
list.removePokemon(999);

// Ejemplo 4: eliminar un Pokémon
list.removePokemon(1);

// Ejemplo 5: mostrar la lista de Pokémons
console.log('--- showList ---');
list.showList();

// Ejemplo 6: obtener Pokémon por rango de peso
console.log('Peso 60..90 ->', list.getPokemonsByWeightRange(60, 90).map(p => p.name));

// Ejemplo 7: ordenar Pokémon por experiencia base
console.log('Orden por baseExp ->', list.sortPokemonsByBaseExperience().map(p => p.name));

// Ejemplo 8: F. Recursiva para buscar un Pokémon por ID
console.log('Buscar id=4 ->', findPokemonById(list, 4)?.name);

// Ejemplo 9: Tipo más común
console.log('Tipo más común ->', getMostCommonType(list));

// Ejemplo 10: Pokémon fuertes por ataque
console.log('Fuertes (atk >= 50) ->', getStrongPokemons(list, 50));
