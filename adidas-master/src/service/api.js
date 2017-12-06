// export const SERVER = "http://192.168.1.210:3000";

// export const login = (form) => {
// 	return fetch(SERVER+"/login", {
// 		credentials: "include",
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(form)
// 	}).then((res) => {
// 		return res.json();
// 	})
// }

// export const logout = () => {
// 	return fetch(SERVER+"/logout", {
// 		credentials: "include",
// 	}).then((res) => {
// 		return res.json();
// 	})
// }

// export const captcha = () => {
//   return fetch(SERVER+"/captcha", {
//     credentials: "include",
//   }).then((res) => {
//     return res.json() 
//   })
// }

// export const signup = (form) => {
// 	return fetch(SERVER+"/signup", {
// 		credentials: "include",
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(form)
// 	}).then((res) => {
// 		return res.json()
// 	})
// }

// export const getCat = (leval) =>{
// 	return fetch(SERVER+"/manage/category/"+(leval || ""),{
// 		credentials:"include",
// 	}).then((res)=>{
// 		return res.json()
// 	})
// }

// export const addCat = (form) =>{
// 	return fetch(SERVER+"/manage/category",{
// 		credentials:"include",
// 		method:"POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body:JSON.stringify(form)
// 	}).then((res)=>{
// 		return res.json()
// 	})
// }

// export const addProduct = (form) =>{
// 	return fetch(SERVER+"/manage/product",{
// 		credentials:"include",
// 		method:"POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body:JSON.stringify(form)
// 	}).then((res)=>{
// 		return res.json()
// 	})
// }

// export const getProduct = (id)=>{
// 	return fetch(SERVER+"/manage/product/"+( id || ""),{
// 		credentials:"include",
// 	}).then((res)=>{
// 		return res.json()
// 	})
// }

// export const addShop=(data)=>{
// 	return fetch(SERVER+"/shoppingcart",{
// 		credentials:"include",
// 		method:"POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body:JSON.stringify(data)
// 	}).then((res)=>{
// 		return res.json()
// 	})
// }

// export const getShop = ()=>{
// 	return fetch(SERVER+"/shoppingcart",{
// 		credentials:"include",
// 	}).then((res)=>{
// 		return res.json()
// 	})
// }

// export const delShop = (id)=>{
// 	return fetch(SERVER+"/shoppingcart"+( id || ""),{
// 		credentials:"include",
// 		method:"DELETE",
// 	}).then((res)=>{
// 		return res.json()
// 	})
// }



import myFetch from "./myFetch";
export const SERVER = "http://192.168.1.210:3000";

// 配置选项 数组长度如果等于3， 那么第三个参数只要不是"none", 则都返回一个带参数的函数对象，否则返回不带参数的函数对象；

const apiConfig = {
  // 数组第一个参数为路径， 第二个为方法， 第三个为数据类型
  login: ["/login", "POST", "json"],
  logout: ["/logout"],
  signup: ["/signup", "POST", "json"],
  captcha: ["/captcha"],

  addCap: ["/manage/category", "POST", "json"],
  modifyCap: ["/manage/category", "PUT", "json"],
  delCap: ["/manage/category", "DELETE", "path"],
  getCaps: ["/manage/category", "GET", "path"],

  addTag: ["/manage/tag", "POST", "json"],
  getTags: ["/manage/tag"],
  modifyTag: ["/manage/tag", "PUT", "json"],
  delTag: ["/manage/tag", "DELETE", "path"],

  addProduct: ["/manage/product", "POST", "json"],
  getProducts: ["/manage/product", "GET", "query"],
  getProduct: ["/manage/product", "GET", "path"],

  addCart: ["/shoppingcart", "POST", "json"],
  getCart: ["/shoppingcart"],
  delCart: ["/shoppingcart", "DELETE", "path"],

  addContact: ["/contact","POST","json"],
  getContact: ["/contact"],
  updateContact: ["/contact","PUT","json"],
  delContact: ["/contact","DELETE",'path'],
  defaultContact: ["/contact","GET","path"]
}


const takeConfigToFunc = (config) => {
  const api = {};
  for (let key in config) {
	const value = config[key];
	if (value.length === 3 && value[2] !== "none") {
	  api[key] = (payload) => (myFetch(...value, payload));
	} else {
	  api[key] = ()=>(myFetch(...value));
	}
  }
  return api
}

export default takeConfigToFunc(apiConfig);