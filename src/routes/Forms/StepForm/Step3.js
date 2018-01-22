import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import Result from '../../../components/Result';
import styles from './style.less';

class Step3 extends React.PureComponent {
  render() {
    const { dispatch, data } = this.props;
    const onFinish = () => {
      dispatch(routerRedux.push('/form/step-form'));
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col span={8} className={styles.label}>事件名称：</Col>
          <Col span={16}>{data.payAccount}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>事件类型：</Col>
          <Col span={16}>{data.receiverAccount}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>网格员姓名：</Col>
          <Col span={16}>{data.receiverName}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>处理时间：</Col>
          <Col span={16}><span className={styles.money}>{data.amount}</span> </Col>
        </Row>
      </div>
    );
    const actions = (
      <div>
        <Button type="primary" onClick={onFinish}>
          再转一笔
        </Button>
        <Button>
          查看账单
        </Button>
      </div>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description="预计两小时内处理"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default connect(({ form }) => ({
  data: form.step,
}))(Step3);
