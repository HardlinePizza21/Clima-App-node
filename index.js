require('dotenv').config();

const {leerInput, inquirerMenu, pausa, listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {
    
    const busquedas = new Busquedas();
    let opt;
    
    do{

        opt = await inquirerMenu();

        switch(opt){
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
                //Buscar los lugares    
                const lugares = await busquedas.ciudad(termino);
                
                //Seleccionar lugares 
                const id = await listarLugares(lugares);
                if(id == '0') continue;

                const lugarSel = lugares.find( l => l.id === id);
                
                //Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);
            
                //Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                
                //Mostrar reslutados
                console.log('\nInformacion del lugar\n'.green)
                console.log('Ciudad:',lugarSel.nombre)
                console.log('Lat:', lugarSel.lat)
                console.log('Lng:', lugarSel.lng)
                console.log('Temperatura:', clima.temp)
                console.log('Minima:', clima.min)
                console.log('Maxima:', clima.max)
                console.log('Informacion:', clima.desc.yellow)
                await pausa();

            break;
            case 2:
                busquedas.leerDB();
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1}.`.green;
                    console.log(`${idx} ${lugar}`)
                });
                await pausa();
                break;
            case 0:
                console.log('Vas a salir al menu')
                await pausa();
                break;   
        }



    }while(opt != 0);


}

main();



