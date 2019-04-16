import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
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
      </View>
    )
  }
}

export default RepoDetail
