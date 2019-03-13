function Compile(el, vm) {
  // 保存vm到compile对象
  this.$vm = vm;
  // 保存el元素对象到compile对象
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);

  // 如果el存在
  if (this.$el) {
    // 1. 将el中所有子节点转移到fragment对象中
    this.$fragment = this.node2Fragment(this.$el);
    // 2. 初始化: 编译fragment中所有层次子节点
    this.init();
    // 3. 将fragment添加到el中: el中原来的子节点又回去了
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }

    return fragment;
  },

  init: function () {
    this.compileElement(this.$fragment);
  },

  /*
  编译指定元素/fragment的所有子节点
   */
  compileElement: function (el) {
    // 得到所有子节点
    var childNodes = el.childNodes,
      me = this;
    // 遍历所有子节点
    [].slice.call(childNodes).forEach(function (node) {
      // 得到节点的文本内容
      var text = node.textContent;
      // 定义匹配插值的正则
      var reg = /\{\{(.*)\}\}/;
      // 如果节点是一个元素节点
      if (me.isElementNode(node)) {
        // 编译元素节点中的指令
        me.compile(node);
      // 如果节点一个插值格式的文本节点
      } else if (me.isTextNode(node) && reg.test(text)) {
        // 编译文本节点中的插值
        me.compileText(node, RegExp.$1);  // $1: name 表达式
      }

      // 如果当前子节点还有子节点
      if (node.childNodes && node.childNodes.length) {
        // 递归调用==> 实现所有层次子节点的编译
        me.compileElement(node);
      }
    });
  },

  compile: function (node) {
    // 得到所有属性节点
    var nodeAttrs = node.attributes,
      me = this;

    // 遍历所有属性节点
    [].slice.call(nodeAttrs).forEach(function (attr) {
      // 得到属性名: v-on:click
      var attrName = attr.name;
      // 如果是指令属性
      if (me.isDirective(attrName)) {
        // 得到属性值也就是表达式: fn
        var exp = attr.value;
        // 得到指令名: on:click
        var dir = attrName.substring(2);
        // 如果是事件指令
        if (me.isEventDirective(dir)) {
          // 解析事件指令
          compileUtil.eventHandler(node, me.$vm, exp, dir);
        // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }

        // 移除指令属性
        node.removeAttribute(attrName);
      }
    });
  },

  // 编译文本节点
  compileText: function (node, exp) {
    // 调用编译工具对象进行处理
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function (attr) {
    return attr.indexOf('v-') == 0;
  },

  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0;
  },

  isElementNode: function (node) {
    return node.nodeType == 1;
  },

  isTextNode: function (node) {
    return node.nodeType == 3;
  }
};

/*
包含n个解析模板的方法的对象
 */
var compileUtil = {
  // 解析: v-text/{{}}
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },

  // 解析: v-html
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },

  // 解析: v-model
  model: function (node, vm, exp) {
    // 初始化显示, 创建watcher
    this.bind(node, vm, exp, 'model');

    var me = this,
      // 得到当前表达式的值
      val = this._getVMVal(vm, exp);
    // 给节点绑定input监听
    node.addEventListener('input', function (e) { // 输入发生改变自动回调
      // 得到最新的值
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      // 将最新值保存到data对象对应的属性上  ==> 触发数据绑定更新界面的流程
      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  // 解析: v-class
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },

  /*
  解析模板语法最终的解析方法
   */
  bind: function (node, vm, exp, dir) {
    // 根据指令名得到对应的更新函数
    var updaterFn = updater[dir + 'Updater'];
    // 调用节点的更新函数第一次更新节点 ===> 初始化显示
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    // 为后面节点的更新创建一个对应的watcher, 绑定了用于更新的回调函数
    new Watcher(vm, exp, function (value, oldValue) {
      // 更新指定的节点
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  /*
  事件处理
  exp: 表达式    fn
  dir: 指令名   on:click
   */
  eventHandler: function (node, vm, exp, dir) {
    // 得到事件名/类型: click
    var eventType = dir.split(':')[1],
      // 得到事件监听的回调函数
      fn = vm.$options.methods && vm.$options.methods[exp];

    // 如果都存在
    if (eventType && fn) {
      // 给节点绑定指定事件名和回调函数的DOM事件监听, 回调函数的this强制绑定为vm
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  _getVMVal: function (vm, exp) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};


/*
包含n个更新节点方法的对象
 */
var updater = {
  // 更新节点的textContent属性
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的innerHTML属性
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的className属性
  classUpdater: function (node, value, oldValue) {
    // 得到静态类名
    var className = node.className;
    // 合并类名并设置给className
    node.className = className ? className + ' ' + value : value
  },

  // 更新节点的value属性
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
};