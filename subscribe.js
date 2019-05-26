"use strict"

const fs = require('fs'),
	options = {
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
	},
	argv = require('yargs').command('inscribir', 'Inscribirse en un curso', options).argv

let subscribe = (name, id, course) => {
	let text = 'Se realizó correctamente el proceso de inscripción, a continuación se presenta la información del estudiante y del curso:\n\n\nINFORMACIÓN DEL ESTUDIANTE\nNombre: ' + name + '\nCédula: ' + id + 
				'\n\nINFORMACIÓN DEL CURSO\nNombre: '  + course.name + '\nCódigo: ' + course.id + '\nPrecio: ' + course.price

	fs.writeFile('inscripcion.txt', text, (err) => {
		if(err) throw (err);
		console.log('¡Se ha inscrito correctamente!');
	})

	return text
}

module.exports = {argv, subscribe}