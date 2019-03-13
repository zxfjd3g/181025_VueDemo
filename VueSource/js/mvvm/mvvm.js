/*
相当于Vue的构造函数
options: 配置对象
 */
function MVVM(options) {
  // 将配置对象保存到vm上
  this.$options = options;
  // 将data对象保存到vm和变量data上
  var data = this._data = this.$options.data;
  // 保存vm到变量me
  var me = this;

  // 遍历data中所有属性
  Object.keys(data).forEach(function (key) { // 属性名: name
    // 对指定属性实现数据代理
    me._proxy(key);
  });

  // 对data中所有层次属性实现劫持/监视
  observe(data, this);

  // 创建用于编译/解析模板的compile对象
  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    // 保存vm
    var me = this;
    // 给vm添加属性(与data中的属性一一对应的)
    Object.defineProperty(me, key, {
      configurable: false, // 不让更新定义
      enumerable: true, // 可以枚举遍历
      // 当通过vm.xxx读取属性值时自动调用
      get: function proxyGetter() {
        // 读取data对应的属性值
        return me._data[key];
      },
      // 当通过vm.xxx = value更新属性值自动调用
      set: function proxySetter(newVal) {
        // 将最新的值保存到data对象对应的属性上
        me._data[key] = newVal;
      }
    });
  }
};