const app = new Vue({
    el: "#app",
    data:{
        products: [], 
        product: false       
    },
    filters: {
    signPrice(valor){
        console.log(valor);
        return  valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
        }
    },    
    methods: {
        callApiProducts(){
           fetch("api/products.json")
            .then(r => r.json())
            .then(r => {
                this.products = r;
            })
        },
        callApiProduct(idProduct){
            fetch(`api/products/${idProduct}/dados.json`)           
             .then(r => r.json())
             .then(r => {
                 this.product = r;
             })
         },         
        openModal(id){
            this.callApiProduct(id);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })

            },         
        /* 
            O certo seria assim :
              closeModal(){
                  event.target 
                  event.currentTarget
              }

              
            Como desustruturamos vamos utilizar assim :
              closeModal({target, currentTarget}){
              }
        */
        closeModal({target, currentTarget}){

            /* Esse target pega as informações de onde cliquei exatamente */
            console.log(target);
            /* Esse currentTarge ele pega as infirmações div principal que compõe onde ele clicou */
            console.log(currentTarget);

            if(target === currentTarget){
                this.product = false;
            }
           
            
           /* 
            Tem esse código que pegar as informações da div onde estou clicando 
            teste = event.explicitOriginalTarget;
           */
         
         
        }
    },
    created(){
        this.callApiProducts();        
    }
});

