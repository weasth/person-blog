<template>
	<nav>
		<ul>
			<li>
				<router-link to="/" exact>首页</router-link>
				<router-link to="/add" exact>添加博客</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default{
		name:"blog-header",
		data(){
			return{
				
			}
		},
		methods:{
			
		}
		
	}
</script>

<style>
	nav ul{
		list-style: none;
		text-align: center;
		margin: 0;
	}
	nav ul li{
		display: inline-block;
		margin: 0 10px;
	}
	nav ul li a {
		color: #FFF;
		text-decoration: none;
		padding: 12px;
		border-radius: 5px;
	}
	nav{
		background: crimson;
		padding: 30px 0;
		margin-bottom: 40px;
	}
	.router-link-active{
		background: rgba(255,255,255,0.8);
		color: #444;
		font-weight: bold;
	}
	nav ul li a:hover{
		text-decoration: none;
		color: #ffc;
	}
</style>