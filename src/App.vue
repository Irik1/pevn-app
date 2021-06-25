<template>
 <div class="hello">
    <p>
      Тестирование вывода данных
    </p>
    <input type="button" @click="testSelect1()" value="Тест1">
    <input type="button" @click="testSelect1()" value="Тест2">
    <input type="button" @click="testSelect1()" value="Тест3">
    <input type="button" @click="testSelect1()" value="Тест4">
    <input type="button" @click="testSelect1()" value="Тест5">

    <p>
      Тестирование добавления данных
    </p>
   <input type="button" @click="testAppend1()" value="Тест1">
   <input type="button" @click="testAppend1()" value="Тест2">
   <input type="button" @click="testAppend1()" value="Тест3">
   <input type="button" @click="testAppend1()" value="Тест4">
   <input type="button" @click="testAppend1()" value="Тест5">
  </div>
</template>


<script>
import axios from 'axios'
export default {

  methods: {
     async testSelect1() {
        let data = {
            date: '2019-01-01,2019-09-01',
            status: 1,
            teachersIds: '1,2',
            studentCount: '3',
            page : 1,
            lessonsPerPage: 5
          };
        const response = await axios.post('/api/',data);
        console.log(response);
     },
          async testSelect2() {
        let data = {
            date: '2019-01-01,2019-09-01',
            status: 1,
            teachersIds: '1,2',
            studentCount: '3',
            page : 1,
            lessonsPerPage: 5
          };
        const response = await axios.post('/api/',data);
        console.log(response);
     },
          async testSelect3() {
        let data = {
            date: '2019-01-01,2019-09-01',
            status: 1,
            teachersIds: '1,2',
            studentCount: '3',
            page : 1,
            lessonsPerPage: 5
          };
        const response = await axios.post('/api/',data);
        console.log(response);
     },
          async testSelect4() {
        let data = {
            date: '2019-01-01,2019-09-01',
            status: 1,
            teachersIds: '1,2',
            studentCount: '3',
            page : 1,
            lessonsPerPage: 5
          };
        const response = await axios.post('/api/',data);
        console.log(response);
     },
          async testSelect5() {
        let data = {
            date: '2019-01-01,2019-09-01',
            status: 1,
            teachersIds: '1,2',
            studentCount: '3',
            page : 1,
            lessonsPerPage: 5
          };
        const response = await axios.post('/api/',data);
        console.log(response);
     },
     async testAppend1() {
        console.log("Yay!");
        let data ={
          teachersIds:[1,2],
          title: 'Blue Ocean',
          days: [0,1,3,6],
          firstDate: '2019-09-10',
          lessonsCount: 9,
          lastDate: '2019-12-31'
        }
        const response = await axios.post('/api/lessons',data);
        console.log(response);
     },
          async testAppend2() {
        console.log("Yay!");
        let data ={
          teachersIds:[1,2],
          title: 'Blue Ocean',
          days: [0,1,3,6],
          firstDate: '2019-09-10',
          lessonsCount: 9,
          lastDate: '2019-12-31'
        }
        const response = await axios.post('/api/lessons',data);
        console.log(response);
     },
          async testAppend3() {
        console.log("Yay!");
        let data ={
          teachersIds:[1,2],
          title: 'Blue Ocean',
          days: [0,1,3,6],
          firstDate: '2019-09-10',
          lessonsCount: 9,
          lastDate: '2019-12-31'
        }
        const response = await axios.post('/api/lessons',data);
        console.log(response);
     },
          async testAppend4() {
        console.log("Yay!");
        let data ={
          teachersIds:[1,2],
          title: 'Blue Ocean',
          days: [0,1,3,6],
          firstDate: '2019-09-10',
          lessonsCount: 9,
          lastDate: '2019-12-31'
        }
        const response = await axios.post('/api/lessons',data);
        console.log(response);
     },
          async testAppend5() {
        console.log("Yay!");
        let data ={
          teachersIds:[1,2],
          title: 'Blue Ocean',
          days: [0,1,3,6],
          firstDate: '2019-09-10',
          lessonsCount: 9,
          lastDate: '2019-12-31'
        }
        const response = await axios.post('/api/lessons',data);
        console.log(response);
     },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
