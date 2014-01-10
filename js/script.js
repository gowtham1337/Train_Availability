$( document ).ready(function() {
	console.log ("Train Availability plugin loaded");
	$( "input[name='lccp_submitacc']" ).eq(0).attr("value","Update All Status");
	$( "input[name='lccp_submitacc']" ).eq(0).attr("onclick","");
	$( "input[name='lccp_submitacc']" ).eq(0).click(function() {
		checkStatus();
	});
});

function checkStatus(){
$quota=$( "select[name='lccp_quota']" ).val();
$day=$( "input[name='lccp_day']" ).val();
$month=$( "select[name='lccp_month']" ).val();

$('table[bordercolor="#993300"]').first().find('tr :gt(1)').each(function(index){
	$train = $(this).find('td').first().find('input').first().attr('value');
	$(this).find('td :gt(13)').each(function(index){
		if ($(this).text() != '-') updateStatus(this,$quota,$day,$month,$train,index+1)
	});
});
}

function updateStatus(elem,$quota,$day,$month,$train,index){
switch(index) {
 case 1:
  $class="1A";
  break;
 case 2:
  $class="2A";
  break;
 case 3:
  $class="FC";
  break;
 case 4:
  $class="3A";
  break;
 case 5:
  $class="CC";
  break;
 case 6:
  $class="SL";
  break;
 case 7:
  $class="2S";
  break;
 case 8:
  $class="3E";
  break;
 default:
  $class="SL";
  index=4;
}

var postData = { lccp_conc:"ZZZZZZ", lccp_quota:$quota, lccp_day:$day, lccp_month:$month, lccp_classopt:"ZZ", lccp_class1:"ZZ", lccp_class2:"ZZ", lccp_class3:"ZZ", lccp_class4:"ZZ", lccp_class5:"ZZ", lccp_class6:"ZZ", lccp_class7:"ZZ", lccp_class8:"ZZ", lccp_class9:"ZZ", lccp_cls10:"ZZ", lccp_age:"ADULT_AGE", lccp_trndtl:$train};
key = "lccp_class"+index;
postData[key]=$class;

$.post( "http://www.indianrail.gov.in/cgi_bin/inet_accavl_cgi1.cgi",postData, function( data ) {
 data = data.replace(/(html|head|body)/ig, '$1a');
 $status = $(data).find('.table_border_both').eq(8).html();
 if (typeof $status != 'undefined' && $status.indexOf("AVAILABLE") == 0) $status="<font color='green'>"+$status+"</font>";
 $(elem).html( $status );
});
}