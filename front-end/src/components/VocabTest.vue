<template>
  <div>
    <h2>Score: {{ score }} out of {{ words.length }}</h2>

    <form action="#" @submit.prevent="onSubmit">
      <!-- First Language (readonly question) -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i :class="getFlagClass(firstLanguage)"></i>
          {{ capitalize(firstLanguage) }}
        </div>
        <input
          type="text"
          readonly
          :disabled="testOver"
          :value="currWord[firstLanguage]"
        />
      </div>

      <!-- Second Language (user input) -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i :class="getFlagClass(secondLanguage)"></i>
          {{ capitalize(secondLanguage) }}
        </div>
        <input
          type="text"
          placeholder="Enter word..."
          v-model="userAnswer"
          :disabled="testOver"
          autocomplete="off"
        />
      </div>

      <button class="positive ui button" :disabled="testOver">
        Submit
      </button>
    </form>

    <p :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true,
    },
    firstLanguage: {
      type: String,
      required: true,
    },
    secondLanguage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      randWords: [...this.words].sort(() => 0.5 - Math.random()),
      incorrectGuesses: [],
      result: '',
      resultClass: '',
      userAnswer: '',
      score: 0,
      testOver: false,
    };
  },
  computed: {
    currWord() {
      return this.randWords.length ? this.randWords[0] : '';
    },
  },
  methods: {
    onSubmit() {
      const correctAnswer = this.currWord[this.secondLanguage]?.toLowerCase() || '';
      const userInput = this.userAnswer.toLowerCase();

      if (userInput === correctAnswer) {
        this.flash('Correct!', 'success');
        this.score += 1;
      } else {
        this.flash('Wrong!', 'error');
        this.incorrectGuesses.push(this.currWord[this.firstLanguage]);
      }

      this.userAnswer = '';
      this.randWords.shift();

      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults() {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrect = this.incorrectGuesses.join(', ');
        this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
        this.resultClass = 'error';
      }
    },
    flash(message, type) {
      this.result = message;
      this.resultClass = type;
    },
    capitalize(word) {
      if (!word) return '';
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    getFlagClass(lang) {
      const flags = {
        english: 'united kingdom flag',
        german: 'germany flag',
        vietnamese: 'vietnam flag',
      };
      return flags[lang] || '';
    },
  },
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}
.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}
.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
.ui.labeled.input {
  margin-bottom: 15px;
}
</style>
