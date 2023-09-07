<template>
  <v-app>
    <v-container>
      <h1 class="mb-4">Pokemon List</h1>
      <v-text-field
        v-model="$store.state.searchQuery"
        label="Search Pokemon"
        @input="searchPokemon"
      ></v-text-field>

      <v-row>
        <v-col
          v-for="pokemon in $store.state.pokemonList"
          :key="pokemon.id"
          cols="12"
          md="4"
        >
          <v-card @click="showPokemonDetails(pokemon)">
            <v-card-title>{{ pokemon.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-card v-if="$store.state.selectedPokemon">
        <v-card-title>
          <h2>{{ $store.state.selectedPokemon.name }}</h2>
        </v-card-title>
        <v-card-text>
          <p>Height: {{ $store.state.selectedPokemon.height }}</p>
          <p>Weight: {{ $store.state.selectedPokemon.weight }}</p>
        </v-card-text>
      </v-card>

      <v-progress-circular
        v-if="$store.state.loading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-container>
  </v-app>
</template>

<script>
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
    searchPokemon() {
      this.$store.commit("SET_SELECTED_POKEMON", null);
    },
    showPokemonDetails(pokemon) {
      this.$store.dispatch("fetchPokemonDetails", pokemon.url);
    },
  },
  mounted() {
    this.$store.dispatch("fetchPokemonList");
  },
};
</script>
