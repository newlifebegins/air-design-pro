import React, { Component } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip, Divider } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './AdvancedProfile.less';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const action = (
  <div>
    <ButtonGroup>
      <Button>操作</Button>
      <Button>操作</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button><Icon type="ellipsis" /></Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">主操作</Button>
  </div>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>现场执法</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>剩余时间</div>
      <div className={styles.heading}>8h</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="服务经理">刘泽阳</Description>
    <Description term="任务类型">污染源执法</Description>
    <Description term="创建时间">2018-01-17</Description>
    <Description term="网格员">王格言</Description>
    <Description term="生效日期">2018-01-17 ~ 2018-08-08</Description>
    <Description term="备注">请于两个工作日内确认</Description>
  </DescriptionList>
);

const tabList = [{
  key: 'detail',
  tab: '详情',
}, {
  key: 'rule',
  tab: '规则',
}];

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <div>
      刘泽阳
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <div>
      刘泽斌
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div><a href="">催一下</a></div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>耗时：2小时25分钟</div>
  </div>
);

const customDot = (dot, { status }) => (status === 'process' ? (
  <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
    {dot}
  </Popover>
) : dot);

const operationTabList = [{
  key: 'tab1',
  tab: '进行中',
}, {
  key: 'tab2',
  tab: '已完成',
}, {
  key: 'tab3',
  tab: '未完成',
}];

const columns = [{
  title: '任务单号',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '执行人',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '执行结果',
  dataIndex: 'status',
  key: 'status',
  render: text => (
    text === 'agree' ? <Badge status="success" text="成功" /> : <Badge status="error" text="驳回" />
  ),
}, {
  title: '结束时间',
  dataIndex: 'updatedAt',
  key: 'updatedAt',
}, {
  title: '备注',
  dataIndex: 'memo',
  key: 'memo',
}];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
export default class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchAdvanced',
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = (key) => {
    this.setState({ operationkey: key });
  }

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const { stepDirection } = this.state;
    const { profile, loading } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = profile;
    const contentList = {
      tab1: <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation1}
        columns={columns}
      />,
      tab2: <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation2}
        columns={columns}
      />,
      tab3: <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation3}
        columns={columns}
      />,
    };

    return (
      <PageHeaderLayout
        title="任务单号：234231029431"
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        action={action}
        content={description}
        extraContent={extra}
        tabList={tabList}
      >
        <Card title="任务进度" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction={stepDirection} progressDot={customDot} current={1}>
            <Step title="创建任务" description={desc1} />
            <Step title="领导审批" description={desc2} />
            <Step title="现场执法" />
            <Step title="完成" />
          </Steps>
        </Card>
        <Card title="污染源信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="所属片区">小店区</Description>
            <Description term="所属环保局">小店区环保局</Description>
            <Description term="直属领导">环保局长</Description>
            <Description term="联系方式">18112345678</Description>
            <Description term="联系地址">山西省太原市小店区</Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 24 }} title="监测站">
            <Description term="学府街监测站">AQI 65</Description>
            <Description term="该数据更新时间">2018-01-18</Description>
            <Description>&nbsp;</Description>
            <Description term={
              <span>
                佳华街监测站
                <Tooltip title="数据说明">
                  <Icon style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }} type="info-circle-o" />
                </Tooltip>
              </span>
              }
            >
              AQI 72
            </Description>
            <Description term="该数据更新时间">2018-01-18</Description>
          </DescriptionList>
          <h4 style={{ marginBottom: 16 }}>当前任务信息</h4>
          <Card type="inner" title="任务单号：234231029431">
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="创建任务">
              <Description term="服务经理">刘泽阳</Description>
              <Description term="任务类型">污染源执法</Description>
              <Description term="创建时间">2018-01-17</Description>
              <Description term="过期时间">2017-08-08</Description>
              <Description term="备注">请于两个工作日内确认</Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="领导审批">
              <Description term="服务经理">刘泽阳</Description>
              <Description term="任务类型">污染源执法</Description>
              <Description term="创建时间"> 2018-01-17</Description>
              <Description term="过期时间">2018-08-08</Description>
              <Description term="备注">请于两个工作日内确认</Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="现场执法">
              <Description term="服务经理">刘泽阳</Description>
              <Description term="任务类型">污染源执法</Description>
              <Description term="创建时间"> 2018-01-17</Description>
              <Description term="过期时间">2018-08-08</Description>
              <Description term="备注">请于两个工作日内确认</Description>
            </DescriptionList>
          </Card>
        </Card>
        <Card title="小店区近半年巡检任务记录" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />暂无数据
          </div>
        </Card>
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[this.state.operationkey]}
        </Card>
      </PageHeaderLayout>
    );
  }
}
