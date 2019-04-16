import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtToast } from 'taro-ui'
import request from '../../utils/request'

class SearchRepos extends Component {
  state = {
    repos: [],
    loading: false,
  }
  componentDidMount() {
    this.setState({
      loading: true
    }, () => {
      request('/search/repositories', {
        data: {
          q: 'redux',
        }
      }).then(({ data }) => {
        this.setState({
          repos: data.items,
          loading: false,
        })
      });
    });
  }

  render() {
    const { repos, loading } = this.state;
    return (
      <View>
        <AtToast isOpened={loading} text='加载中...' icon='loading'></AtToast>
        <AtList>
          {
            repos.map((repo) => (
              <AtListItem
                key={repo.id}
                title={repo.full_name}
                thumb={repo.owner.avatar_url}
                arrow='right'
                extraText={<Text>{repo.watchers_count}</Text>}
              />
            ))
          }
        </AtList>
      </View>
    )
  }
}

export default SearchRepos

