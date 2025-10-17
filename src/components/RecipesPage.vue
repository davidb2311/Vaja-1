<template>
    <div>
        <h2>{{ $route.params.recipe }}</h2>
        <div v-if="msg" class="menu">
            <div v-for="elm in msg" class="card" style="width: 18rem;">
                <img class="card-img-top" :src="elm.strMealThumb" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">{{elm.strMeal}}</h5>
                    <a class="btn btn-success"><router-link :to="{name:'recipe',params:{recipe:elm.strMeal}}" style="text-decoration: none; color:white ;">Recipe Details</router-link></a>
                    <button class="btn btn-light ms-2" @click="savefav(elm.strMeal)">
                        <i class="fa-solid fa-star" v-if="hasfav(elm.strMeal)"></i>
                        <i class="fa-regular fa-star" v-else></i>
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>Sorry it seems your search isnt valid</h2>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:[],
            err:null,
            favorites:[]
        }
    },
    methods:{
        async getsource(){
            try{
                if(this.$route.params.type=="cat"){
                const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.$route.params.recipe}`)
                const data=await response.json()
                this.msg=data.meals
                }else if(this.$route.params.type=="area"){
                    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.$route.params.recipe}`)
                    const data=await response.json()
                    this.msg=data.meals
                }else if(this.$route.params.type=="food"){
                    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.$route.params.recipe}`)
                    const data=await response.json()
                    this.msg=data.meals
                }
            }catch(e){
                this.err=e
            }
            
        },
        savefav(fav){
            let found=false
            for(let i of this.favorites){
                if(i==fav){
                    found=true
                }
            }
            if(!found){
                this.favorites.push(fav)
                localStorage.setItem(`favorites`,JSON.stringify(this.favorites))
            }else{
                this.favorites.splice(this.favorites.indexOf(fav),1)
                localStorage.setItem(`favorites`,JSON.stringify(this.favorites))
                if(localStorage.getItem(`favorites`)=="[]"){
                    localStorage.removeItem(`favorites`)
                }
            }
        },
        hasfav(fav){
            return this.favorites.includes(fav)
        },
        loadfav(){
            this.favorites=JSON.parse(localStorage.getItem(`favorites`)) || []
        }
    },
    created(){
        this.getsource()
        this.loadfav()
    },
}
</script>

<style scoped>
    .menu{
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: space-around;
    }
    .btn-success{
        background-color: #42b983;
    }
</style>