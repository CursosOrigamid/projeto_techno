const app = new Vue({
    el: "#app",
    data:{
        products: [], 
        product: false,
        cart:[],
    },
    filters: {
    signPrice(valor){
        console.log(valor);
        return  valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
        }
    },
    computed:{
        cartTotal(){
            let total = 0;
            if(this.cart.length){
                /* 
                    Essa parte estou percorrendo o array e inserindo a informação no item
                    na parte do total += estou atribuindo os valore ao total e somando
                */
                this.cart.forEach(item => {
                    total += item.preco;                    
                });
            }
            return total;
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
                  
        },
        addItemCart(){
            this.product.estoque--;
            /* Aqui vou desustrutar o meu código */
                const {id, nome, preco } = this.product;                
                this.cart.push({id, nome, preco });                
        },
        removeItemCart(indexItemCart){
            /* 
                Interessante aqui, como remover um item da array link de referência
                https://www.educative.io/edpresso/how-to-use-the-splice-method-in-javascript

                Primeiro argumento é a identificação da posição do array e segundo argumento
                quantos eu quero remover, por isso coloquei 1, porque quero remover só 1 item.
            */
            this.cart.splice(indexItemCart,1);
        },        
    },    
    created(){
        this.callApiProducts();                     
    }
});

