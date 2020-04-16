const app = new Vue({
    el: "#app",
    data:{
        products: [],        
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
        }
    },
    created(){
        this.callApiProducts()
    }
});

