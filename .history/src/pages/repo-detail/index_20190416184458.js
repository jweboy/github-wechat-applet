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
        RepoDetail
        <Text>{data.full_name}</Text>
        <View className='at-row'>
          <View className='at-col'>
            <Text>{data.watchers}</Text>
            <Text>Watchs</Text>
          </View>
          <View className='at-col'>B</View>
          <View className='at-col'>C</View>
        </View>
      </View>
    )
  }
}

export default RepoDetail
