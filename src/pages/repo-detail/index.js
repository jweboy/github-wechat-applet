import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtAvatar } from 'taro-ui'

import dayjs from '../../utils/day'
import request from '../../utils/request'
import './index.scss'

class RepoDetail extends Component {
  state = {
    data: {},
  }
  componentDidMount() {
    console.warn(this.$router)
    this.asyncGetRepoDetail().then(({ data }) => {
      this.setState({
        data: {
          ...data,
          updated_at: dayjs(data.updated_at).fromNow(),
        }
      });
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
        <AtNavBar className='navbar' title='Repository' leftText='返回' onClickLeftIcon={this.handlReturnClick} />

        {/* header */}
        <View className='header'>
          {/* avatar description */}
          {/* TODO: 头像位置偏移 */}
          <View className='at-row info'>
            <View className='at-col at-col-2 at-col--wrap'>
              <AtAvatar circle image={data.owner.avatar_url} />
            </View>
            <View className='at-col'>
              <View className='repo-name'>
                <Text>{data.full_name}</Text>
              </View>
              <View className='repo-desc'>
                <Text>{data.description}</Text>
              </View>
              <View className='repo-update'>
                <Text>{data.updated_at}</Text>
              </View>
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
      </View>
    )
  }
}

export default RepoDetail
