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

      <v-dialog v-model="showDialog" max-width="500">
        <v-card>
          <v-card-title>
            <h2>{{ selectedPokemon.species.name }}</h2>
          </v-card-title>
          <v-card-text>
            <p>Height: {{ selectedPokemon.height }}</p>
            <p>Weight: {{ selectedPokemon.weight }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="closeDialog">Tutup</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-progress-circular
        v-if="loading"
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
      selectedPokemon: null,
      loading: false,
      showDialog: false,
    };
  },
  computed: {
    filteredPokemon() {
      return this.$store.state.pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    searchPokemon() {
      this.selectedPokemon = null;
      this.$store.commit("SET_SEARCH_QUERY", this.searchQuery);
    },
    showPokemonDetails(pokemon) {
      this.selectedPokemon = null;
      this.$store.dispatch("fetchPokemonDetails", pokemon.url);
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
  mounted() {
    this.$store.dispatch("fetchPokemonList");
  },
};
</script>
