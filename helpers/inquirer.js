const inquirer = require('inquirer')
require('colors')

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: '1. Buscar un lugar',
            },
            {
                value: 2,
                name: '2. Historial',
            },
            {
                value: 0,
                name: '0. Salir',
            },
        ],
    }
]



const inquirerMenu = async() => {


    console.clear()
    console.log('====================='.green);
    console.log('Seleccione una opcion'.green);
    console.log('=====================\n'.green);

    const {opcion} = await inquirer.prompt(menuOpts);

    return opcion;
}

const pausa = async() => {

    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presiones ${ 'Enter'.green } para continuar...` 
        }
    ]

    console.log('\n')

    await inquirer.prompt(pregunta);


}

const leerInput = async(message) => {

    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return `Debes ingresar una ciudad`
                }
                return true
            }

        },
    ]
    const {desc} = await inquirer.prompt(pregunta); 
    return desc;


}

const listarLugares = async( lugares = []) => {

    const choices = lugares.map( (lugar, i)=> {

        const idx = `${(i + 1)}.`.green

        return{
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar',
    })

    // console.log(choices)

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices,
        }
    ]

    const {id} = await inquirer.prompt(preguntas);

    
    return id;
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]


    const {ok} = await inquirer.prompt(question);

    return ok;

}

const mostrarListadoCheckList = async(tareas = []) => {

    const choices = tareas.map( (tarea, i)=> {

        const idx = `${(i + 1)}.`.green

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices,
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);

    
    return ids;
}





module.exports = {
    inquirerMenu,
    listarLugares,
    pausa,
    leerInput,
    confirmar,
    mostrarListadoCheckList,
}





