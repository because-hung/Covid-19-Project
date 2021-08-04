module.exports = {
"tabWidth": 2,

    // 使用tab縮排，預設false

    "useTabs": false,

    // 使用分號, 預設true

    "semi": false,

    // 使用單引號, 預設false(在jsx中配置無效, 預設都是雙引號)

    "singleQuote": false,

    // 行尾逗號,預設none,可選 none|es5|all

    // es5 包括es5中的陣列、物件

    // all 包括函式物件等所有可選

    "TrailingCooma": "all",

    // 物件中的空格 預設true

    // true: { foo: bar }

    // false: {foo: bar}

    "bracketSpacing": true,

    // JSX標籤閉合位置 預設false

    // false: <div

    //          className=""

    //          style={{}}

    //       >

    // true: <div

    //          className=""

    //          style={{}} >

    "jsxBracketSameLine": false,

    // 箭頭函式引數括號 預設avoid 可選 avoid| always

    // avoid 能省略括號的時候就省略 例如x => x

    // always 總是有括號

    "arrowParens": "avoid"
}