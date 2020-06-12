/*
            /$$            
    /$$    /$$$$            
   | $$   |_  $$    /$$$$$$$
 /$$$$$$$$  | $$   /$$_____/
|__  $$__/  | $$  |  $$$$$$ 
   | $$     | $$   \____  $$
   |__/    /$$$$$$ /$$$$$$$/
          |______/|_______/ 
================================
        Keep calm and get rich.
                    Is the best.

  	@Author: Dami
  	@Date:   2019-09-29 23:24:24
  	@Last Modified by:   Dami
  	@Last Modified time: 2019-09-30 00:31:37
*/

var loading_animation = '<div class="ajax-loading apollo-animation" style="display: block;"><span class="dot1"></span><span class="dot2"></span></div>';
var __ = wp.i18n.__

$(document).on('click', '.apollo-collection', function(event) {
	event.preventDefault();
	
	var that = $(this),
		id = that.data('id'),
		nonce = that.data('nonce'),
		html = that.html(),
		count = Number( that.find('.collection-count').text() );

	if (that.attr('disabled')) {
		return false;
	}
	that.html(loading_animation).attr('disabled', 'disabled');

	$.ajax({
		url: globals.ajax_url,
		type: 'POST',
		dataType: 'json',
		data: {action: 'apollo-collection', nonce: nonce, id: id},
	})
	.done(function( data ) {
		
		if( data.status == 200 ){

			if( data.type == 1 ){

				that.html(html).removeAttr('disabled').addClass('current');
				that.find('.collection-count').text( count + 1 );

			}else{

				that.html(html).removeAttr('disabled').addClass('current');
				if( count - 1 > 0 ){
					that.find('.collection-count').text( count - 1 );
				}else{
					that.find('.collection-count').text('');
				}

			}

		}else{

			ncPopupTips(0, data.msg);
			that.html(html).removeAttr('disabled');

		}

	})
	.fail(function() {
		that.html(html).removeAttr('disabled');
		ncPopupTips(0, __('Network error, please try again later.', 'apollo'));
	});
});