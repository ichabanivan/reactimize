/**
 * @name createConst
 * @param {String} type
 * @return {Object}
 */
const createConst = type => ({
  START: `${type}.START`,
  FINISH: `${type}.FINISH`,
  ERROR: `${type}.ERROR`,
  CLEAR: `${type}.CLEAR`,
  REDUCER: `${type}.REDUCER`,
});

export default createConst;
