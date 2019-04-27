import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtList, AtListItem, AtCard, AtToast } from 'taro-ui'
import qs from 'query-string'
import Towxml from 'towxml'

import dayjs from '../../utils/day'
import { base64_decode } from '../../utils/base64'
import request from '../../utils/request'
import './index.scss'

const towxml = new Towxml()

class RepoDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        size: 0,
        license: {},
        loading: false,
        owner: {},
        readme: null,
      },
    }

    const { params } = this.$router
    this.query = {
      ownerName: params.ownerName || 'reduxjs',
      repoName: params.repoName || 'redux',
    }
  }
  componentDidMount() {
    this.getPageData()
    this.asyncGetRepoMarkdown()
  }

  getPageData = () => {
    this.setState({
      loading: true,
    }, () => {
      this.asyncGetRepoDetail().then((data) => {
        this.setState({
          loading: false,
          data: {
            ...data,
            updated_at: dayjs(data.updated_at).fromNow(),
            // owner: this.query.ownerName,
          }
        })
      })
    })
  }

  asyncGetRepoDetail = () => {
    return request(`/repos/${this.query.ownerName}/${this.query.repoName}`)
  }

  asyncGetRepoMarkdown = () => {
    return request('/repos/jweboy/jweboy-cli/readme').then((res) => {
      const readme = base64_decode(res.content)
       const data = towxml.toJson(readme, 'html')
       this.setState({
         readme: data,
       })
        console.warn(res,data, readme)
    })
  }

  handleJumpPage = (url) => {
    Taro.navigateTo({ url: `${url}?${qs.stringify(this.query)}` });
  };

  render() {
    const { data, loading, readme } = this.state
    return (
      <View>
        <AtToast isOpened={loading} status='loading' text='加载中...' />
        {/* header */}
        <View className='header'>
          {/* avatar description */}
          <View className='at-row info'>
            <View className='at-col at-col-2 at-col--wrap'>
              <AtAvatar circle image={data.owner.avatar_url} />
            </View>
            <View className='at-col at-col-10  at-col--wrap'>
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
              <Text>{data.stargazers_count}</Text>
              <Text>Stars</Text>
            </View>
            <View className='at-col row'>
              <Text>{data.forks_count}</Text>
              <Text>Forks</Text>
            </View>
          </View>
        </View>

        {/* content */}
        <View className='content'>
          <AtCard className='card' title='Basic'>
            <AtList hasBorder={false}>
              <AtListItem
                title={data.language || '-'}
                extraText={`size:${data.size}`}
                hasBorder={false}
              />
              <AtListItem
                title='Branch'
                extraText={data.default_branch}
                hasBorder={false}
              />
              <AtListItem
                title='License'
                extraText={data.license.name || '-'}
                hasBorder={false}
              />
            </AtList>
          </AtCard>
          <AtCard className='card'  title='About'>
            <AtList hasBorder={false}>
              {/* <AtListItem
                title='Collaborators'
                arrow='right'
                hasBorder={false}
                onClick={() => this.handleJumpPage('/pages/repo-collaborators/index')}
              /> */}
              <AtListItem
                title='Events'
                arrow='right'
                hasBorder={false}
                onClick={() => this.handleJumpPage('/pages/repo-events/index')}
              />
            </AtList>
          </AtCard>
          {/* Readme */}
          {/* <template md='https://api.github.com/repos/jweboy/jweboy-cli/contents/README.md?ref=master' /> */}
           {/* {
              <AtCard className='card' title='README.md'>
              <import src='./towxml/entry.wxml' />
              <template is='entry' data='{{...readme}}' />
            </AtCard>
          } */}
        </View>

      </View>
    )
  }
}

export default RepoDetail
