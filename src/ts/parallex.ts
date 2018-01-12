var pre = prefix();
var _jsPrefix  = pre.lowercase;
if(_jsPrefix == 'moz') _jsPrefix = 'Moz'

var progShape;
var progress;

var curriculum = {
	start: {
		percent: 0,
		x: 0,
		y: 0
	},
	end: {
		percent: 7,
		y: 0,
		x: -300
	}
}

var moveEl = [
	{	
		name: "c",
		start: {
			percent: 2,
			x: 0,
			y: 0
		},
		end: {
			percent:17,
			y: 0,
			x: -50
		}
	},
	{
		name: "v",
		start: {
			percent: 1,
			x: 0,
			y: 0
		},
		end: {
			percent: 16,
			y: 0,
			x: -50
		}
	},
	{
		name: "wai",
		start: {
			percent: 0,
			x: 0,
			y: 0
		},
		end: {
			percent: 15,
			y: 0,
			x: -50
		}
	}
]

var sizeEl = [
	{
		name: "footer",
		start: {
			percent: 0,
			w: 100,
			wUnit: "%",
			h: 20,
			hUnit: "vh"
		},
		end: {
			percent: 10,
			w: 100,
			wUnit: "%",
			h: 0,
			hUnit: "vh"
		}
	}
]

function sizeElements(scrollProgress: number){
	for(var i = 0; i < sizeEl.length; i++){
		var obj = sizeEl[i];
		var el = document.getElementsByClassName(obj.name)[0];

		if(scrollProgress <= obj.start.percent){
			el.style.height = obj.start.h + obj.start.hUnit;
			el.style.width = obj.start.w + obj.start.wUnit;
		}else if(scrollProgress >= obj.end.percent){
			el.style.height = obj.end.h + obj.end.hUnit;
			el.style.width = obj.end.w + obj.end.wUnit;
		}else if(scrollProgress < obj.end.percent){
			var f = (scrollProgress - obj.start.percent)/(obj.end.percent - obj.start.percent)
			var h = (f * (obj.end.h - obj.start.h))+ obj.start.h;
			var w = (f * (obj.end.w - obj.start.w))+ obj.start.w;

			el.style.height = h + obj.start.hUnit;
			el.style.width = w + obj.start.wUnit;
		}
	}
}

function moveElements(scrollProgress: number){
	for(var i = 0; i < moveEl.length; i++){
		var obj = moveEl[i];
		var el = document.getElementsByClassName(obj.name)[0];

		if(scrollProgress <= obj.start.percent){
			el.style[_jsPrefix+'Transform'] = 'translate('+(obj.start.x)+'vw, '+(obj.start.y)+'vw)';
		}else if(scrollProgress >= obj.end.percent){
			el.style[_jsPrefix+'Transform'] = 'translate('+(obj.end.x)+'vw, '+(obj.end.y)+'vw)';
		}else if(scrollProgress < obj.end.percent){
			var f = (scrollProgress - obj.start.percent)/(obj.end.percent - obj.start.percent)
			var x = f * obj.end.x;
			var y = f * obj.end.y;

			el.style[_jsPrefix+'Transform'] = 'translate('+(x)+'vw, '+(y)+'vw)';
		}
	}
}

// function animateName(scrollProgress: number){
// 	if(scrollProgress <= prenameSpecs.start.percent){
// 		prename.style[_jsPrefix+'Transform'] = 'translate('+(prenameSpecs.start.x)+'vw, '+(prenameSpecs.start.y)+'vw)';
// 	}else if(scrollProgress >= prenameSpecs.end.percent){
// 		prename.style[_jsPrefix+'Transform'] = 'translate('+(prenameSpecs.start.x)+'vw, '+(prenameSpecs.start.y)+'vw)';
// 	}else if(scrollProgress < prenameSpecs.end.percent){
// 		var f = (scrollProgress - prenameSpecs.start.percent)/(prenameSpecs.end.percent - prenameSpecs.start.percent)
// 		var x = f * prenameSpecs.end.x;
// 		var y = f * prenameSpecs.end.y;

// 		prename.style[_jsPrefix+'Transform'] = 'translate('+(x)+'vw, '+(y)+'vw)';
// 	}
// }

function calculateProgressBar(scrollProgress: number){
	var shapeElement = document.getElementsByClassName('progress')[0];
	progShape = document.getElementsByClassName('shape')[0].offsetWidth;
	progress = shapeElement.offsetWidth;

	var newLength = (scrollProgress * progShape) / 100;
	var minimum = newLength/progShape;

	var realLength = 0.1*progShape+0.9*newLength;

	shapeElement.style.width = realLength+"px";
}


function getScrollPercent() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}


function loop(){
	var scrollProgress = getScrollPercent();

	calculateProgressBar(scrollProgress);
	moveElements(scrollProgress);
	sizeElements(scrollProgress);

	requestAnimationFrame(loop);
}

window.onload = function(){
	loop();
}



function prefix() {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
}