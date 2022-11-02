<script setup>
import { ref, computed,watch } from 'vue';

const props=defineProps({
    presupuestoArray:{
        type: Array
    }
})

// const presupuestosClone=ref(JSON.parse(JSON.stringify(props.presupuestoArray)));

const mostrarDetalle=id=>{
    let i=props.presupuestoArray.findIndex(presupuesto=>presupuesto.id==id);
    return props.presupuestoArray[i].show=true;
}
const ocultarDetalle=id=>{
    let i=props.presupuestoArray.findIndex(presupuesto=>presupuesto.id==id);
    return props.presupuestoArray[i].show=false;
}

//Versión con método, luego me definí por Computed properties
// const ordenarPresupuesto=x=>{
//     switch (x){
//         case "nombre": 
//         props.presupuestoArray.sort((a, b) =>a.nombre.localeCompare(b.nombre) );
//         break;
//         case "cliente": 
//         props.presupuestoArray.sort((a, b) =>a.cliente.localeCompare(b.cliente) );
//         break;
//         case "time": 
//         props.presupuestoArray.sort((a, b) => a.time - b.time);
//         break;
//         case "id": 
//         props.presupuestoArray.sort((a, b) => a.id - b.id);
//         break;
//     }
// }

const sortNombre=computed(()=>{
    return props.presupuestoArray.sort((a, b) =>a.nombre.localeCompare(b.nombre) );
})
const sortCliente=computed(()=>{
    return props.presupuestoArray.sort((a, b) =>a.cliente.localeCompare(b.cliente) );
})
const sortTime=computed(()=>{
    return props.presupuestoArray.sort((a, b) => a.id - b.id);
})
const sortId=computed(()=>{
    return props.presupuestoArray.sort((a, b) => a.time - b.time);
})

let showList=ref(sortId.value);
const cambiarLista=x=>{
    switch (x){
        case "nombre": 
            showList.value=sortNombre.value;
        break;
        case "cliente": 
            showList.value=sortCliente.value;
        break;
        case "time": 
            showList.value=sortTime.value;
        break;
        case "id": 
            showList.value=sortId.value;
        break;
    }
}

//Versión con método, luego me definí por Watcher
// const busquedaArray=ref([]);
// const encontrar =event=>{
//     const nombre=event.target.value;
//     // busquedaArray.value=props.presupuestoArray.filter(presupuesto=>presupuesto.nombre==nombre || presupuesto.cliente==nombre);
//     showList.value= props.presupuestoArray.filter(presupuesto=>presupuesto.nombre==nombre || presupuesto.cliente==nombre);
//     if (showList.value.length<1){
//         showList.value=sortId.value;
//     }
// }

const busqueda=ref("");
watch(busqueda, (newValue) => {
    if (newValue!=""){
        showList.value= props.presupuestoArray.filter(presupuesto=>presupuesto.nombre==newValue || presupuesto.cliente==newValue);
    } else{
        showList.value=sortId.value;
    }
});

const ordenarBusqueda=x=>{
    switch (x){
        case "nombre": 
        showList.value.sort((a, b) =>a.nombre.localeCompare(b.nombre) );
        break;
        case "cliente": 
        showList.value.sort((a, b) =>a.cliente.localeCompare(b.cliente) );
        break;
        case "time": 
        showList.value.sort((a, b) => a.time - b.time);
        break;
        case "id": 
        showList.value.sort((a, b) => a.id - b.id);
        break;
    }
}

</script>
<template>
    <div>
        <div>
            <!--Versión con método, luego me definí por Watcher-->
            <!-- Buscar: <input type="text" @keyup="encontrar($event)"> -->
            Buscar: <input type="text" v-model="busqueda">
        </div>
        <div v-if="busqueda.length==0 && showList.length>0">
            <button @click="cambiarLista('nombre')">Ordenar x Nombre</button>
            <button @click="cambiarLista('cliente')">Ordenar x Cliente</button>
            <button @click="cambiarLista('time')">Ordenar x Fecha</button>
            <button @click="cambiarLista('id')">Reiniciar Orden</button>
        </div>
        <div v-if="busqueda.length>0 && showList.length>0">
            <button @click="ordenarBusqueda('nombre')">Ordenar x Nombre</button>
            <button @click="ordenarBusqueda('cliente')">Ordenar x Cliente</button>
            <button @click="ordenarBusqueda('time')">Ordenar x Fecha</button>
            <button @click="ordenarBusqueda('id')">Reiniciar Orden</button>
        </div>
        <!--Versión con método, luego me definí por Watcher-->
        <!-- <ul  v-if="busquedaArray.length>0">
            <li v-for="(presupuesto, index) in busquedaArray" :key="index" class="presupuesto-li">- {{ presupuesto.nombre }}: {{ presupuesto.cliente }} | Total: {{presupuesto.total}} ({{presupuesto.fecha}})<button @click="mostrarDetalle(index)">+</button><button @click="ocultarDetalle(index)" v-if="presupuesto.show">-</button>
                <ul v-if="presupuesto.show" class="servicios-ul">
                    <li v-for="servicio in presupuesto.presupuesto" :key="servicio.id" class="servicio-li"><div>{{ servicio.servicio }} <div v-if="servicio.opciones.length>0"> (<span class="opciones" v-for="(opcion,indice) in servicio.opciones" :key="opcion.id">{{opcion.nombre}}:{{opcion.cantidad}}<span v-if="indice<(servicio.opciones.length-1)">, </span></span>)</div></div></li>
                </ul>
              </li>
        </ul> -->
          <ul>
              <li v-for="presupuesto in showList" :key="presupuesto.id" class="presupuesto-li">- {{ presupuesto.nombre }}: {{ presupuesto.cliente }} | Total: {{presupuesto.total}} ({{presupuesto.fecha}})<button @click="mostrarDetalle(presupuesto.id)">+</button><button @click="ocultarDetalle(presupuesto.id)" v-if="presupuesto.show">-</button>
                <ul v-if="presupuesto.show" class="servicios-ul">
                    <li v-for="servicio in presupuesto.presupuesto" :key="servicio.id" class="servicio-li"><div>{{ servicio.servicio }} <div v-if="servicio.opciones.length>0"> (<span class="opciones" v-for="(opcion,indice) in servicio.opciones" :key="opcion.id">{{opcion.nombre}}:{{opcion.cantidad}}<span v-if="indice<(servicio.opciones.length-1)">, </span></span>)</div></div></li>
                </ul>
              </li>
          </ul>
      </div>
</template>
<style scoped>
ul{
    list-style-type: none;
}
li {
    text-align: left;
}
.presupuesto-li{
    padding: 0.5rem;
    border-bottom: solid 1px;
}
button{
    min-width: 2rem;
    margin: 0.5rem;
    padding: 0 0.5rem;
}
.servicios-ul{
    border: solid 1px;
    border-radius: 5px;
    margin-left: 1rem;
}
</style>
