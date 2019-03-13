function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.depIds = {};
  // 得到表达式对应的属性值
  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    // 得到表达式最新值
    var value = this.get();
    // 得到老值
    var oldVal = this.value;
    // 如果值发生了改变
    if (value !== oldVal) {
      // 保存新的值
      this.value = value;
      // 调用更新节点的回调函数
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // 如果关系还没有建立
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 将watcher添加到dep中, 建立dep到watcher的关系
      dep.addSub(this);
      // 将dep添加到watcher中, 建立watcher到dep的关系
      this.depIds[dep.id] = dep;
    }
  },
  get: function () {
    // 让Dep知道有watcher了
    Dep.target = this;
    // 导致表达式所有对应的属性的getter调用
    var value = this.getVMVal();
    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    var exp = this.exp.split('.');
    var val = this.vm._data;
    exp.forEach(function (k) {
      val = val[k]; // 读取data中某个属性的属性值, 会导致getter调用
    });
    return val;
  }
};