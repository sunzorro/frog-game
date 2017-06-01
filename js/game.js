
	//不用了谢谢呵呵
	function ifIOS()
	{
		var u = navigator.userAgent, app = navigator.appVersion;
		if( u.indexOf('iPhone') > -1 || u.indexOf('iPad')>-1)
		return true;
		return false;
	}
	function ifAndroid()
	{
		var u = navigator.userAgent, app = navigator.appVersion;
		if( u.indexOf('Android') > -1 || u.indexOf('Linux')>-1)
		return true;
		return false;		
	}
	function initiate()
	{
		//判断是否支持web audio api PC和苹果设备支持 android不支持
		audioContextClass = (window.AudioContext ||
				window.webkitAudioContext ||
				window.mozAudioContext ||
				window.oAudioContext ||
				window.msAudioContext);
		if(audioContextClass)
		{
			function finishedLoading()
			{
				//载入完毕 这里可以提供给页面输出
			}
			audioContext = new audioContextClass();
			bufferLoader = new BufferLoader(audioContext,
										['img/die.mp3','img/point.mp3','img/hit.mp3','img/flap_wing.mp3','img/swoosh.mp3'],
										finishedLoading);
			bufferLoader.load();
			bufferList = bufferLoader.bufferList;

			function playSound(type) {
				var index=0;
				switch(type)
				{
					case "die":
						index = 0;
						break;
					case "point":
						index =1;
						break;
					case "hit":
						index = 2;
						break;
					case "flap_wing":
						index =3;
						break;
					case "swoosh":
						index = 4;
						break;					
				}
				var source = audioContext.createBufferSource();
				source.buffer = bufferList[index];
				source.connect(audioContext.destination);
				source.start(0);
			}
			Sound ={
				playFlap:function(){playSound("flap_wing");},
				playHit:function(){playSound("hit");},
				playPoint:function(){playSound("point");},
				playDie:function(){playSound("die");},
				playSwoosh:function(){playSound("swoosh");},		
			}
		}
		else{
			//如果是安卓设备 没办法用音效 因为只能播放一次 坑爹 又不支持webaudio 只能给个提示了
			isAndroid = ifAndroid();
			if(isAndroid)
			{
				Sound ={
					playFlap:function(){return false;},
					playHit:function(){return false;},
					playPoint:function(){return false;},
					playDie:function(){return false;},
					playSwoosh:function(){return false;},					
				}				
				//alert("对不起，您的设备暂不支持音效，只能用沉默模式啦！");
			}else{
				sound_swoosh = AudioFX('img/swoosh', { formats: ['ogg', 'mp3'],volume:1});
				sound_die = AudioFX('img/die', { formats: ['ogg', 'mp3'],volume:1});
				sound_point = AudioFX('img/point', { formats: ['ogg', 'mp3'],volume:1});
				sound_hit = AudioFX('img/hit', { formats: ['ogg', 'mp3'],volume:1});
				sound_flap_wing = AudioFX('img/flap_wing', { formats: ['ogg', 'mp3'] ,volume:1,pool: 5});
				Sound ={
					playFlap:function(){sound_flap_wing.play();},
					playHit:function(){sound_hit.play();},
					playPoint:function(){sound_point.play();},
					playDie:function(){sound_die.play();},
					playSwoosh:function(){sound_swoosh.play();},
					setVolume: function(name,v){
						switch(name)
						{
							case 'point':
								sound_point.audio.volume = v;
								break;
							case 'die':
								sound_die.audio.volume = v;
								break;
							case 'hit':
								sound_hit.audio.volume = v;
								break;				
						}
					}
				}
			}			
		}		
        
		init();
        
        ifDieSix();
	}
	
	function init()
	{	
		Canvas = document.getElementById('canvas');
		Context = Canvas.getContext('2d');
		GroundImg = document.getElementById('ground');
		BirdImg = document.getElementById('bird');
		TubeImg1 = document.getElementById('tube_down');
		TubeImg2 = document.getElementById('tube_up');
        TubeImg21 = document.getElementById('tube_up');
        TubeImg22 = document.getElementById('tube_up');
        TubeImg23 = document.getElementById('tube_up');
        TubeImg24 = document.getElementById('tube_up');
        TubeImg25 = document.getElementById('tube_up');
        TubeImg26 = document.getElementById('tube_up');
        TubeImg27 = document.getElementById('tube_up');
        
		BgImg= document.getElementById('bg');

		//iphone的safari有时候用localStorage会报错 这时候就用cookie存
		ifSupportStorage = true;
		try{
			storage = window.localStorage;
		}catch(e){
			ifSupportStorage = false;
		}
		
		BG = new BGD(BgImg,0,0,0,0,false,0,BG_Y,0);
		GROUND = new Ground(GroundImg,0,0,0,0,false,0,GROUND_Y,0);
		BIRD = new Bird(BirdImg,BIRD_WIDTH,0,BIRD_WIDTH,BIRD_HEIGHT,true,BIRD_X,BIRD_POSITION,0);

		game = new Game();
		resize();
		game.start();
        
	}
	function resize()
	{	
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;
		var canvas = document.getElementById('canvas');
		var canvasWidth = canvas.width;
		var canvasHeight = canvas.height;
		var ratio = canvasHeight/canvasWidth;
		if(windowWidth*ratio>=windowHeight)//把竖着的填满
		{
			canvas.style.height = windowHeight+'px';
			canvas.style.width = windowHeight/ratio+'px';
		}else{//把横着的填满	
			canvas.style.width = windowWidth+'px';
			canvas.style.height = windowWidth*ratio+'px';
		}
	}

	window.addEventListener('resize', resize, false); 
	window.addEventListener('load', initiate, false); 

	window.addEventListener('touchmove',function(e){
		e.stopPropagation();
		e.preventDefault();
	});
	

	if("ontouchend" in document)
	{
		window.addEventListener('touchstart',function(e){
			touch();
		});		
	}else{
		window.addEventListener('click',function(e){
			touch();
		});
		window.addEventListener('keydown',function(e){
			e = (e) ? e : window.event;
			if (e.keyCode) 
			{
			   if(e.keyCode == 32){
				 touch();
			   }
			}
		})
	}

	
	function touch()
	{
        if($('body').hasClass("active")){
            switch(game.status)
            {
                case WELCOME:
                    Sound.playFlap();
                    game.birdSprite.velocity.y= -FLAP;			
                    game.status = PLAYING;
                    break;
                case PLAYING:
                    Sound.playFlap();
                    game.birdSprite.velocity.y = -FLAP;
                    break;
                case DYING:
                    break;
                case END:
                    Sound.playSwoosh();
                    init();
                    break;
            }
        }
    }



//游戏得分规则
function ifDieSix(){
    
        if(game.score>=10){
			success();
		//	die(game.score,highestScore);
        }
    
}
