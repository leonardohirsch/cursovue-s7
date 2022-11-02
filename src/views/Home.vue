<script setup>
// @ is an alias to /src

import {ref, watch} from "vue";
import Weboption from '@/components/Weboptions.vue'
import PressupostList from '@/components/PressupostList.vue'

//Para ejercicio 9
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

//Array de servicios para rendizar listado
const servicios=[
  {
    id: 1,
    servicio: "Obtener el presupuesto de una página web",
    precio: 500,
    opciones:[{id: 1, nombre:"Páginas", cantidad:1}, {id: 2, nombre:"Idiomas", cantidad:1}],
    precioOpciones: 30,
  },
  {
    id: 2,
    servicio: "Hacer una campaña SEO",
    precio: 300,
    opciones:[],
    precioOpciones: 0,
  },
  {
    id: 3,
    servicio: "Hacer una campaña de publicidad ",
    precio: 200,
    opciones:[],
    precioOpciones: 0,
  }
]

//Array con los prespuestos cargados
const presupuesto=ref([]);
//Array de input checks de para los servicios
const inputServices=ref({})

//Valor total de cada presupuesto
const presupuestoTotal=ref(0);

//Función para calcular total de cada presupuesto
const calcular=()=>{
  return presupuesto.value.reduce((suma, servicio)=> suma+servicio.precio,0);
}

//Nombre del Presupuesto, para Ejercicio 6
const nombre=ref("");

//Nombre del Cliente, para Ejercicio 6
const cliente=ref("");

//Array de presupuestos cargados, para Ejercicio 6
const presupuestosList=ref([]);

//Variable que determina si muestra o no el listado de presupuestos cargados, para Ejercicio 6
const isActiveAside=ref(false);

//Para ejercicio 6, versión con método. Luego me definí por hacerlo con watchers
// const addDelItem=(item, event)=>{
//   let newPropiedad="servicio_"+item.id;
//   if (event.target.checked){
//     //agregar a URL
//     let optsUrl={};
//     if (item.opciones.length>0){
//       for (let opt of item.opciones){
//         let newOptProperty="s_"+item.id+"_opt_"+opt.id;
//         optsUrl={...optsUrl, [newOptProperty]: opt.cantidad}
//       }
//     }
//     router.replace({query:{...route.query, [newPropiedad]: true, ...optsUrl}})  
//     //agregar a Array de Presupuesto
//     presupuesto.value.push(JSON.parse(JSON.stringify(item)))
//     if (presupuesto.value[presupuesto.value.length-1].opciones.length>0){
//       const productoCantidades=presupuesto.value[presupuesto.value.length-1].opciones.reduce((producto, item)=> producto*item.cantidad,1);
//       presupuesto.value[presupuesto.value.length-1].precio+=productoCantidades*presupuesto.value[presupuesto.value.length-1].precioOpciones;
//     }
//   }
//   else {
//     //chequear si servicio tiene opciones y borrarlas de la url
//     let optsUrl={};
//     let servRemoved=presupuesto.value.find(servicio=> servicio.id==item.id);
//     if (servRemoved.opciones.length>0){
//       for (let opt of servRemoved.opciones){
//         let newOptProperty="s_"+item.id+"_opt_"+opt.id;
//         optsUrl={...optsUrl, [newOptProperty]: undefined}
//       }
//     }
//     presupuesto.value=presupuesto.value.filter(servicio=> servicio.id!==item.id);
//     router.replace({query:{...route.query, [newPropiedad]: undefined, ...optsUrl}})
//   }
// }


//Función para sumar Opciones de cada servicio. El ejercicio solo cuenta un servicio, pero programado de esta manera se pueden agregar opciones también a los otros servicios y calcularlos dinámicamente.
const sumarOpcion=obj=>{
  if (isNaN(parseInt(obj.optCantidad)) || obj.optCantidad<0){
    obj.optCantidad=0;
  }
  const servicioIndex=presupuesto.value.findIndex(servicio=>servicio.id==obj.servicioId);
  if (servicioIndex!=-1){
    const optIndex=presupuesto.value[servicioIndex].opciones.findIndex(opcion=>opcion.id==obj.optId);
    if (optIndex!=-1){
      const indexOriginal=servicios.findIndex(servicio=>servicio.id==obj.servicioId);
      const precioBase=servicios[indexOriginal].precio;
      presupuesto.value[servicioIndex].opciones[optIndex].cantidad=Number(obj.optCantidad);
      const productoCantidades=presupuesto.value[servicioIndex].opciones.reduce((producto, item)=> producto*item.cantidad,1);
      presupuesto.value[servicioIndex].precio=precioBase+(productoCantidades*presupuesto.value[servicioIndex].precioOpciones);
      presupuestoTotal.value=calcular();
      
      let newPropiedad="s_"+presupuesto.value[servicioIndex].id+"_opt_"+presupuesto.value[servicioIndex].opciones[optIndex].id;
      router.replace({query: {...route.query, [newPropiedad]:presupuesto.value[servicioIndex].opciones[optIndex].cantidad} })
    }    
  }
}


//Función para agregar presupuesto a Array de presupuestos, para el ejercicio 6.
let presupuestoId=0;
const addPresupuesto=()=>{
  presupuestoId++;
  const DATE=new Date();

  //Agregar presupuesto a listado de presupuestos cargados
  presupuestosList.value.push({id: presupuestoId, nombre: nombre.value, cliente: cliente.value, presupuesto: JSON.parse(JSON.stringify(presupuesto.value)), total: presupuestoTotal.value, show:false, time:DATE.getTime(), fecha: DATE.getDate()+"/"+(DATE.getMonth()+1)+"/"+DATE.getFullYear()})
  
  //Mostrar listado de presupuestos cargados
  isActiveAside.value=true;

  //Vaciar input texts, listo para cargar un nuevo prespupuesto a continuación
  nombre.value="";
  cliente.value="";
  presupuesto.value.length=0;
  presupuestoTotal.value=0;

  //Para ejercicio 6, versión con método. Luego me definí por hacerlo con watchers
  // const formServicios=document.querySelectorAll(".form-services:checked");
  // for (let checkBoxServicio of formServicios){
  //   checkBoxServicio.checked = false;
  // }

  //Destildar input check servicios luego de cargado el presupuesto, listo para cargar un nuevo prespupuesto a continuación
  for (let propiedad in inputServices.value){
    inputServices.value[propiedad] = false;
  }

  alert("Presupuesto cargado exitosamente!")
}

//Watchers de campos Nombre de presupuesto y Nombre de cliente para actualizar URL en barra de navegación, para ejercicio 9
watch([nombre, cliente], ([newNombre, newCliente]) => {
        if (newNombre!="" || newCliente!=""){
          let url={};
          let urlClone={...route.query};
          delete urlClone.nombre;
          delete urlClone.cliente;
          newNombre!="" ? url.nombre=newNombre.toLocaleLowerCase().replaceAll(" ", "_"): router.replace({query:{...route.query, nombre: undefined}})
          
          newCliente!="" ? url.cliente=newCliente.toLocaleLowerCase().replaceAll(" ", "_"): router.replace({query:{...route.query, cliente: undefined}})
          
          router.replace({query: {...urlClone, ...url } })
        } else if (newNombre=="" && newCliente==""){
          router.replace({query: {} }) 
        }
});

//Watchers de inputs check de servicios para 1. agregar o quitar del presupuesto (para ejercicio 1) y 2. para actualizar URL en barra de navegación (para ejercicio 9)
watch(inputServices.value, (newValue) => {
        for (let servicioId in newValue){
          let newPropiedad="servicio_"+servicioId;
          servicioId= parseInt(servicioId);
          if (newValue[servicioId]===true && presupuesto.value.findIndex(servicio=> servicio.id==servicioId)==-1){//si chequeado y no existe en array de presupuesto, hacer:
            //agregar a URL
            let optsUrl={};
            let servSelected=servicios.find(servicio=> servicio.id==servicioId);
            if (servSelected.opciones.length>0){
              for (let opt of servSelected.opciones){
                let newOptProperty="s_"+servicioId+"_opt_"+opt.id;
                optsUrl={...optsUrl, [newOptProperty]: opt.cantidad}
              }
            }
            router.replace({query:{...route.query, [newPropiedad]: true, ...optsUrl}})

            //agregar a Array de Presupuesto
            presupuesto.value.push(JSON.parse(JSON.stringify(servSelected)))
            if (servSelected.opciones.length>0){
              const productoCantidades=servSelected.opciones.reduce((producto, item)=> producto*item.cantidad,1);
              presupuesto.value[presupuesto.value.length-1].precio+=productoCantidades*servSelected.precioOpciones;
            }
          } else if (newValue[servicioId]===false && presupuesto.value.findIndex(servicio=> servicio.id==servicioId)!=-1) {
            //chequear si servicio tiene opciones y borrarlas de la url
            let optsUrl={};
            let servRemoved=presupuesto.value.find(servicio=> servicio.id==servicioId);
            if (servRemoved.opciones.length>0){
              for (let opt of servRemoved.opciones){
                let newOptProperty="s_"+servicioId+"_opt_"+opt.id;
                optsUrl={...optsUrl, [newOptProperty]: undefined}
              }
            }
            presupuesto.value=presupuesto.value.filter(servicio=> servicio.id!=servicioId);
            router.replace({query:{...route.query, [newPropiedad]: undefined, ...optsUrl}})
          }
        }

        presupuestoTotal.value=calcular(); 
});
</script>

<template>
  <div class="container">
      <div class="main" :class="{activeAside: isActiveAside}">
        <h5>¿Qué desea hacer?</h5>
        <form @submit.prevent="addPresupuesto()">
          <ul>
            <li class="form-li">
              Identificador<br><input type="text" v-model.trim="nombre" required>
            </li>
            <li class="form-li">
              <div class="label">Cliente</div><div class="form-inputs"><input type="text" v-model.trim="cliente" required></div>
            </li>
              <li v-for="servicio in servicios" :key="servicio.id">
                <input class="form-services" type="checkbox" v-model="inputServices[servicio.id]">
                <!-- Para ejercicio 6, versión con método. Luego me definí por hacerlo con watchers
                  <input class="form-services" type="checkbox" @change="addDelItem(servicio, $event); calcular();" v-model="inputServices[servicio.id]">  -->
                {{ servicio.servicio }} ({{ servicio.precio }})
                <ul class="options"  v-if="servicio.opciones.length>0 && presupuesto.map(item=>item.id).includes(servicio.id)">
                  <Weboption v-for="opcion in servicio.opciones" :key="opcion.id" :optNombre="opcion.nombre" :optId="opcion.id" :opt-cantidad="opcion.cantidad" :servicioId="servicio.id" @changeVal="sumarOpcion" />
                </ul>
              </li>
          </ul>
          <div class="totalDiv" v-if="presupuestoTotal>0">
            <span id="spanTotal">Precio Total: {{presupuestoTotal}}</span> | <button id="addBtn" type="submit">Cargar presupuesto</button>
          </div>
        </form>
      </div>
      <div class="aside" v-if="presupuestosList.length>0">
        <h5>Presupuestos cargados</h5>
        <PressupostList :presupuestoArray="presupuestosList"/>
      </div>
    </div>
</template>
<style scoped>
.container{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.main{
  width: 100%;
  margin: 0 auto;
}
ul{
    width: 100%;
    margin: 1rem auto;
    list-style-type: none;
    padding: 1rem;
    border: 1px solid;
    border-radius: 5px;
}
li {
    margin: 0.5rem 0;
    padding: 0.3rem;
    text-align: left;
    background: rgba(249, 239, 239);
}
.options{
    width: 90%;
    border: solid;
    border-radius: 5px;
    list-style-type: none;
    padding: 0;
    margin: 1rem;
}
.totalDiv{
  width: 100%;
  margin: 1rem auto;
  text-align: left;
  background: rgb(193, 188, 188);
  padding: 0.5rem 1rem;
  font-weight: bold;
}
input[type=text]{
  width: 100%;
}
#addBtn{
  margin-left: 2rem;
  padding: 0.5rem;
}
#spanTotal{
  margin-right: 2rem;
  padding: 0.5rem;
}
.aside{
    width: 100%;
  }
@media only screen and (min-width: 576px) {
  
  .aside{
    width: 70%;
  }

}

@media only screen and (min-width: 1000px) {
  .main{
    width: 60%;
  }
  .container{
    justify-content: center;
    flex-direction: row;
    align-items: start;
  }
  .activeAside{
    width: 50%;
  }
  .aside{
    width: 50%;
  }
}
</style>

