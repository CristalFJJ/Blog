//点类
class Dots {
  constructor(canvas, x, y, r, sx, sy) {
    // x/y/r/sx/sy为可选参数 不传则随机生成
    this.canvas = canvas; // canvas节点
    this.ctx = this.canvas.getContext('2d'); // canvas绘图上下文
    this.x = x || Math.random() * this.canvas.width; // 横向坐标
    this.y = y || Math.random() * this.canvas.height;; // 纵向坐标
    this.r = r || Math.random() * 2; // dot半径 (随机生成 <4 的半径值)
    this.sx = sx || Math.random() * 2 - 1 // 单位时间水平移动距离 (随机确定点的移动速度与方向 速度值在 (-1, 1) 之间 提高数值可加快速度)
    this.sy = sy || Math.random() * 2 - 1 // 单位时间纵向移动距离 (随机确定点的移动速度与方向 速度值在 (-1, 1) 之间 提高数值可加快速度)
  }
  // Dots实例的初始化方法，在canvas中绘制一个点，并确定这个Dots实例移动的方向与速度（由sx与sy决定，即确定sx与sy的值）
  // 初始化点的方法 
  init() {
    this.ctx.beginPath(); //开启绘制路径
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI); // 绘制圆 参数依次为 圆的横坐标/纵坐标/半径/绘制圆的起始位置/绘制圆的弧度大小
    this.ctx.fillStyle = "rgba(141,182,205,0.8)"; // 设置填充颜色
    this.ctx.fill(); // 填充颜色
    this.ctx.closePath(); // 关闭绘制路径
  }
  //更新dot的位置，通过不断调用其的update方法，使其产生运动的效果，并且判断dot所处的位置是否已经超出canvas的边界，若超出则调用其init()方法，使其重生在canvas内
  upDate() {
    this.x = this.x + this.sx;
    this.y = this.y + this.sy;

    // 点超出canvas范围时另其"重生"
    if (this.x < 0 || this.x > this.canvas.width) {
      this.init(this.canvas);
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.init(this.canvas);
    }

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgba(141,182,205,0.8)";
    this.ctx.fill();
    this.ctx.closePath();
  }
  // 跟踪鼠标的点的位置更新 x/y为鼠标位置
  mouseDot(x, y) {
    this.x = x;
    this.y = y;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgba(141,182,205,0.8)";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

function dotLine(cav) {
  
  var dotsArr = [],
    dotsNum = 0,
    maxDotsNum = 0,
    overNum = 0, // 超出最大数量的点的数量
    dotsDistance = 250, // 点之间产生连线的最大距离

    canvas = document.getElementById(cav),
    ctx = canvas.getContext('2d'),

    width = parseInt(document.documentElement.clientWidth),
    height = parseInt(document.body.scrollHeight),
    
    area = width * height, // canvas区域面积
    cssText = `width: ${width} px; height: ${height} px`;
    console.log(document.body.scrollHeight);
  // 设置canvas的宽高
  canvas.setAttribute('style', cssText);
  canvas.width = width.toString();
  canvas.height = height.toString();

  // 更具canvas面积动态确定初始化点的数量和最大数量
  dotsNum = parseInt(area / 6000);
  maxDotsNum = dotsNum * 2;

  //生成点
  for (var i = 0; i < dotsNum; i++) {
    var dot = new Dots(canvas);
    dotsArr.push(dot);
    dot.init(canvas);
  }

  //鼠标事件
  document.addEventListener('click', createDot);

  function createDot(e) {
    var tx = e.pageX,
      ty = e.pageY;
    if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {

      for (var i = 0; i < 5; i++) {
        var dot = new Dots(canvas, tx, ty);
        dotsArr.push(dot);
        dotsNum += 1;
        dot.init();
      }
    }
  };
  document.addEventListener('mousemove', moveDot);

  function moveDot(e) {

    var tx = e.pageX,
      ty = e.pageY;
    if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {
      dot.mouseDot(tx, ty);
    }
  };

  //动画与连线
  var requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame;
  requestAnimFrame(animateUpdate); // 兼容不同浏览器的requestAnimationFrame

  function animateUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空canvas中原有的内容

    // 更新点的位置 数量超出最大值时舍弃旧的点
    if (dotsNum > maxDotsNum) {
      overNum = dotsNum - maxDotsNum;
    }
    
    for (var i = overNum; i < dotsNum; i++) {
      dotsArr[i].upDate();
    }

    // 绘制连线
    for (var i = overNum; i < dotsNum; i++) {
      for (var j = i + 1; j < dotsNum; j++) {
        var tx = dotsArr[i].x - dotsArr[j].x,
          ty = dotsArr[i].y - dotsArr[j].y,
          s = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
        if (s < dotsDistance) {
          ctx.beginPath();
          ctx.moveTo(dotsArr[i].x, dotsArr[i].y);
          ctx.lineTo(dotsArr[j].x, dotsArr[j].y);
          ctx.strokeStyle = 'rgba(141,182,205,' + (dotsDistance - s) / dotsDistance + ')';
          ctx.strokeWidth = 1;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }

    requestAnimFrame(animateUpdate);
  }
}
export default dotLine;
