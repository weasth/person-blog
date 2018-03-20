import ShowBlogs from "./components/ShowBlogs.vue"
import Addblog from "./components/AddBlog.vue"
import SingleBlog from "./components/SingleBlog.vue"
import EditBlog from "./components/EditBlog.vue"
export default[
	{path:"/",component:ShowBlogs},
	{path:"/add",component:Addblog},
	{path:"/blog/:id",component:SingleBlog},
	{path:"/edit/:id",component:EditBlog}
]
