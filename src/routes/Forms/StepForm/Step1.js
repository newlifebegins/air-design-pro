import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          dispatch(routerRedux.push('/form/step-form/confirm'));
        }
      });
    };
    return (
      <div>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item
            {...formItemLayout}
            label="事件名称"
          >
            {getFieldDecorator('payAccount', {
              initialValue: data.payAccount,
              rules: [{ required: true, message: '请选择事件' }],
            })(
              <Select placeholder="请选择事件">
                <Option value="ant-design@alipay.com">污染源监测报表</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="事件描述"
          >
            <Input.Group compact>
              <Select defaultValue="alipay" style={{ width: 100 }}>
                <Option value="alipay">一般事件</Option>
                <Option value="bank">紧急事件</Option>
              </Select>
              {getFieldDecorator('receiverAccount', {
                initialValue: data.receiverAccount,
                rules: [
                  { required: true, message: '请选择事件类型' },
                ],
              })(
                <Input style={{ width: 'calc(100% - 100px)' }} placeholder="小店区昌盛街" />
              )}
            </Input.Group>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="指派人姓名"
          >
            {getFieldDecorator('receiverName', {
              initialValue: data.receiverName,
              rules: [{ required: false, message: '请输入姓名' }],
            })(
              <Input placeholder="请输入姓名" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="处理时间"
          >
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                { required: true, message: '请输入时间' },
                { pattern: '', message: '请输入合法时间' },
              ],
            })(
              <Input prefix="" placeholder="请输入时间" />
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>指派给网格员说明</h4>
          <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
          <h4>指派给网格员说明</h4>
          <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
        </div>
      </div>
    );
  }
}

export default connect(({ form }) => ({
  data: form.step,
}))(Step1);
