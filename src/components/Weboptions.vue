<script setup>
import { ref } from 'vue';

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const props=defineProps({
    optId:{
        type: Number
    },
    optNombre:{
        type: String
    },
    optCantidad:{
        type: Number
    },
    servicioId:{
        type: Number
    }
})

const emit=defineEmits(["changeVal"]);

const cantidad=ref(props.optCantidad);

const increment = ()=>{
     cantidad.value++;
     emit('changeVal',{servicioId: props.servicioId, optId: props.optId, optCantidad: cantidad.value})
};
const decrement = ()=>{
    cantidad.value--;
    if (cantidad.value<1){
        cantidad.value=1;
    }
    emit('changeVal',{servicioId: props.servicioId, optId: props.optId, optCantidad: cantidad.value})
};

const checkData=event=>{
    if (isNaN(parseInt(event.target.value)) || event.target.value<1){
        event.target.value=1;
        cantidad.value=1;
        emit('changeVal',{servicioId: props.servicioId, optId: props.optId, optCantidad: cantidad.value})
    }
}

const dataBsTarget="#modal"+props.optId;
const modalDivId="modal"+props.optId;
</script>
<template>

    <li>
        <div>Número de {{ optNombre }}</div>
        <div class="cantidad_div">
            <button @click.prevent="increment($event)">+</button>
            <input type="number" @input="$emit('changeVal',{servicioId: servicioId, optId: optId, optCantidad: cantidad})" @change="checkData($event)" v-model="cantidad">
            <button @click.prevent="decrement()">-</button>
            <!-- el svg no lo hice con Bootstrap Icons porque por alguna razón que desconozco me tiraba error cuando lo importaba -->
            <button type="button" class="btn-modal" data-bs-toggle="modal" :data-bs-target="dataBsTarget">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
            </button>
    
        </div>
    </li>
<!-- Modal -->
<div class="modal fade" :id="modalDivId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        Debe indicar el número de {{ optNombre }} que tendrá su Sitio Web
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
li {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin: 0.5rem 0;
    padding: 0.3rem;
    background: rgba(249, 239, 239);
    
}
input{
    width: 3rem;
    text-align: center;
}
button{
    width: 2rem;
}
.cantidad_div{
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
}
.btn-modal{
    border: none;
    background-color: transparent;
}
@media only screen and (min-width: 576px) {
    li {
    flex-direction: row;
    justify-content: center;
    text-align: left;
}
}
</style>
