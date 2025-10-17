<template>
    <div v-if="msg.length">
        <div class="container border border-primary rounded" >
            <h2 class="bg-primary rounded-bottom text-white">{{ msg[0].strMeal }}</h2>
            <div class="d-flex justify-content-center">
                <h4 class="bg-danger p-2 bedge">Category: {{ msg[0].strCategory }}</h4>
                <h4 class="ms-5 bedge bg-danger p-2">Area: {{ msg[0]["strArea"] }}</h4>
                <button class="btn btn-light ms-4" @click="savefav(msg[0].strMeal)">
                        <i class="fa-solid fa-star" v-if="hasfav(msg[0].strMeal)"></i>
                        <i class="fa-regular fa-star" v-else></i>
                </button>
            </div>
            <div class="d-flex">
                <img :src="msg[0].strMealThumb" alt="" class="img-thumbnail" >
                <div>
                    <p>{{ msg[0].strInstructions }}</p>
                    <a :href="msg[0].strYoutube" target="_blank" style="text-decoration: none;" v-if="msg[0].strYoutube">Link to yt video</a>
                    <h5 class="mt-2 text-success">List of ingredients:</h5>
                    <table class="table table-bordered">
                        <tr v-for="i in getcaci()"><td>{{ msg[0][`strIngredient${i}`]}} </td><td>{{ msg[0][`strMeasure${i}`] }}</td></tr>
                    </table>
                </div>
            </div>
            <p></p>
        </div>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            msg:[],
            favorites:[]
        }
    },
    methods:{
        async getdetails(){
            const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.$route.params.recipe}`)
            let data=await response.json()
            for(let i in data.meals[0]){
                if(data.meals[0][i]==""||data.meals[0][i]==" "){
                    delete data.meals[0][i]
                }
            }
            this.msg=data.meals
            this.msg=this.msg.filter(user=>user.strMeal==this.$route.params.recipe)
        },
        getcaci(){
            let i=1
            let j=0
            while(this.msg[0][`strIngredient${i}`]){
                i++
                j++
            }
            return j
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
        this.getdetails()
        this.loadfav()
    }
}
</script>

<style scoped>
    img{
        height: 300px;
        width: 300px;
    }
    .bedge{
        border-radius: 30px;
        color: white;
    }
    
</style>