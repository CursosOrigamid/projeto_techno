const app = new Vue({
    el: "#app",
    data:{
        products: [],        
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

