const Router = (reg, str, cb) => {
    const regexp = new RegExp(reg, 'gi');
    const regexpResult = regexp.exec(str);

    if (regexpResult !== null) {
        if (cb === void 0) {

            return regexpResult;
        }

        regexpResult.shift();
        return cb(...regexpResult);
    }
};

const LastCall = (what) => {
    return what;
};

// examples
// console.log(Router('dernier départ vers (.*)', 'pourriez vous me donner le dernier départ pour bussy saint-georges', LastCall));
// console.log('true 2', Router('dernier depart', 'pourriez vous me donner le dernier depart, svp'));
// console.log('false', Router('pourriez vous me donner le premier départ, svp'));

export default Router;
