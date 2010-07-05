jQuery(document).ready(function($) {
	var refreshSteps = function() {	
		var url = window.location.href.split('&').shift() + '&DeliveryType=VIEW&DeliveryMethod=JSON';
		$.ajax({
			type: "POST",
			url: url,
			dataType: 'json',
			success: function(json) {
				// Refresh the view.
				$('#Content').html(json.Data);
				// Go to the next step.
				if(!json.Complete && !json.Error) {
					refreshSteps();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if(textStatus == "timeout")
					return;
				// Remove any old popups
				$('.Popup').remove();
				// Add new popup with error
				$.popup({}, XMLHttpRequest.responseText);
			}
		});
	}
	refreshSteps();
});