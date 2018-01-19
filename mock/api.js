import { getUrlParams } from './utils';

const titles = [
  '空气日报',
  '霾情预报',
  '专家建议',
  '重污染应急',
  '城市经验',
  '未来五天预报',
  '波动榜',
  '健康提醒',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', // Webpack
];

const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '太原市1月16日AQI为130，空气质量等级为轻度污染',
  '【霾情提醒】高温笼罩下，华北局部有强对流天气',
  '生命就像一盒巧克力，结果往往出人意料',
  '主要以静稳天气为主，考虑本地源对太原市污染物',
  '28日晚，环境保护部发布重污染天气预警提示',
];

const user = [
  '大气110数据服务组',
  'AIR+霾情分析专家组',
  '千人计划专家',
  '环境保护部',
  '中国天气网',
];

export function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'http://daqi110.com',
      updatedAt: new Date(new Date().getTime() - (1000 * 60 * 60 * 2 * i)),
      createdAt: new Date(new Date().getTime() - (1000 * 60 * 60 * 2 * i)),
      subDescription: desc[i % 5],
      description: '太原市1月16日AQI为130，空气质量等级为轻度污染',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content: '太原市1月16日AQI为130，空气质量等级为轻度污染',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '大气110数据服务组',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: 'AIR+霾情分析专家组',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '千人计划专家',
        },
      ],
    });
  }

  return list;
}

export function getFakeList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  const count = (params.count * 1) || 20;

  const result = fakeList(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export const getNotice = [
  {
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: '太原市1月16日AQI为130，空气质量等级为轻度污染',
    updatedAt: new Date(),
    member: '大气110数据服务组',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: '【霾情提醒】高温笼罩下，华北局部有强对流天气',
    updatedAt: new Date('2017-07-24'),
    member: 'AIR+霾情分析专家组',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: '主要以静稳天气为主，考虑本地源对太原市污染物',
    updatedAt: new Date(),
    member: '千人计划专家',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: '28日晚，环境保护部发布重污染天气预警提示',
    updatedAt: new Date('2017-07-23'),
    member: '环境保护部',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: '“两会”告诉你，“通病”还需良药医，良药苦口利于病！',
    updatedAt: new Date('2017-07-23'),
    member: '2018两会',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: '太原市17日（今天）空气质量为良，天气为多云转晴，温度为1~-8℃，风向为西北风，风力为<3级转3-4级。18日（明天）空气质量为优，天气为多云，温度为3~-10℃，风向为西风，风力为<3级。19日（后天）空气质量为优，天气为晴转多云，温度为4~-10℃，风向为西风，风力为3-4级。20日（周六）空气质量为优，天气为晴转多云，温度为3~-8℃，风向为西风，风力为<3级。21日（周日）空气质量为优，天气为多云，温度',
    updatedAt: new Date('2017-07-23'),
    member: '中国天气网',
    href: '',
    memberLink: '',
  },
];

export const getActivities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: '大气110数据服务组',
      avatar: avatars2[0],
    },
    group: {
      name: '空气日报',
      link: '#',
    },
    project: {
      name: '2018年1月17日空气日报',
      link: '#',
    },
    template: '发布 @{group}  @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: 'AIR+霾情分析专家组',
      avatar: avatars2[1],
    },
    group: {
      name: '霾情预报',
      link: '#',
    },
    project: {
      name: '2018年1月17日霾情',
      link: '#',
    },
    template: '发布 @{group}  @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: '环境保护部',
      avatar: avatars2[2],
    },
    group: {
      name: '重污染应急',
      link: '#',
    },
    project: {
      name: '2018年1月17日应急',
      link: '#',
    },
    template: '发布 @{group}  @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: '2018两会',
      avatar: avatars2[4],
    },
    project: {
      name: '城市经验',
      link: '#',
    },
    template: '发布 @{project}',
  },
  {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: '中国天气网',
      avatar: avatars2[3],
    },
    project: {
      name: '未来五日天气预报',
      link: '#',
    },
    comment: {
      name: '2018年1月17日发布',
      link: '#',
    },
    template: '发布 @{project}  @{comment}',
  },
  {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: '千人计划专家',
      avatar: avatars2[5],
    },
    group: {
      name: '几秒前',
      link: '#',
    },
    project: {
      name: '空气建议',
      link: '#',
    },
    template: '在 @{group}  @{project}',
  },
];


export default {
  getNotice,
  getActivities,
  getFakeList,
};
