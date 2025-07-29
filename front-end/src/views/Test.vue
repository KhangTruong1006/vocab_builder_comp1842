<template>
  <div>
    <h1 class="text-center display-3">Test</h1>

    <div v-if="words.length < 5">
      <p>You need to enter at least five words to begin the test</p>
    </div>
    <div v-else>
      <div v-if="!isStarted">
        <form @submit.prevent="onSubmit" class="shadow-lg">
          <h2 class="text-center">Select Language</h2>
          <div class="row">
            <div class="col">
              <p class="bold text-center">First Language</p>
              <select id="first_language" v-model="firstLanguage">
                <option
                  v-for="option in options"
                  :key="option.value"
                  :value="option.value"
                >
                  <i :class="option.flag">
                    <span>
                      {{ option.name }}
                    </span>
                  </i> 
                </option>
              </select>
            </div>
            <div class="col">
              <p class="bold text-center">Second Language</p>
              <select id="second_language" v-model="secondLanguage">
                <option
                  v-for="option in options"
                  :key="option.value"
                  :value="option.value"
                  :disabled="option.value === firstLanguage"
                >
                <i :class="option.flag">
                    {{ option.name }} {{ option.value === firstLanguage ? '(already chosen)' : '' }}
                </i>
                </option>
              </select>
            </div>
          </div>
          <br />
          <div class="d-flex justify-content-center">
            <button class="btn btn-success btn-lg bold">Start</button>
          </div>
        </form>
      </div>

      <div v-else>
        <vocab-test
          :words="words"
          :first-language="firstLanguage"
          :second-language="secondLanguage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';
import VocabTest from '../components/VocabTest.vue';

export default {
  name: 'test',
  components: {
    'vocab-test': VocabTest,
  },
  data() {
    return {
      words: [],
      isStarted: false,
      firstLanguage: 'english',
      secondLanguage: 'german',
      options: [
        { name: 'English', flag: 'united kingdom flag', value: 'english' },
        { name: 'German', flag: 'germany flag', value: 'german' },
        { name: 'Vietnamese', flag: 'vietnam flag', value: 'vietnamese' },
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.firstLanguage === this.secondLanguage) {
        this.flash('Sorry, choose another language','error');
        return;
      }
      this.isStarted = true;
    },
  },
  async mounted() {
    this.words = await api.getWords();
  },
};
</script>

<style scoped>
  button {
    width: 50%;
  }

  form {
    border-width: 2.5px;
    border-radius: 5px;
    margin: 30px;
    padding:10px;
  }
  
  select,
  ::picker(select){
    appearance: base-select;
  }

  select {
    width: 100%;
    height: 35px;
    border-radius: 5px;
  }

  option{
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  option{
    padding-block: 1rem;
  }
  
  option::checkmark{
    display: none;
  }

  option:checked{
    background: #eee
  }
</style>
