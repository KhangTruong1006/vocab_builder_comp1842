<template>
    <div>
        <h1 class="display-4">Words</h1>
        <table id="id" class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>  
                        <i class="united kingdom flag"></i> English
                    </th>
                    <th>  
                        <i class="germany flag"></i> German
                    </th>
                    <th>  
                        <i class="vietnam flag"></i> Vietnamese
                    </th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(word,i) in words" :key ="i">
                    <td>{{ word.english }}</td>
                    <td>{{ word.german }}</td>
                    <td>{{ word.vietnamese }}</td>
                    <td width="75" class="center aligned">
                        <router-link :to="{name: 'show',params: {id: word._id}}">Show</router-link>
                    </td>
                    <td width="75" class="center aligned">
                        <router-link :to="{name: 'edit',params: {id: word._id}}">Edit</router-link>
                    </td>
                    <td width="75" class="center aligned ">
                        <button type="button" class="btn btn-danger"  @click.prevent="onDestroy(word._id)" href="`/words/${word._id}">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {api} from '../helpers/helpers.js'

    export default {
        name: 'words',
        data() {
            return {
                words: []
            };
        },

        methods: {
            async onDestroy(id) {
                const sure = window.confirm('Are you sure?');
                if(!sure) return;
                await api.deleteWord(id);
                this.flash('Word deleted successfully','success');
                const newWords = this.words.filter(word => word._id !== id);
                this.words = newWords;
            }
        },

        async mounted() {
            this.words = await api.getWords();
        }
    }
</script>