<template>
	<div id="show-blogs" v-theme:column="'narrow'">
		<Alert v-if="msg" v-bind:message="msg"></Alert>
		<h1>博客总览</h1>
		<input type="text" placeholder="搜索" v-model="search" class="form-control"/>
		<div class="sing-blog" v-for="blog in filteredBlogs">
			<router-link v-bind:to="'/blog/'+blog.id">
				<h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
			</router-link>
			<article>{{blog.content | snippet}}</article>
		</div>
	</div>
</template>

<script>
	import Alert from "./Alert"
	
	export default{
		name:"show-blogs",
		data(){
			return{
				blogs:[],
				search:"",
				msg:""
			}
		},
		methods:{
			
		},
		created(){
			if(this.$route.query.alert){
				this.msg=this.$route.query.alert
			}
			this.$http.get("https://blog-8b5c0.firebaseio.com/posts.json").then(function(res){
				//console.log(res.json())
				return res.json()
				//res.body.slice(0,10)
				//this.blogs=res.body.slice(0,10);
			})
			.then(function(data){
				var blogsArray=[]
				for (var key in data){
					console.log(key)
					console.log(data[key])
					data[key].id=key
					blogsArray.push(data[key])
				}
				console.log(blogsArray)
				this.blogs=blogsArray
			})
		},
		computed:{
			filteredBlogs:function(){
				return this.blogs.filter((blog)=>{
					return blog.title.match(this.search);
				})
			}
		},
//		filters:{
//			"to-uppercase":function(value){
//				return value.toUpperCase()			
//			},
//			"snippet":function(value){
//				return value.slice(0,100)+"..."
//			}
//		}
		filters:{
			toUppercase(value){
				return value.toUpperCase()
			},
			snippet(value){
				return value.slice(0,100)+"..."
			}
		},
		directives:{
			"rainbow":{
				bind(el,binding,vnode){
					el.style.color="#"+Math.random().toString().slice(2,8)
				}
			},
			"theme":{
				bind(el,binding,vnode){
					if(binding.value=='wide'){
						el.style.maxWidth= 1260 + "px"
					}else if(binding.value=='narrow'){
						el.style.maxWidth=560+"px"
					}
					if(binding.arg=='column'){
						el.style.background = "#6677cc";
						el.style.padding = 10 +"px";
					}
				}
			}
		},
		components:{
			Alert
		},
		
	}
</script>

<style scoped>
	#show-blogs{
		max-width: 800px;
		margin: 0 auto;
	}
	h1{
		text-align: center;
		color: #fff;
	}
	.sing-blog{
		padding: 20px;
		margin: 20px 0;
		box-sizing: border-box;
		background: #eee;
		border-radius: 5px;
	}
	/*input[type="text"]{
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
		border-radius: 5px;
	}
	input[type="text"]:focus{
		box-shadow:3px dashed #66afe9
	}*/
	#show-blogs a{
		color: #444;
		text-decoration: none;
	}
</style>