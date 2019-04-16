import Taro from '@tarojs/taro';

// 注入拦截器
Taro.addInterceptor(Taro.interceptors.logInterceptor);
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);

const BASE_URL = 'https://api.github.com'

export default function request(url, data) {

  return Taro.request({
    url: `${BASE_URL}${url}`,
    ...data,
  })
}
