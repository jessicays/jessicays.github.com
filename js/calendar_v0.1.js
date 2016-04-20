//版权 北京智能社©, 保留所有权利

(function (){
	var added=false;
	
	window.calendar=function (obj){
		// 添加CSS文件
		if ( ! added)
		{
			var oLink=document.createElement('link');
			oLink.href='css/calendar.css';
			oLink.rel='stylesheet';
			var oHead=document.getElementsByTagName('head')[0];
			oHead.appendChild(oLink);
			
			added=true;
		}
		
		obj.onfocus=function (){
			oDiv=document.createElement('div');
			oDiv.className='calendar_zns';
			oDiv.style.top=obj.offsetTop+obj.offsetHeight+5+'px';
			oDiv.style.left=obj.offsetLeft+'px';
			oDiv.innerHTML='<a href="javascript:;" class="prev">←</a> \
			<a href="javascript:;" class="next">→</a> \
			<span>2016年02月</span> \
			<ul> \
				<li>一</li> \
				<li>二</li> \
				<li>三</li> \
				<li>四</li> \
				<li>五</li> \
				<li class="week">六</li> \
				<li class="week">日</li> \
			</ul> \
			<ol></ol>';
			obj.parentNode.insertBefore(oDiv, obj);
			
			_calendar(oDiv); // 私有函数
			
			// 消失
			document.onclick=function (){
				oDiv.parentNode.removeChild(oDiv);
			};
		};

		obj.onclick=function (ev){
			var oEvent=ev || event;
			oEvent.cancelBubble=true;
		};
		
		// 日历
		function _calendar(oDiv)
		{
			// 本月
			var now=0;
			_create();
			
			// 下一个月
			var oNext=oDiv.getElementsByTagName('a')[1];
			oNext.onclick=function (ev){
				var oEvent=ev || event;
				now++;
				_create();
				
				oEvent.cancelBubble=true;
			};
			
			// 上个月
			var oPrev=oDiv.getElementsByTagName('a')[0];			
			oPrev.onclick=function (ev){
				var oEvent=ev || event;
				now--;
				_create();
				
				oEvent.cancelBubble=true;
			};
			
			function _create()
			{
				// 修改年 月
				var oSpan=oDiv.getElementsByTagName('span')[0];
				var oDate=new Date();
				oDate.setMonth(oDate.getMonth()+now);
				var year=oDate.getFullYear();
				var month=oDate.getMonth();
				oSpan.innerHTML=year+'年'+(month+1)+'月';
				
				// 创建空白li
				var oOl=oDiv.getElementsByTagName('ol')[0];
				oOl.innerHTML='';
				var oDate=new Date();
				oDate.setMonth(oDate.getMonth()+now);
				oDate.setDate(1);
				var week=oDate.getDay();
				(week==0) && (week=7);
				for (var i=0; i<week-1; i++)
				{
					var oLi=document.createElement('li');
					oOl.appendChild(oLi);
				}
				
				// 创建真正的日期
				var oDate=new Date();
				oDate.setMonth(oDate.getMonth()+now);
				oDate.setMonth(oDate.getMonth()+1, 1);
				oDate.setDate(0);
				var total=oDate.getDate();
				for (var i=0; i<total; i++)
				{
					var oLi=document.createElement('li');
					oLi.innerHTML=i+1;
					oOl.appendChild(oLi);
				}
				
				// 处理周末
				var aLi=oOl.children;
				for (var i=0; i<aLi.length; i++)
				{
					if (i%7==5 || i%7==6)
					{
						aLi[i].className='week';
					}
				}
				
				if (now == 0)
				{
					// 今天
					var oDate=new Date();
					var today=oDate.getDate();
					
					for (var i=0; i<aLi.length; i++)
					{	
						if (aLi[i].innerHTML == today)
						{
							aLi[i].className='today';
						}
						else if (aLi[i].innerHTML < today)
						{
							aLi[i].className='past';
						}
					}
				}
				else if (now < 0)
				{
					for (var i=0; i<aLi.length; i++)
					{
						aLi[i].className='past';
					}
				}
				
				// 加事件
				for (var i=0; i<aLi.length; i++)
				{
					if (aLi[i].className != 'past')
					{
						aLi[i].onclick=function (){
							obj.value=oSpan.innerHTML+this.innerHTML+'日';
						};
					}
					else 
					{
						aLi[i].onclick=function (ev){
							var oEvent=ev || event;
							
							oEvent.cancelBubble=true;
						};
					}
				}
					
			}
			
		}
	};
})();





















