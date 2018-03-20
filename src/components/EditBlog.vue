<template>
	<div id="editBlog">
		<alert v-if="msg" v-bind:message="msg"></alert>
		<h1>编辑博客</h1>
		<form v-on:submit.prevent="editBlog">
			<label>博客标题</label>
			<input type="text" placeholder="标题" v-model="blog.title"/>
			<label>博客内容</label>
			<textarea v-model="blog.content"></textarea>
			<div id="checkboxs">
				<label>vue.js</label>
				<input type="checkbox" value="vue.js" v-model="blog.categories"/>
				<label>node.js</label>
				<input type="checkbox" value="node.js" v-model="blog.categories"/>
				<label>react.js</label>
				<input type="checkbox" value="react.js" v-model="blog.categories" />
				<label>Angular4</label>
				<input type="checkbox" value="Angular4" v-model="blog.categories" />
			</div>
			<label>作者</label>
			<select v-model="blog.author">
				<option v-for="author in authors">{{author}}</option>
			</select>
			<button type="submit">确定</button>
		</form>
	</div>
</template>

<script>
	import Alert from "./Alert"
	export default{
		name:"edit-blog",
		data(){
			return{
				blog:{
//					title:"",
//					content:"",
//					categories:[],
//					author:""
				},
				authors:["甲","乙","丙","丁"],
//				submmited:false
				msg:""
			}
		},
		methods:{
			fetchBlog(id){
				this.$http.get('https://blog-8b5c0.firebaseio.com/posts/'+id+'.json').then((res)=>{
					this.blog=res.body
					//console.log(this.blog.author)
				})
			},
			editBlog(){
				if(!this.blog.title||!this.blog.content||(this.blog.categories).length==0){
					this.msg="请补全内容"
				}else{
					console.log("准备发射")
					let blog={
						title:this.blog.title,
						content:this.blog.content,
						categories:this.blog.categories,
						author:this.blog.author
					}
					this.$http.put("https://blog-8b5c0.firebaseio.com/posts/"+this.$route.params.id+".json",blog).then(function(res){
						//console.log(res)
						this.$router.push({path:"/",query:{
							msg:"用户信息更新成功"
							}
						})
					})
					
				}
				//e.preventDefault()
			}
		},
		created(){

			this.fetchBlog(this.$route.params.id)
		},
		components:{
			Alert
		}
		
	}
</script>

<style scoped>
	#editBlog{
		max-width: 600px;
		margin: 20px auto;
		padding: 20px;
	}
	label{
		display: block;
		margin: 20px 0 10px;
	}
	input[type="text"],textarea,select{
		display: block;
		width: 100%;
		padding: 8px;
	}
	textarea{
		height: 200px;
	}
	#checkboxs label{
		display: inline-block;
		margin-top: 0;
	}
	#checkboxs input{
		display: inline-block;
		margin-right: 10px;
	}
	button{
		display: block;
		margin: 20px 0;
		background: crimson;
		color: #FFF;
		border: 0;
		padding: 14px;
		border-radius: 5px;
		font-size: 18px;
		cursor: pointer;
	}
</style>