const Counter = {
    data() {
      return {
        tareas : [],
        nomTarea : "",
        tareasFiltradas : [],
        todas : true,
        textoBuscar : ""
      }
    },
    mounted() {
        if (localStorage.tareas) {
          this.tareas = JSON.parse(localStorage.tareas);  
        }
        this.tareasFiltradas = this.tareas;
        
    },
    methods:
    {
      actualizarLocalStorage(){
        localStorage.tareas = JSON.stringify(this.tareas);
      },
      insertar_tarea() {
        let tarea = {nombre : this.nomTarea, fecha: "", completada:false, prioridad:1 /*0Alta,1Media,2Baja*/};
        this.tareas.push(tarea);
        this.actualizarLocalStorage();
        this.nomTarea = "";
      },
      completarTarea(index){
        this.tareas[index].completada = !this.tareas[index].completada;
        this.actualizarLocalStorage();
      },
      borrarTarea(index){
        let indice = this.tareas.indexOf(this.tareasFiltradas[index]);
        this.tareasFiltradas.splice(index,1);
        if(this.todas == false){
          this.tareas.splice(indice,1);
        }
        this.actualizarLocalStorage();
      },
      borrarCompletadas(){
        this.tareas = this.tareas.filter(tarea => tarea.completada==false);
        this.tareasFiltradas = this.tareasFiltradas.filter(tarea => tarea.completada==false);
        this.actualizarLocalStorage();
      },
      mostrarTodas(){
        this.tareasFiltradas = this.tareas;
        this.todas = true;
      },
      mostrarCompletadas(){
        this.tareasFiltradas = this.tareas.filter(tarea => tarea.completada==true);
        this.todas = false;
      },
      mostrarNoCompletas(){
        this.tareasFiltradas = this.tareas.filter(tarea => tarea.completada==false)
        this.todas = false;
      },
      prioridadAlta(index){
        let indice = this.tareas.indexOf(this.tareasFiltradas[index]);
        this.tareasFiltradas[index].prioridad=0;
        this.tareas[indice].prioridad=0;
        this.ordenar();
        this.actualizarLocalStorage();
      },
      prioridadMedia(index){
        let indice = this.tareas.indexOf(this.tareasFiltradas[index]);
        this.tareasFiltradas[index].prioridad=1;
        this.tareas[indice].prioridad=1;
        this.ordenar();
        this.actualizarLocalStorage();
      },
      prioridadBaja(index){
        let indice = this.tareas.indexOf(this.tareasFiltradas[index]);
        this.tareasFiltradas[index].prioridad=2;
        this.tareas[indice].prioridad=2;
        this.ordenar();
        this.actualizarLocalStorage();
      },
      buscar(){
          this.tareasFiltradas = this.tareas.filter(tarea => tarea.nombre.includes(this.textoBuscar));
      },
      ordenar(){
        this.tareasFiltradas.sort((a,b)=>{return a.prioridad-b.prioridad});
      }
    },
    computed:{
        tareasCompletas(){
          var comp = 0;
          for (tarea of this.tareas){
              if(tarea.completada == true){
                  comp++;
              }
          }
          return comp;
        },
        
        
        
    }
  }

  window.onload = () =>{
  Vue.createApp(Counter).mount('#app')}