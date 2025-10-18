<template>
    <div>
        <div class="d-flex container justify-content-center">
            <input type="text" class="form-control w-50" v-model="search">
            <button class="btn btn-success" @click="submitinfo()">Search this</button>
        </div>
        <div v-if="cat.length">
            <h3 class="mt-4">List of all of the food categories:</h3>
            <ul class="list-group">
                <li v-for="elm in cat" class="list-group-item"><router-link :to="{name:'recipes',params:{recipe:elm.strCategory,type:'cat'}}" style="text-decoration: none; color:#42b983 ;">{{ elm.strCategory }}</router-link></li>
            </ul>
        </div>
        <div v-if="areas.length" >
            <h3 class="mt-5">List of all Countries:</h3>
            <ul class="list-group">
                <li v-for="elm in areas" class="list-group-item"><router-link :to="{name:'recipes',params:{recipe:elm.strArea,type:'area'}}" style="text-decoration: none; color:#42b983 ;">{{ elm.strArea }}</router-link></li>
            </ul>
        </div>
        <h3 class="mt-5">Some random meals that might interest you: </h3>
        <h2 v-if="err">{{ err }}</h2>
        <div v-else-if="msg.length" class="d-flex justify-content-center">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" :src="msg[0].strMealThumb" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">{{msg[0].strMeal}}</h5>
                    <p class="card-text">{{ msg[0].strCategory }}</p>
                    <p class="card-text">{{ msg[0].strArea }}</p>
                    <a class="btn btn-success"><router-link :to="{name:'recipe',params:{recipe:msg[0].strMeal}}" style="text-decoration: none; color:white ;">Recipe Details</router-link></a>
                    <button class="btn btn-light ms-2" @click="savefav(msg[0].strMeal)">
                        <i class="fa-solid fa-star" v-if="hasfav(msg[0].strMeal)"></i>
                        <i class="fa-regular fa-star" v-else></i>
                    </button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:[],
            err:null,
            cat:[],
            areas:[],
            search:"",
            favorites:[]
        }
    },
    methods:{
        async fetchrecipe(){
            try{
                const response=await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
                const dat=await response.json()
                this.msg=dat.meals
            }catch(e){
                this.err=e
            }
        },
        async getcat(){
            try{
                const response=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
                const dat=await response.json()
                this.cat=dat.meals
            }catch(e){
                this.err=e
            }   
        },
        async getareas(){
            try{
                const response=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
                const data=await response.json()
                this.areas=data.meals
            }catch(e){
                this.err=e
            }
        },
        async submitinfo(){
            let res=await this.$router.push({
                name:'recipes',
                params:{
                    recipe:this.search,type:'food'
                }
            })
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
        this.fetchrecipe()
        this.getcat()
        this.getareas()
        this.loadfav()
    }
}
</script>

<style scoped>
    .menu{
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: space-around;
    }
    .list-group{
        display: grid;
        grid-template-columns: auto auto auto;
    }
    .btn-success{
        background-color: #42b983;
    }
    
</style>