<template>
 <div class="hello">
    <p>
      Тестирование вывода данных
    </p>
    <input type="button" @click="testSelect1()" value="Тест1">
    <input type="button" @click="testSelect2()" value="Тест2">
    <input type="button" @click="testSelect3()" value="Тест3">
    <input type="button" @click="testSelect4()" value="Тест4">
    <input type="button" @click="testSelect5()" value="Тест5">

    <p>
      Тестирование добавления данных
    </p>
   <input type="button" @click="testAppend1()" value="Тест1">
   <input type="button" @click="testAppend2()" value="Тест2">
   <input type="button" @click="testAppend3()" value="Тест3">
   <input type="button" @click="testAppend4()" value="Тест4">
   <input type="button" @click="testAppend5()" value="Тест5">
  </div>
</template>


<script>
import axios from 'axios'
export default {

  methods: {
     async testSelect1() {
        // тест со значениями из условия
        const params = {
            // date: '2019-01-01',
            status: 0,
            teachersIds: '1,2,3,4,5',
            studentCount: '3',
            page : 1,
            lessonsPerPage: 5
          };
        const response = await axios.get('/api/', {params});
        console.log(response);
     },
      // тест с пустыми значениями
          async testSelect2() {
          const params = {
          };
        const response = await axios.get('/api/', {params});
        console.log(response);
     },
     // тест с промежутком дат на второй странице
          async testSelect3() {
        const params = {
            date: '2019-01-01,2019-09-01',
            teachersIds: '3',
            page : 2,
            lessonsPerPage: 4
          };
        const response = await axios.get('/api/', {params});
        console.log(response);
     },
          async testSelect4() {
            // тест с некорректными значениями
        const params = {
            date: 'abcd,efds',
            status: "test",
            teachersIds: 'test',
            studentCount: 'test',
            page : "test",
            lessonsPerPage: "test"
          };
        const response = await axios.get('/api/', {params});
        console.log(response);
     },
     // тест с некоторыми из полей
          async testSelect5() {
          const params = {
            teachersIds: '1,2',
            studentCount: '3',
          };
        const response = await axios.get('/api/', {params});
        console.log(response);
     },
     async testAppend1() {
        // тест с данными из задания
        let data ={
          "teacherIds": [1,4],
          "title": "Blue Ocean",
          "days": [0,1,3,6],
          "firstDate": "2021-01-01",
          "lastDate": "2021-09-01"
        }
        const response = await axios.post('/api/lessons',data);
        console.log(response);
     },
          async testAppend2() {
        // тест без данных
        let data ={
        }
        const response = await axios.post('/api/lessons',data);
        console.log(response);
     },
          async testAppend3() {
        // тест со слишком большим промежутком времени - создастся только 300 записей
        let data ={
          "teacherId": [1,4],
          "title": "Blue Ocean",
          "days": [1],
          "firstDate": "2021-04-01",
          "lastDate": "2000-01-01"
        }
        const response = await axios.post('/api/lessons',data);
        console.log(response);
     },
          async testAppend4() {
        // тест с заведомо некорректными значениями
        let data ={
          teacherIds:[55],
          days: [7,2,33],
          firstDate: '2019-09-10',
          lessonsCount: 333,
          lastDate: '2012-12-31'
        }
        const response = await axios.post('/api/lessons',data);
        console.log(response);
     },

          async testAppend5() {
        // тест с валидными данными
        let data ={
          teachersIds:[1,3,4],
          title: 'Какое-то там название',
          days: [0,6],
          firstDate: '2019-09-10',
          lessonsCount: 40,
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
