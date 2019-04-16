import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import request from '../../utils/request'

class SearchRepos extends Component {
  state = {
    repos: [],
  }
  componentDidMount() {
    request('/search/repositories', {
      data: {
        q: 'javascript',
      }
    }).then(({ data }) => {
      this.setState({
        repos: data.items,
      })
    });
  }

  render() {
    const { repos } = this.state;
    return (
      <View>
        <AtList>
          {
            repos.map((repo) => (
              <AtListItem
                key={repo.id}
                title={repo.full_name}
                thumb={repo.owner.avatar_url}
                arrow='right'
              />
            ))
          }
        </AtList>
      </View>
    )
  }
}

export default SearchRepos

