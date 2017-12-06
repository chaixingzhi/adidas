const SERVER = "http://192.168.1.210:3000";
const myFetch = function(path, method="GET", ctype="json", payload="") {
  let url;
  switch (ctype) {
    case "path":
      url = SERVER + path + "/" + payload;
      break;
    case "query":
      url = SERVER + path + "?" + objToQuery(payload);
      break;
    default:
      url = SERVER + path
      break;
  }
  let options = {credentials: "include", method: method};
  switch (method.toUpperCase()) {
    case "POST":
    case "PUT":
    case "DELETE":
      if (ctype === "json") {
        // 默认 使用json 封装数据
        options.body = JSON.stringify(payload);
        options.headers = {"Content-Type": "application/json"};
      } else if (ctype === "path" || ctype === "query") {
      } else {
        // 按照参数格式封装数据
        options.body = payload;
        options.headers = {"Content-Type": ctype}
      }
      break;
    default:
      break;
  }
  return fetch(url, options).then((res) => {
    if (res.status < 400) {
      const cType = res.headers.get("Content-Type")
      if (cType.indexOf("json")> -1) {
        return res.json()
      } else {
        return {OK: false, message: "数据类型错误，需要json 但是收到"+cType}
      }
    }
    return {OK: false, message: res.statusText} 
  });
}


function objToQuery(obj) {
  let str = "";
  for (let key in obj) {
    str = str + key + "=" + obj[key] + "&"
  }
  return str.substr(0, str.length-1)
}

export default myFetch;