"use strict"

const fs = require('fs')
const courses = require('./data')
const options = {
	nombre:{
		demand: true,
		alias: 'n'
	},
	cedula:{
		demand: true,
		alias: 'c'
	},
	id:{
		demand: true,
		alias: 'i'
	}
}
const argv = require('yargs').command('inscribir', 'Inscribirse en un curso', options).argv;
let describeCourse = course => console.log('El curso de ' + course.name + ' con ID = ' + course.id + ' tiene un costo de ' + course.price)

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
	let course = courses.find(course => {return course.id === argv.i})

	if(course !== undefined){
		describeCourse(course)
		let createFile = (name, id, course) => {
			let text = 'Se realizó correctamente el proceso de inscripción, a continuación se presenta la información del estudiante y del curso:\n\n\nINFORMACIÓN DEL ESTUDIANTE\nNombre: ' + name + '\nCédula: ' + id + 
						'\n\nINFORMACIÓN DEL CURSO\nNombre: '  + course.name + '\nCódigo: ' + course.id + '\nPrecio: ' + course.price

			fs.writeFile('inscripcion.txt', text, (err) => {
				if(err) throw (err);
				console.log('¡Se ha inscrito correctamente!');
			})
		}

		createFile(argv.n, argv.c, course);;
	}else{
		console.log('¡El curso solicitado no existe!')
	}
}