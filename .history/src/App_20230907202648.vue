<template>
  <div id="app">
    <h1>Pokemon List</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search Pokemon"
      @input="searchPokemon"
    />

    <div v-for="pokemon in filteredPokemon" :key="pokemon.id">
      <div @click="showPokemonDetails(pokemon)">{{ pokemon.name }}</div>
    </div>

    <div v-if="selectedPokemon">
      <h2>{{ selectedPokemon.name }}</h2>
      <p>Height: {{ selectedPokemon.height }}</p>
      <p>Weight: {{ selectedPokemon.weight }}</p>
    </div>

    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      pokemonList: [],
      selectedPokemon: null,
      loading: false,
    };
  },
  computed: {
    filteredPokemon() {
      return this.pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async getPokemonList() {
      try {
        this.loading = true;
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        this.pokemonList = response.data.results;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async showPokemonDetails(pokemon) {
      try {
        this.loading = true;
        const response = await axios.get(pokemon.url);
        this.selectedPokemon = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    searchPokemon() {
      this.selectedPokemon = null;
    },
  },
  mounted() {
    this.getPokemonList();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
