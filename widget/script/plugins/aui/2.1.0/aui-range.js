!function(e,t){"use strict";var n,i,l,a=function(e,t){this._init(e,t)},s=null;a.prototype={_init:function(e,t){var a=this;n=Math.abs(e.element.max-e.element.min),i=e.element.offsetLeft,l=e.element.offsetWidth-28,e.element.insertAdjacentHTML("afterend",'<div class="aui-range-tip aui-hide">'+e.element.value+"</div>");var s=l/n*Math.abs(e.element.value-e.element.min);e.element.nextSibling.style.left=i+s-11+"px",e.element.addEventListener("input",function(){a._showTip(e.element,t)}),e.element.addEventListener("touchmove",function(){a._showTip(e.element,t)}),e.element.addEventListener("touchend",function(){a._hideTip(e.element)})},_showTip:function(e,t){e.nextSibling.classList.remove("aui-hide");var a=l/n*Math.abs(e.value-e.min);e.nextSibling.style.left=i+a-11+"px",e.nextSibling.innerText=e.value,t({value:e.value})},_hideTip:function(e){s&&clearTimeout(s),s=setTimeout(function(){e.nextSibling.classList.add("aui-hide")},1500)}},e.auiRange=a}(window);