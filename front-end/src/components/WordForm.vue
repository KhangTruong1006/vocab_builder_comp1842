<template>
    <form action="#" @submit.prevent="onSubmit" class="shadow-lg p-3 mt-4">
        <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
    
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i> German
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.german" />
        </div>
    
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i> English
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.english" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="vietnam flag"></i> Vietnamese
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.vietnamese" />
        </div>
        
        <div class="d-flex justify-content-center">
            <button class="positive ui button">Save</button>
        </div> 
    </form>
 </template>
 
 <script>
    export default {
        name: 'word-form',
        props: {
            word: {
            type: Object,
            required: false,
            default: ()=>{
                return {
                    english: '',
                    german: '',
                    vietnamese:''
                }
            }
            }
        },
        data() {
            return {
            errorsPresent: false
            };
        },
        methods: {
            onSubmit: function() {
                if (this.word.english === '' || this.word.german === ''|| this.word.vietnamese === ''){
                    this.errorsPresent = true;
                } else {
                    this.$emit('createOrUpdate',this.word)
                }
            }
        }
    };
 </script>
 
 <style scoped>
 button{
    width: 50%;
 }

  form{
    border-radius: 5px;
    border-width: 2px;
  }
 .error {
   color: red;
 }
 </style>