export function getArrByKey(arr, key) {
    let newarr = []
    if (arr && arr.length) {
        arr.map(item => newarr.push(item[key]))
    }
    return newarr
}
export function getArrOrLabel(arr, value, type) {
    if (type) {
        return arr
    } else {
        const findObj = arr.find(arr => arr.value === value)
        if (findObj) {
            return findObj.label
        }
        return ''
    }
}
export function getArrOrValue(arr, label, type) {
    if (type) {
        return arr
    } else {
        const findObj = arr.find(arr => arr.label === label)
        if (findObj) {
            return findObj.value
        }
        return ''
    }
}
export function getKeyByCategory(category) {
    let showKey = {}
    switch (category) {
        case 'shuiku':
            showKey = {
                position: '所在河流',
                nameKey: 'shuiku_name',
                valkey: 'heliu_name'
            }
            break
        case 'difang':
            showKey = {
                position: '所在河流',
                nameKey: 'difang_name',
                valkey: 'heliu_name'
            }
            break
        case 'yindiaoshui':
            showKey = {
                position: '',
                nameKey: 'yindiaoshui_name',
                valkey: ''
            }
            break
        case 'guanqu':
            showKey = {
                position: '',
                nameKey: 'gqname',
                valkey: ''
            }
            break
        case 'dibiaoshui':
            showKey = {
                position: '河湖（水库）名称',
                nameKey: 'shuiyuandi_name',
                valkey: 'hehu_name'
            }
            break
        case 'dixiashuishuiyuan':
            showKey = {
                position: '',
                nameKey: 'name',
                valkey: ''
            }
            break
        case 'nongcungongshui':
            showKey = {
                position: '',
                nameKey: 'pro_name',
                valkey: ''
            }
            break
        case 'shuidianzhan':
            showKey = {
                position: '所在河流',
                nameKey: 'shuidianzhan_name',
                valkey: 'heliu_name'
            }
            break
        case 'chuqinyangzhi':
            showKey = {
                position: '',
                nameKey: 'company_name',
                valkey: ''
            }
            break
        case 'gggsqy':
            showKey = {
                position: '',
                nameKey: 'dwmc',
                valkey: ''
            }
            break
        case 'gyqysj':
            showKey = {
                position: '',
                nameKey: 'dwname',
                valkey: ''
            }
            break
        case 'hehu':
            showKey = {
                position: '所在河流',
                nameKey: 'qushui_name',
                valkey: 'hu_name'
            }
            break
        case 'bengzhan':
            showKey = {
                position: '所在河流',
                nameKey: 'bengzhan_name',
                valkey: 'heliu_name'
            }
            break
        case 'zlhl':
            showKey = {
                position: '',
                nameKey: 'hdmc',
                valkey: ''
            }
            break
        case 'zlhp':
            showKey = {
                position: '所在河流',
                nameKey: 'hpname',
                valkey: 'szhlmc'
            }
            break
        case 'ruhehupaiwu':
            showKey = {
                position: '所在河流',
                nameKey: 'paiwu_name',
                valkey: 'shuiku_name'
            }
            break
        case 'shuizha':
            showKey = {
                position: '所在河流',
                nameKey: 'shuizha_name',
                valkey: 'heliu_name'
            }
            break
        default:
            showKey = {}
            break
    }
    return showKey
}
export function getCity(label, type) {
    let arr = [{
            label: '陕西省',
            value: 'shaanxisheng'
        },
        {
            label: '西安市',
            value: 'xianshi'
        },
        {
            label: '铜川市',
            value: 'tongchuanshi'
        },
        {
            label: '宝鸡市',
            value: 'baojishi'
        },
        {
            label: '咸阳市',
            value: 'xianyangshi'
        },
        {
            label: '渭南市',
            value: 'weinanshi'
        },
        {
            label: '延安市',
            value: 'yananshi'
        },
        {
            label: '汉中市',
            value: 'hanzhongshi'
        },
        {
            label: '榆林市',
            value: 'yulinshi'
        }, {
            label: '安康市',
            value: 'ankangshi'
        },
        {
            label: '商洛市',
            value: 'shangluoshi'
        }
    ]
    return getArrOrValue(arr, label, type)
}
export function getRealKey(key) {
    let trueKey = ''
    if (key.indexOf('_data') != -1) {
        trueKey = key.split('_data')[0]
    }
    return trueKey
}

export function getCategory(getNameOrKey, isArray) {
    let arr = [{
            label: '河流',
            value: 'heliu',
            disabled: true,
            icon: require('@/assets/category/river.png')
        },
        {
            label: '湖泊',
            value: 'hupo',
            disabled: true,
            icon: require('@/assets/category/hupo.png')
        },
        {
            label: '水库',
            value: 'shuiku',
            icon: require('@/assets/category/shuiku.png')
        },
        {
            label: '堤防',
            value: 'difang',
            icon: require('@/assets/category/dfgc.png')
        },
        {
            label: '引调水工程',
            value: 'yindiaoshui',
            icon: require('@/assets/category/ysdgc.png')
        },
        {
            label: '灌区',
            value: 'guanqu',
            icon: require('@/assets/category/gq.png')
        },
        {
            label: '地表水源地',
            value: 'dibiaoshui',
            icon: require('@/assets/category/dbsyd.png')
        },
        {
            label: '地下水源地',
            value: 'dixiashuishuiyuan',
            icon: require('@/assets/category/dxsyd.png')
        },
        {
            label: '农村供水',
            value: 'nongcungongshui',
            icon: require('@/assets/category/ncgsgc.png')
        },
        {
            label: '水电站',
            value: 'shuidianzhan',
            icon: require('@/assets/category/sdz.png')
        },
        {
            label: '规模化畜',
            value: 'chuqinyangzhi',
            icon: require('@/assets/category/gmhc.png')
        },
        {
            label: '公共供水企业',
            value: 'gggsqy',
            icon: require('@/assets/category/gggsqy.png')
        },
        {
            label: '工业企业',
            value: 'gyqysj',
            icon: require('@/assets/category/gyqy.png')
        },
        {
            label: '河湖取水口',
            value: 'hehu',
            icon: require('@/assets/category/hhqsk.png')
        },
        {
            label: '泵站',
            value: 'bengzhan',
            icon: require('@/assets/category/bz.png')
        },
        {
            label: '河流治理',
            value: 'zlhl',
            icon: require('@/assets/category/hlzl.png')
        },
        {
            label: '治理湖泊',
            value: 'zlhp',
            icon: require('@/assets/category/zlhp.png')
        },
        {
            label: '入河湖排污口',
            value: 'ruhehupaiwu',
            icon: require('@/assets/category/rhhpwk.png')
        },
        // {
        //   label: '机电井',
        //   value: 'gxjdjrlj',
        //   icon: require('@/assets/category/jdj.png')
        // },
        // {
        //   label: '人力井',
        //   value: 'gxjdjrlj',
        //   icon: require('@/assets/category/rlj.png')
        // },
        {
            label: '水闸',
            value: 'shuizha',
            icon: require('@/assets/category/sf.png')
        }
    ]
    if (isArray) {
        return arr
    }
    // 通过name查询key
    if (getNameOrKey.type = "label") {
        return getArrOrLabel(arr, getNameOrKey.value, '')
    } else if (getNameOrKey.type = "value") {
        return getArrOrValue(arr, getNameOrKey.value, '')

    }
}