<template>
  <div>
    <h1>Test</h1>

    <div v-if="words.length < 5">
      <p>You need to enter at least five words to begin the test</p>
    </div>
    <div v-else>
      <div v-if="!isStarted">
        <h2>Select Language</h2>
        <form @submit.prevent="onSubmit">
          <div class="row">
            <div class="col">
              <p class="bold">First Language</p>
              <select id="first_language" v-model="firstLanguage">
                <option
                  v-for="option in options"
                  :key="option.value"
                  :value="option.value"
                >
                  <i :class="option.flag">
                      {{ option.name }}
                  </i> 
                </option>
              </select>
            </div>
            <div class="col">
              <p class="bold">Second Language</p>
              <select id="second_language" v-model="secondLanguage">
                <option
                  v-for="option in options"
                  :key="option.value"
                  :value="option.value"
                  :disabled="option.value === firstLanguage"
                >
                <i :class="option.flag">
                    {{ option.name }} {{ option.value === firstLanguage ? '(in use)' : '' }}
                </i>
                </option>
              </select>
            </div>
          </div>
          <br />
          <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
          <button class="btn btn-success">Start</button>
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
      errorMsg: '',
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
        this.errorMsg = 'Please choose two different languages.';
        return;
      }
      this.errorMsg = '';
      this.isStarted = true;
    },
  },
  async mounted() {
    this.words = await api.getWords();
  },
};
</script>

<style scoped>
  select,
  ::picker(select){
    appearance: base-select;
  }
select {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
.bold {
  font-weight: bold;
}
.text-danger {
  color: red;
}
  option::checkmark{
    display: none;
  }
</style>
