import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtGrid } from 'taro-ui'
import request from '../../utils/request'

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
        <Text>{data.full_name}</Text>
        <Text>{data.description}</Text>
        <View className='at-row'>
          <View className='at-col card'>
            <Text>{data.watchers_count}</Text>
            <Text>Watchs</Text>
          </View>
          <View className='at-col'>
            <Text>{data.subscribers_count}</Text>
            <Text>Stars</Text>
          </View>
          <View className='at-col'>
            <Text>{data.forks_count}</Text>
            <Text>Forks</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default RepoDetail
