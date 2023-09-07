<template>
  <v-app>
    <v-container>
      <h1 class="mb-4">Pokemon List</h1>
      <v-text-field
        v-model="searchQuery"
        label="Search Pokemon"
        @input="searchPokemon"
      ></v-text-field>

      <v-row>
        <v-col
          v-for="pokemon in filteredPokemon"
          :key="pokemon.id"
          cols="12"
          md="4"
        >
          <v-card @click="showPokemonDetails(pokemon)">
            <v-card-title>{{ pokemon.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-card v-if="selectedPokemon">
        <v-card-title>
          <h2>{{ selectedPokemon.name }}</h2>
        </v-card-title>
        <v-card-text>
          <p>Height: {{ selectedPokemon.height }}</p>
          <p>Weight: {{ selectedPokemon.weight }}</p>
        </v-card-text>
      </v-card>

      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-container>
  </v-app>
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
