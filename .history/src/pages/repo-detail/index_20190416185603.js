import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import request from '../../utils/request'
import './index.scss'

class RepoDetail extends Component {
  state = {
    data: {},
  }
  componentDidMount() {
    console.warn(this.$router)
    this.asyncGetRepoDetail().then(({ data }) => {
      this.setState({ data });
    })
  }

  asyncGetRepoDetail = () => {
    return request('/repos/jweboy/jweboy-cli')
  }

  handlReturnClick = () => {
    Taro.navigateBack()
  };
  render() {
    const { data } = this.state
    return (
      <View>
        <AtNavBar title='Repository' leftText='返回' onClickLeftIcon={this.handlReturnClick} />
        {/* avatar description */}
        <View className='at-row'>
          <View className='at-col at-col-2 at-col--wrap'>
            内容自动换行
          </View>
          <View className='at-col'>
            <Text>{data.full_name}</Text>
            <Text>{data.description}</Text>
          </View>
        </View>
        {/* watch star fork */}
        <View className='at-row'>
          <View className='at-col row'>
            <Text>{data.watchers_count}</Text>
            <Text>Watchs</Text>
          </View>
          <View className='at-col row'>
            <Text>{data.subscribers_count}</Text>
            <Text>Stars</Text>
          </View>
          <View className='at-col row'>
            <Text>{data.forks_count}</Text>
            <Text>Forks</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default RepoDetail
