/*
 * @Date: 2022-11-02 14:49:31
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-08 09:33:21
 */



//-------可以通过Arrary.prototype.fn将自定义方法挂载到顶层原型上-------

// 本页定义->>数组<<-相关封装方法

// 数组指定元素个数排列组合//-----有问题???????????

// const getConsecutiveArrays = (arr, size) => (size > arr.length ? [] : arr.slice(size - 1).map((_, i) => arr.slice(i, size + i)));
// getConsecutiveArrays([1, 2, 3, 4, 5], 2); // [[1, 2], [2, 3], [3, 4], [4, 5]]

// 数组置空
const emptyArr = (arr) => (arr.length = 0)

// 数组元素不重复全排列组合

const getSubsets = (arr) => arr.reduce((prev, curr) => prev.concat(prev.map((k) => k.concat(curr))), [[]])


// 数组出现元素次数统计
// countOccurrences(['a', 'b', 'a', 'c', 'a', 'b']); // { 'a': 3, 'b': 2, 'c': 1 }
const countOccurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {})

// 纯数字数组 统计总和
// sum([4,6,4,3,9])  // 26
const arrSum = (arr) => arr.reduce((a, b) => a + b, 0)
// 纯数字数组 统计平均数
const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

// 数组最小值  Math.min(...array)

//获取数组内所有指定倍数项的value,返回新数组
// getNthItems([1, 2, 3, 4, 5, 6, 7, 8, 9], 3); // [3, 6, 9]
const getNthItems = (arr, nth) => arr.filter((_, i) => i % nth === nth - 1);

//获取多个数组的公共项(同时存在的value)
// getIntersection([1, 2, 3], [2, 3, 4, 5], [1, 3, 5]); // [3]
const getIntersection = (a, ...arr) => [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));

//获取数组内唯一项,也就是去重
const unique = (arr) => [...new Set(arr)];
const unique2 = (arr) => arr.filter((el, i, array) => array.indexOf(el) === i);

//合并多个数组,并且去重
const union = (...arr) => [...new Set(arr.flat())]

//合并2个数组,但不去重
const merge = (a, b) => a.concat(b);
const merge2 = (a, b) => [...a, ...b];

//以指定长度切分数组
const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), [])

// 移除重复项,包括重复项本身,只保留不重复的项
const removeDuplicate = (arr) => arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));

//以指定字符串分隔数组
// intersperse(['你', '我', '他'], '--'); // ['你', '--', '我', '--', '他']
const intersperse = (a, s) => [...Array(2 * a.length - 1)].map((_, i) => (i % 2 ? s : a[i / 2]));

//数组指定下标项互换value
const swapItems = (a, i, j) => (a[i] && a[j] && [...a.slice(0, i), a[j], ...a.slice(i + 1, j), a[i], ...a.slice(j + 1)]) || a;



// /检查数组是否包含匹配某些条件的值
const contains = (arr, criteria) => arr.some((v) => criteria(v));
const contains2 = (arr, criteria) => arr.some(criteria);
const contains3 = (arr, criteria) => arr.filter(criteria).length > 0





//数组内对象按指定键的值重新排序

// sortBy([
//     { name: 'Foo', age: 42 },
//     { name: 'Bar', age: 24 },
//     { name: 'Fuzz', age: 36 },
//     { name: 'Baz', age: 32 },
// ], 'age');

//  [
//      { name: 'Bar', age: 24 },
//      { name: 'Baz', age: 32 },
//      { name: 'Fuzz', age: 36 },
//      { name: 'Foo', age: 42 },
//  ]
const sortBy = (arr, k) => arr.concat().sort((a, b) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0));


//提取数组内对象的指定键key返回对应的value生成新数组
//参数为数组....指定属性键...
const getAttrs = (array,attr) =>  array.map((item)=> item[attr])


//暂时想不到应用场景,以指定key返回相同value的集合
// groupBy( [
// { branch: 'audi', model: 'q8', year: '2019' },
// { branch: 'audi', model: 'rs7', year: '2020' },
// { branch: 'ford', model: 'mustang', year: '2019' },
// { branch: 'ford', model: 'explorer', year: '2020' },
// { branch: 'bmw', model: 'x7', year: '2020' }],'branch')

/*
{
    audi: [
        { branch: 'audi', model: 'q8', year: '2019' },
        { branch: 'audi', model: 'rs7', year: '2020' }
    ],
    bmw: [
        { branch: 'bmw', model: 'x7', year: '2020' }
    ],
    ford: [
        { branch: 'ford', model: 'mustang', year: '2019' },
        { branch: 'ford', model: 'explorer', year: '2020' }
    ],
}
*/
const groupBy = (arr, key) => arr.reduce((acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc), {});


// 简单数组按指定个数组合
const choose = (arr, size) =>  {
    let allResult = [];
    (function aa(arr, size, result) {
        let arrLen = arr.length;
        if (size > arrLen) {return}
        if (size == arrLen) {
            allResult.push([].concat(result, arr))
        } else {
            for (const i = 0; i < arrLen; i++) {
                let newResult = [].concat(result);
                newResult.push(arr[i]);
                if (size == 1) {
                    allResult.push(newResult);
                } else {
                    let newArr = [].concat(arr);
                    newArr.splice(0, i + 1);
                    aa(newArr, size - 1, newResult);
                }
            }
        }
    })(arr, size, []);

    return allResult;
}