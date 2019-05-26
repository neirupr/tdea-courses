"use strict"

const courses = require('./data'),
	{argv, subscribe} = require('./subscribe'),
	express = require('express'),
	app = express()

let describeCourse = course => console.log('El curso de ' + course.name + ' con ID = ' + course.id + ' tiene un costo de ' + course.price),
	confirmationText = ""

/*No command inscribir was requested*/
if(argv._[0] != 'inscribir'){
	let displayCourses = (courses, callback) =>{
		courses.forEach((course, index) =>{
			setTimeout(()=>{
				callback(course);
			}, 2000*(index + 1))
		})
	}

	displayCourses(courses, describeCourse)
} else {
	let course = courses.find(course => course.id === argv.i)

	if(course !== undefined){
		describeCourse(course)
		confirmationText = subscribe(argv.n, argv.c, course)
	}else{
		confirmationText = '¡El curso ' + argv.i + ' solicitado no existe!'
	}
}

app.get('/', (req, res)=>{
	res.send(confirmationText)
})

app.listen(3000)