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

const initVals = (_len) => {
  let _arr = [];
  for(let i = 0; i < _len; i++) {
    _arr.push(-1);
  }
  return _arr;
};

const range = (_len) => {
  let _arr = [];
  for(let i = 0; i < _len; i++) {
    _arr.push(i);
  }
  return _arr;
};

const createCol = (_pLen, _dLen) => {
  const plans = range(_pLen);
  let turns = _dLen / _pLen;
  let rest = _dLen % _pLen;
  let res = [];
  for(let i = 0; i < turns; i++) {
    res.concat(plans);
  }
  res.concat(range(rest));
  return res;
};

const createSubcol = () => {

};

module.exports = {

  /**
   * 生成计划表
   * @param _pLen 计划单元长度
   * @param _dLen 天数
   */
  createPlanList (_pLen, _dLen) {

    // 异常处理
    if(_dLen <= 0 || _pLen <= 0) {
      return null;
    }
    if (_dLen < _pLen) {
      _dLen = _pLen;
    }

    // 创建第一列计划序号数组
    const firstColPlan = createCol(_pLen, _dLen);

    // 初始化栏目数
    let cols = 9;
    let plans = [];
    plans.push(firstColPlan);

    // 根据天数确定栏目数
    for(let i = 1; i <= 8; i++) {
      if(COLS_DICT[i][0] < _dLen) {
        cols = COLS_DICT[i][1];
        break;
      }
    }

    return {
      cols: cols,
      plans: plans
    };
  }
};
