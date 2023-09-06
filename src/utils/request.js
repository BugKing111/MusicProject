// 不想把网络请求散落在各个逻辑页面里, 不然以后找起来改起来很麻烦 (封装axios)
import axios from 'axios'
// 设置基础地址
axios.defaults.baseURL = 'http://localhost:3000'
// 导出
export default axios
