const basicGoods = [
  {
    id: '1234561',
    name: '迎泽区监测站',
    barcode: '马云',
    price: '监测站上报',
    num: '1',
    amount: '8h',
  },
  {
    id: '1234562',
    name: '迎泽区监测站',
    barcode: '马云',
    price: '监测站上报',
    num: '2',
    amount: '8h',
  },
  {
    id: '1234563',
    name: '迎泽区监测站',
    barcode: '马云',
    price: '监测站上报',
    num: '4',
    amount: '8h',
  },
  {
    id: '1234564',
    name: '迎泽区监测站',
    barcode: '马云',
    price: '监测站上报',
    num: '3',
    amount: '8h',
  },
];

const basicProgress = [
  {
    key: '1',
    time: '1234561',
    rate: '领导审批',
    status: '未认领',
    operator: '马云',
    cost: '5mins',
  },
  {
    key: '2',
    time: '1234561',
    rate: '领导审批',
    status: '已认领',
    operator: '马云',
    cost: '1h',
  },
  {
    key: '3',
    time: '1234561',
    rate: '领导审批',
    status: '已认领',
    operator: '马云',
    cost: '5mins',
  },
  {
    key: '4',
    time: '1234561',
    rate: '领导审批',
    status: '已认领',
    operator: '马云',
    cost: '1h',
  },
  {
    key: '5',
    time: '1234561',
    rate: '领导审批',
    status: '已认领',
    operator: '马云',
    cost: '5mins',
  },
];

const advancedOperation1 = [
  {
    key: 'op1',
    type: '234231029431',
    name: '马云',
    status: '进行中',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: '234231029431',
    name: '马化腾',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: '进行中',
  },
  {
    key: 'op3',
    type: '234231029431',
    name: '马三立',
    status: '进行中',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: '234231029431',
    name: '马云',
    status: '进行中',
    updatedAt: '2017-10-03  19:23:12',
    memo: '很棒',
  },
  {
    key: 'op5',
    type: '234231029431',
    name: '马化腾',
    status: '进行中',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: '234231029431',
    name: '马东',
    status: '进行中',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: '234231029431',
    name: '王建国',
    status: '进行中',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

export const getProfileBasicData = {
  basicGoods,
  basicProgress,
};

export const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3,
};

export default {
  getProfileBasicData,
  getProfileAdvancedData,
};
