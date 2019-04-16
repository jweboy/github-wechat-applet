import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'

class RepoDetail extends Component {
  render() {
    return (
      <View>
        <AtNavBar title='Repository' />
        RepoDetail
      </View>
    )
  }
}

export default RepoDetail
