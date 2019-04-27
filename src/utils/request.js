import Taro from '@tarojs/taro';

// 注入拦截器
Taro.addInterceptor(Taro.interceptors.logInterceptor);
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);

const BASE_URL = 'https://api.github.com'
const Github_TOKEN = 'token 162d44f383a7930059502f7362653f3c641010fe'

export default function request(uri, options = {}) {
  const baseURL = options.baseUrl || BASE_URL
  return Taro.request({
    url: `${baseURL}${uri}`,
    header: {
      Authorization: Github_TOKEN
    },
    ...options,
  })
  .then(({ data: resp }) => resp)
}
