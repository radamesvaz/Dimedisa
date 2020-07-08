(() => {
    var __assign = (this && this.__assign) || Object.assign || function (t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        }
    ;

    function getResolvedSettings(settingsObj) {
        var globalVariablesPath = 'globalVariables';
        var copy = _.cloneDeep(settingsObj);
        var getPath = function (path, key) {
            return "" + path + (typeof key === 'number' ? '[' + key + ']' : (path ? '.' : '') + key);
        };
        var getVal = function (obj, path) {
            return _.get(obj, path) || copy;
        };

        function DFS(obj, path) {
            if (_.isPlainObject(obj)) {
                _.forEach(obj, function (val, key) {
                    if (key === '$value') {
                        var pathToVal = globalVariablesPath + "." + val;
                        _.set(copy, path, DFS(_.get(copy, pathToVal), pathToVal));
                    }
                    if (key === '$concat') {
                        var concatedVal = _.join(_.map(val, function (concatVal, concatKey) {
                            return DFS(concatVal, getPath(getPath(path, key), concatKey));
                        }), '');
                        _.set(copy, path, concatedVal);
                    }
                    if (key === '$merge') {
                        var left = val[0]
                            , right = val[1];
                        var pathToMergeObj = globalVariablesPath + "." + left;
                        _.set(copy, path, __assign({}, DFS(_.get(copy, pathToMergeObj), pathToMergeObj), DFS(right, getPath(getPath(path, key), 1))));
                    }
                    DFS(val, getPath(path, key));
                });
                return getVal(copy, path);
            } else if (_.isArray(obj)) {
                return _.map(obj, function (val, key) {
                    return DFS(val, getPath(path, key));
                });
            } else {
                return obj;
            }
        }

        return DFS(copy, '');
    }

    window['getResolvedSettings'] = getResolvedSettings;
})();

var themingOptions;
try {
    themingOptions = window.getResolvedSettings(require('./theme-options'));
} catch (err) {
}
if (themingOptions) {
    const extraCSSArr = themingOptions.extraCSS;
    extraCSSArr.forEach(function (extraCss) {
        var val = extraCss.value;
        $('head').append('<style type="text/css">' + val + '</style>');
    })
}