<template>
    <div>
        <h2>Enjoy your favourite meals ✨</h2>
        <div v-if="msg" class="menu">
            <div v-for="(elm,ind) in msg" class="card" style="width: 18rem;">
                <img class="card-img-top" :src="elm.strMealThumb" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">{{elm.strMeal}}</h5>
                    <a class="btn btn-success"><router-link :to="{name:'recipe',params:{recipe:favorites[ind]}}" style="text-decoration: none; color:white ;">Recipe Details</router-link></a>
                    <button class="btn btn-light ms-2" @click="savefav(elm.strMeal)">
                        <i class="fa-solid fa-star" v-if="hasfav(elm.strMeal)"></i>
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
            favorites:[],
            msg:[]
        }
    },
    methods:{
        async getfav(){
            for(let i of this.favorites){
                console.log(`https://www.themealdb.com/api/json/v1/1/search.php?s=${i}`)
                const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${i}`)
                let data=await response.json()
                data.meals=data.meals.filter(user=>user.strMeal==i)
                this.msg.push(data.meals[0])
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
                this.msg=this.msg.filter(user=>user.strMeal!==fav)
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
        },
        checkjson(caci,fav){
            return caci['strMeal']!=fav
        }
    },
    created(){
        this.loadfav()
        this.getfav()
    }
}
</script>

<style scoped>
.menu{
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: space-around;
    }
</style>