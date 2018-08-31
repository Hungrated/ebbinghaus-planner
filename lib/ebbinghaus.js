const COLS_DICT = [
  [1, 1],
  [2, 2],
  [3, 3],
  [5, 4],
  [8, 5],
  [16, 6],
  [31, 7],
  [91, 8],
  [181, 9]
];

/**
 * 返回初始化数组，所有元素是-1
 * @param _len
 */
const initVals = (_len) => {
  let _arr = [];
  for (let i = 0; i < _len; i++) {
    _arr.push(-1);
  }
  return _arr;
};

/**
 * 返回递增数组
 * @param _len 数组长度
 * @returns {Array}
 */
const range = (_len) => {
  let _arr = [];
  for (let i = 0; i < _len; i++) {
    _arr.push(i);
  }
  return _arr;
};

/**
 * 创建主计划序号列表
 * @param _pLen 计划单元数
 * @param _dLen 天数
 * @returns {Array}
 */
const createCol = (_pLen, _dLen) => {
  const plans = range(_pLen);
  let turns = parseInt(_dLen / _pLen);
  let rest = _dLen % _pLen;
  let resArr = [];
  for (let i = 0; i < turns; i++) {
    resArr = resArr.concat(plans);
  }
  resArr = resArr.concat(range(rest));
  return resArr;
};

/**
 * 创建副计划序号列表
 * @param _arr 主计划列表
 * @param _offset 时间偏移
 */
const createSubCol = (_arr, _offset) => {
  const _len = _arr.length;
  return initVals(_offset - 1).concat(_arr).slice(0, _len);
};

module.exports = {

  /**
   * 生成计划序号对应表
   * @param _pLen 计划单元长度
   * @param _dLen 天数
   */
  createPlanList (_pLen, _dLen) {

    // 异常处理
    if (_dLen <= 0 || _pLen <= 0) {
      return null;
    }
    if (_dLen < _pLen) {
      _dLen = _pLen;
    }

    // 创建主计划序号列表
    const primaryPlanCol = createCol(_pLen, _dLen);

    // 初始化栏目数及总计划列表
    let cols = 9;
    let plans = [];

    // 根据天数确定栏目数
    for (let i = 1; i <= 8; i++) {
      plans.push(createSubCol(primaryPlanCol, COLS_DICT[i-1][0]));
      if (COLS_DICT[i][0] > _dLen) {
        cols = COLS_DICT[i - 1][1];
        break;
      }
    }

    return {
      cols: cols,
      plans: plans
    };
  }
};
