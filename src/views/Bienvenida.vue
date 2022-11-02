<template>
  <div class="container">
    <h1>Nuestra Empresa</h1>
    <h3>IT Web Services es una empresa dedicada a las tecnologías web con más de 20 años de experiencia en el sector</h3>
    <h4>En IT Web Services nos especializamos en:</h4>
    <ul>
      <li>Desarrollar aplicaciones web</li>
      <li>Hacer campañas SEO</li>
      <li>Marketing y Publicidad</li>
    </ul>
    <div>
      <router-link to="/presupuesto">Consulta tu presupuesto</router-link>
    </div>
  </div>
</template>
<style scoped>
h1{
  color: rgb(0, 166, 255);
}
h3{
  color: rgba(0, 166, 255, 0.66);
}
ul{
    width: 50%;
    margin: 2rem auto;
    list-style-type: none;
    padding: 0;
}
li {
    margin: 1rem 0;
    padding: 1rem;
    text-align: center;
    border-bottom: 3px solid;
    border-color: rgba(220, 16, 16, 0.509);
    background: rgba(245, 249, 239, 0.9);
}
</style>
