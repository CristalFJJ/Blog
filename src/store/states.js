export const Common = {

};

export var glob = {
  cityOptions: cityOptionsWrap
};
//角色管理的数据（新增修改部分）
export const cityOptionsWrap = [{
  name: '地图管控',
  paeShow: true,
  roleType: [
    [{
        name: '车辆监管',
        checked: false,
        state: 50,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '指令群发',
        checked: false,
        state: 72,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
  ],
  checked: false,
  OptionsLen: 2,
}, {
  name: '报警管理',
  paeShow: true,
  roleType: [
    [{
        name: '报警处理',
        checked: false,
        state: 31,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '报警统计',
        checked: false,
        state: 32,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '多媒体查询',
        checked: false,
        state: 76,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '设备故障分析',
        checked: false,
        state: 83,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '危险路段分析',
        checked: false,
        state: 77,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '驾驶行为分析',
        checked: false,
        state: 78,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '危险等级报警',
        checked: false,
        state: 79,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
  ],
  OptionsLen: 8,
  checked: false,

}, {
  name: '运营分析',
  paeShow: true,
  roleType: [
    [{
        name: '离线统计',
        checked: false,
        state: 46,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '车辆统计',
        checked: false,
        state: 38,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '刷卡记录',
        checked: false,
        state: 43,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '不良驾驶统计',
        checked: false,
        state: 67,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '车辆评分对比',
        checked: false,
        state: 73,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '驾驶员评分对比',
        checked: false,
        state: 74,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '驾驶评分设置',
        checked: false,
        state: 63,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '车速统计',
        checked: false,
        state: 39,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '里程统计',
        checked: false,
        state: 37,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '停车统计',
        checked: false,
        state: 35,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '超速记录',
        checked: false,
        state: 49,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '行车记录',
        checked: false,
        state: 40,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
  ],
  checked: false,
  OptionsLen: 13,
}, {
  name: '管理设置',
  checked: false,
  paeShow: true,
  roleType: [
    [{
        name: '账号管理',
        checked: false,
        state: 11,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: true
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: true
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '角色管理',
        checked: false,
        state: 12,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: true
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: true
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '公司管理',
        checked: false,
        state: 13,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: true
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: true
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '车辆管理',
        checked: false,
        state: 14,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: true
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: true
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '车主管理',
        checked: false,
        state: 16,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: true
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: true
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '驾驶员管理',
        checked: false,
        state: 17,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: true
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: true
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '终端厂管理',
        checked: false,
        state: 18,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: true
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: true
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '疲劳机管理',
        checked: false,
        state: 91,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: true
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: true
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '报警设置',
        checked: false,
        state: 71,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '报警策略',
        checked: false,
        state: 15,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: true
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: true
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '密码设置',
        checked: false,
        state: 81,
        ifShow: true
      },
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '公告管理',
        checked: false,
        state: 11,
        ifShow: true
      }, //代号暂时未知
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: true
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: true
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '危险等级报警设置',
        checked: false,
        state: 80,
        ifShow: true
      }, //代号暂时未知
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
    [{
        name: '始发站管理',
        checked: false,
        state: 84,
        ifShow: true
      }, //代号暂时未知
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: true
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: true
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: true
      }
    ],
    [{
        name: '分路段限速',
        checked: false,
        state: 75,
        ifShow: true
      }, //代号暂时未知
      {
        name: '增加',
        checked: false,
        state: 1,
        ifShow: false
      },
      {
        name: '删除',
        checked: false,
        state: 2,
        ifShow: false
      },
      {
        name: '修改',
        checked: false,
        state: 3,
        ifShow: false
      }
    ],
  ],
  OptionsLen: 49,
}, ];
