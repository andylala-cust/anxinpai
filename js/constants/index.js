export const PAGE_SIZE = 10;
export const TYPE_ID = 0;
export const PULL_DOWN_REFRESH_DURATION = 1500; // 下拉刷新
export const DEFAULT_HOUSE_TYPE = 0;  // 不限
export const COMMON_HOUSE_TYPE = 1; // 住宅
export const BUSINESS_HOUSE_TYPE = 2; // 商业
export const INDUSTRY_HOUSE_TYPE = 3; // 工业
export const OTHER_HOUSE_TYPE = 4; // 其他
export const SORT_TIME_TYPE = 1; // 最新发布
export const SORT_BID_TIME_TYPE_ASC = 1; // 拍卖时间从近到远
export const SORT_BID_TIME_TIME_DESC = 2; // 拍卖时间从远到近
export const SORT_PRICE_TYPE_DESC = 1; // 价格从高到低
export const SORT_PRICE_TYPE_ASC = 2; // 价格从低到高
export const SORT_CUT_TYPE_ASC = 1; // 折扣力度从大到小
export const SORT_CUT_TYPE_DESC = 2; // 折扣力度从小到大
export const AREA_ARR = [
  {
    area_min: 0,
    area_max: 50,
    title: '50以下'
  },
  {
    area_min: 50,
    area_max: 90,
    title: '50-90'
  },
  {
    area_min: 90,
    area_max: 130,
    title: '90-130'
  },
  {
    area_min: 130,
    area_max: 1000000,
    title: '130以上'
  }
];
export const RESET_ARR = [
  {
    reset_type: 0,
    title: '被占用'
  },
  {
    reset_type: 1,
    title: '已清空'
  },
  {
    reset_type: -1,
    title: '不清楚'
  }
];
export const RENT_ARR = [
  {
    rent_type: 0,
    title: '无出租'
  },
  {
    rent_type: 1,
    title: '已出租'
  },
  {
    rent_type: -1,
    title: '不清楚'
  }
];
export const TAX_ARR = [
  {
    title: '买受人',
    tax_type: '买受人承担'
  },
  {
    title: '被执行人',
    tax_type: '被执行人承担'
  },
  {
    title: '各自承担',
    tax_type: '各自承担'
  },
  {
    title: '不清楚',
    tax_type: '--'
  }
];
export const CIRC_ARR = [
  {
    title: '一拍',
    circ_type: 1
  },
  {
    title: '二拍',
    circ_type: 2
  },
  {
    title: '三拍',
    circ_type: 3
  },
  {
    title: '变卖',
    circ_type: 4
  }
];
export const IMG_PLACE_COLOR = '#efefef';
export const DELAY_LOAD_TIME = 1000;
export const REGISTER_CODE = 0; // 注册
export const CHANGE_PWD = 1; // 修改密码
export const DEFAULT_USER_AVATAR = 'http://static.yfbudong.com/%E6%9C%8D%E5%8A%A1%E5%A4%B4%E5%83%8F.jpg';
