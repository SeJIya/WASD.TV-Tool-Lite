$(document).ready(() => {
	setInterval(() => {
		let lg = $('.iframe');
		if(lg.length > 0){
			let html = $($(lg).contents()).find('html')[0];
			let style = $(html).attr('style');
			if(style){
				if(style.indexOf('hidden') == -1){
					$(html).css({overflow: 'hidden'});
				}
			}
		}
	}, 250);
});