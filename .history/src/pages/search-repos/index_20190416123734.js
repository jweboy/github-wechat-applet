import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtToast, AtSearchBar } from 'taro-ui'
import request from '../../utils/request'

class SearchRepos extends Component {
  state = {
    repos: [],
    loading: false,
    keyword: '',
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

  handleSearchRepos = () => {
    console.warn('search')
  };

  handleSearchChange = (value) => {
    console.warn(value)
  };

  render() {
    const { repos, loading } = this.state;
    return (
      <View>
        <AtToast isOpened={loading} text='加载中...' icon='loading'></AtToast>
        <AtSearchBar
          onChange={this.handleSearchChange}
          onActionClick={this.handleSearchRepos}
        />
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

