import { createStore } from 'vuex'; // Import dari 'vuex' pada Vue 3
import axios from 'axios';

export default createStore({
    state() {
        return {
            searchQuery: '',
            pokemonList: [],
            selectedPokemon: null,
            loading: false,
        };
    },
    mutations: {
        SET_SEARCH_QUERY(state, query) {
            state.searchQuery = query;
        },
        SET_POKEMON_LIST(state, pokemonList) {
            state.pokemonList = pokemonList;
        },
        SET_SELECTED_POKEMON(state, pokemon) {
            state.selectedPokemon = pokemon;
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        },
    },
    actions: {
        async fetchPokemonList({ commit }) {
            try {
                commit('SET_LOADING', true);
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
                commit('SET_POKEMON_LIST', response.data.results);
            } catch (error) {
                console.error(error);
            } finally {
                commit('SET_LOADING', false);
            }
        },
        async fetchPokemonDetails({ commit }, pokemonUrl) {
            try {
                commit('SET_LOADING', true);
                const response = await axios.get(pokemonUrl);
                // console.log(response.data)
                commit('SET_SELECTED_POKEMON', response.data);
            } catch (error) {
                console.error(error);
            } finally {
                commit('SET_LOADING', false);
            }
        },
    },
});
