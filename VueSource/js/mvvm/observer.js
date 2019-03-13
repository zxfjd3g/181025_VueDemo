function Observer(data) {
  // 保存数据对象
  this.data = data;
  // 启动
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    var me = this;
    //  遍历data中所有属性(最外层)
    Object.keys(data).forEach(function (key) {
      // 将data中的属性重新定义成响应式的属性(有数据绑定, 有对应的setter)
      me.defineReactive(data, key, data[key])
    });
  },

  defineReactive: function (data, key, val) {
    // 创建对应的dep对象
    var dep = new Dep();
    // 通过递归调用, 实现所有层次属性的监视/劫持
    var childObj = observe(val);

    // 给data重新定义属性 ==> 为了添加监视
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      // 返回属性值, 建立dep与watcher的关系 (添加订阅者watcher)
      get: function () {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      // 当data中的属性值改变了, 自动调用, 更新所有需要更新的节点/界面
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        // 保存新的值
        val = newVal;
        // 监视新值中的属性数据
        childObj = observe(newVal);
        // 通知订阅者(watcher)
        dep.notify();
      }
    });
  }
};

function observe(value, vm) {
  // value必须是对象
  if (!value || typeof value !== 'object') {
    return;
  }
  // 为这个对象创建一个对应的Observer
  return new Observer(value);
};


var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    // 通知所相关订阅者(watcher)
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};

Dep.target = null;