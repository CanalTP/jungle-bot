const router = (reg, str, cb) => {
  const regexp = new RegExp(reg, 'gi');
  const regexpResult = regexp.exec(str);

  if (regexpResult !== null) {
    if (cb === void 0) {
      
      return regexpResult;
    }

    return cb(regexpResult[1]);
  }
}

const LastCall = (what) => {
  return what;
};

console.log(router('dernier départ pour (.*)', 'pourriez vous me donner le dernier départ pour bussy saint-georges', LastCall));
// console.log('true 2', router('dernier depart', 'pourriez vous me donner le dernier depart, svp'));
// console.log('false', router('pourriez vous me donner le premier départ, svp'));
