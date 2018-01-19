import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './BasicProfile.less';

const { Description } = DescriptionList;

const progressColumns = [{
  title: '任务单号',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '当前进度',
  dataIndex: 'rate',
  key: 'rate',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: text => (
    text === 'success' ? <Badge status="success" text="成功" /> : <Badge status="processing" text="进行中" />
  ),
}, {
  title: '网格员ID',
  dataIndex: 'operator',
  key: 'operator',
}, {
  title: '耗时',
  dataIndex: 'cost',
  key: 'cost',
}];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
export default class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile, loading } = this.props;
    const { basicGoods, basicProgress } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach((item) => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '今日总派单',
        num,
        // amount,
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [{
      title: '任务单号',
      dataIndex: 'id',
      key: 'id',
      render: (text, row, index) => {
        if (index < basicGoods.length) {
          return <a href="">{text}</a>;
        }
        return {
          children: <span style={{ fontWeight: 600 }}>总计</span>,
          props: {
            colSpan: 4,
          },
        };
      },
    }, {
      title: '站点',
      dataIndex: 'name',
      key: 'name',
      render: renderContent,
    }, {
      title: '网格员',
      dataIndex: 'barcode',
      key: 'barcode',
      render: renderContent,
    }, {
      title: '任务来源',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: renderContent,
    }, {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
      align: 'right',
      render: (text, row, index) => {
        if (index < basicGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    }, {
      title: '剩余时间',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (text, row, index) => {
        if (index < basicGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    }];
    return (
      <PageHeaderLayout title="基础详情页">
        <Card bordered={false}>
          <DescriptionList size="large" title="巡检任务" style={{ marginBottom: 32 }}>
            <Description term="任务单号">1000000000</Description>
            <Description term="状态">已认领</Description>
            <Description term="网格员">马化腾</Description>
            <Description term="任务描述">小店区站点PM2.5没有超标</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="任务指派信息" style={{ marginBottom: 32 }}>
            <Description term="服务经理">刘泽阳</Description>
            <Description term="联系电话">18100000000</Description>
            <Description term="企业邮箱">66666@110mail.com</Description>
            <Description term="任务来源">监测站上报</Description>
            <Description term="任务描述">无</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>任务指派列表</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>巡检任务列表</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
