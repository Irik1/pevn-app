// const { Op } = require("sequelize");
const teachers = require("../models/teachers");
const students = require("../models/students");
const lessons = require("../models/lessons");
const lesson_students = require("../models/lesson_students");
const lesson_teachers = require("../models/lesson_teachers");
const moment = require('moment');

exports.findLessons = async (request, result) =>{
    try{
        console.log(request.query);
        // основной запрос (count считает лишние элементы, потом поправлю)
        let query = `select *
from (
select distinct on ("students"."id") "lessons"."id", "lessons"."date", "lessons"."title", "lessons"."status", 
sum (case when "lesson_students"."visit" = '1' then 1 else 0 end) as "visitCount",
json_agg (distinct jsonb_build_object('id',"students"."id",'name',"students"."name",'visit',"lesson_students"."visit")) as "students",
json_agg (distinct jsonb_build_object('id',"teachers"."id",'name',"teachers"."name")) as "teachers"
from lessons
join  "lesson_students" on "lesson_students"."lesson_id" = "lessons"."id"
join  "lesson_teachers" on "lesson_teachers"."lesson_id" = "lessons"."id"
join "students" on "lesson_students"."student_id" = "students"."id"
join "teachers" on "lesson_teachers"."teacher_id" = "teachers"."id"`;
        // для конструирования запроса, чтобы не возникли лишние where, будем проверять, присутствуют ли еще какие фильтры до этого
        let where = `where`;
        //Организовываем фильтр
        // добавляем дату. Если она не в формате гггг-мм-дд - вызываем исключение. Если дата нормальная - добавляем ее в запрос
        let date;
        if (request.query.date)
            date = request.query.date.split(',');
        if (date){
            if (!date[0].match('(19|20)[0-9]{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])'))
            throw "Введен некорректный формат даты";
             else {
                date[1] === undefined ? query += where + ` "lessons"."date" = '${date[0]}'\n`
                : query += where + ` "lessons"."date" between '${date[0]}' and '${date[1]}'\n`;
                where = "and";
        }
        }
        // добавляем статус, если его значение равно 0 или 1
        const status = request.query.status;
        if (status)
        {
            if (status != 0 && status != 1)
                throw "Введен некорректный статус";
            query += where + ` "lessons"."status" = ${status}\n`
            where = "and";
        }
        // добавляем список учителей
        const teachers = request.query.teachersIds;
        if (teachers)
        {
            query += where + ` "lesson_teachers"."teacher_id" in (${teachers})\n`;
            where = "and";
        }
        // основная часть запроса завершена, дальше идут отступы и ограничения количества вывода
        query += `group by "lessons"."id", "students"."id") as lessonsGroup\n`
        //добавляем пагинацию - количество выводимых записей за раз ограничено значением lessonsPerPage. По умолчанию - 5
        let lessonsPerPage = request.query.lessonsPerPage;
        if (!lessonsPerPage) lessonsPerPage = 5;

        query += `limit ${lessonsPerPage}\n`

        //выбираем текущую страницу. Отступ берем, исходя из количества записей на странице и номера страницы
        let page = request.query.page;
        if (!page) page = 1;
        //определяем отступ
        const offset = (page*lessonsPerPage)-lessonsPerPage;
        query += `offset ${offset}\n`

        // делаем запрос, результат возвращаем на фронт
        let res = await db.query(query);
        console.log(res[0]);
        result.json(res[0]);
    }
    catch (err){
        // в случае ошибок возвращаем код 400
        result.status(400).send("Возникла следующая ошибка -> " + err);
    }
};

exports.createLessons = async (request, result) =>{
    await db.transaction().then(async t=>{
    try{
            let date = new Date(request.body.firstDate); let nextYear = new Date(date);
            nextYear.setFullYear(nextYear.getFullYear()+1);
            // переменная для подсчёта количества занятий в году
            let counter = 0; 
            // результирующая переменная, куда будем складывать id созданных занятий
            let result_arr = [];
            // если в пришедшем массиве данных присутствует количество занятий - 
            if (request.body.lessonsCount)
            {
                //проходим по циклу, пока не создадим нужное количество уроков или дата не станет >= даты, через год после первой
                for (let i = 0; i< request.body.lessonsCount && new Date(nextYear).getTime() > new Date(date).getTime(); i++)
                {
                    // обрабатываем только те дни, что попадают в массив дней
                    if (request.body.days.includes(date.getDay()))
                    {
                        // с помощью библиотеки moment.js приводим дату к нужному формату, а результат заносим в результирующий массив.
                        // затем создаем запись в промежуточной таблице lesson_teachers для каждого учителя
                        const new_lesson = await lessons.create({
                            date: moment(date).format("YYYY-MM-DD"),
                            title: request.body.title,
                            status: 0
                        },{transaction: t});
                        result_arr.push(new_lesson.id);
                        const teachers = request.body.teachersIds;
                        teachers.map(async el=>{
                            await lesson_teachers.create({
                                lesson_id: new_lesson.id,
                                teacher_id: el,
                            },{transaction: t})
                        });
                        counter++; 
                    }
                    else  i--;
                    // задаем следующий день для следующей итерации
                    date.setDate(date.getDate()+1);
                    // если количество добавляемых занятий превысит лимит в 300 - останавливаемся и перестаем добавлять новые занятия
                    if (counter >= 300) break;
                }
            }
            else
            {
                // если нет количества занятий, но присутствует последняя дата - добавляем значения в промежутке
                if (!request.body.lastDate) throw "Введите количество уроков или конечную дату!";
                do
                {
                    // в целом тут выполняется всё то же самое, что в случае создания определенного количества занятий. 
                    // имеет смысл выделить фрагмент добавления в отдельную функцию
                    if (request.body.days.includes(date.getDay()))
                    {
                        const new_lesson = await lessons.create({
                            date: moment(date).format("YYYY-MM-DD"),
                            title: request.body.title,
                            status: 0
                        },{transaction: t});
                        result_arr.push(new_lesson.id);
                        const teachers = request.body.teachersIds;
                        teachers.map(async el=>{
                            await lesson_teachers.create({
                                lesson_id: new_lesson.id,
                                teacher_id: el,
                            },{transaction: t})
                        });
                        counter++; 
                    }
                    // как и в другой ветви, перемещаемся на следующий день и останавливаемся, если достигнут лимит добавляемых записей
                    date.setDate(date.getDate()+1);
                    if (counter >= 300) break;
                }
                // выполняем, пока дата в итерациях не достигнет конечного срока или не пройдет по году вперед. Для удобства сравнения даты переведены в миллисекунды
                while(new Date(date).getTime() != new Date(request.body.lastDate).getTime() && new Date(nextYear).getTime() > new Date(date).getTime()) 
            }
            // завершаем транзакцию и возвращает результат.
            // Почему-то при коммите транзакции вылезает ошибка/предупреждение, что никак не сказывается на работоспособности - код выполняется дальше
            await t.commit();
            result.json(result_arr);
    }
    catch (err){
        // в случае ошибок откатываем транзакцию и возвращаем на фронтенд код ошибки и ее текст
        await t.rollback();
        result.status(400).send("Возникла следующая ошибка -> " + err);
    }
});
}