const app = new Vue({
    el: "#app",
    data:{
        products: [], 
        product: false,
        cart:[],
        alertMessage: "",
        alertActive: false,
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
                    na parte do total += estou atribuindo os valore ao total e somando. 
                    Não precisa usar o watch porque dentro da minha funcao já tem uma propriedade reativa, então
                    torna turno reativo, ao modificar o meu valor ele vai atualizar lá.
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
                this.alert(`${nome} foi adicionado ao carrinho.`);
                                          
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
        checkLocalStorage(){
            if(window.localStorage.cart){
                /* 
                    usei aqui JSON.parse para transformar string em array
                */
                this.cart = JSON.parse(window.localStorage.cart);
            }
        },
        alert(message){
            this.alertMessage = message;
            this.alertActive = true;
            setTimeout(() => {
                this.alertActive = false;
            }, 1500);

        }        
    }, 
    watch:{
        /* 
            Ele vai ficar de olho no carrinho e toda vez que modificar o valor
            ele vai salvar em localstore
        */
       cart(){
        /* 
            Nesse formato ele não salva, porque é um objeto, e locaStorage salva em string
                window.localStorage.cart = this.cart;
            Para resolver vamos usar JSON.stringgify()  transformar objeto em  string ou qualquer
            outra coisa ele vai transformar em string
        */
            window.localStorage.cart = JSON.stringify(this.cart);
       }

    },   
    created(){
        this.callApiProducts();
        this.checkLocalStorage();                     
    }
});

