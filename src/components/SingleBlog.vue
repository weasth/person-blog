<template>
	<div id="single-blog">
		<h1>{{blog.title}}
			<span>
				<router-link v-bind:to="'/edit/'+this.id" class="btn btn-primary pull-right">编辑</router-link>
				<button v-on:click="delectBlog(blog.id)" class="btn btn-danger">删除</button>
			</span>
		</h1>
		<article>{{blog.content}}</article>
		<p>作者：{{blog.author}}</p>
		<p>分类：</p>
		<ul>
			<li v-for="category in blog.categories">
				{{category}}
			</li>
		</ul>
		
	</div>
</template>
<!--展示详情页-->
<script>
	export default{
		name:"single-blog",
		data(){
			return{
				id:this.$route.params.id,
				blog:{}
			}
		},
		methods:{
			delectBlog(id){
				this.$http.delete("https://blog-8b5c0.firebaseio.com/posts/"+this.id+".json").then((res)=>{
					this.$router.push({path:"/",query:{alert:"删除完成"}})
//					console.log(this.id)
				})
			}
		},
		created(){
			this.$http.get('https://blog-8b5c0.firebaseio.com/posts/'+this.id+'.json').then(function(res){
				console.log(res)
				return res.json()
			})
			.then(function(data){
				this.blog=data
			})
		}
		
	}
</script>

<style scoped>
	#single-blog{
		max-width: 960px;
		margin: 0 auto;
		padding: 20px;
		background: #eee;
		border: 1px dotted #aaa;
		border-radius: 5px;
	}
	button{
		float: right;
	}
	ul{
		list-style: none;
		text-align: center;
		margin: 0;
	}
	li{
		display: inline-block;
		margin: 0 10px;
	}
	/*a {
		color: #FFF;
		text-decoration: none;
		padding: 12px;
		border-radius: 5px;
	}*/
	nav{
		background: crimson;
		padding: 30px 0;
		margin-bottom: 40px;
	}
	.router-link-active{
		background: rgba(255,255,255,0.8);
		color: #444;
	}
	/*span a{
		float: right;
		font-size: 16px;
		color: #000;
	}*/
</style>