var casper = require('casper').create({
pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});
 
//First step is to open the website
casper.start().thenOpen("https://forward.fmh.de/rechner/fmh2/schnellcheck.aspx", function() {
    console.log("Website opened");
});
 
 
casper.then(function(){
    console.log("Make a screenshot and save it as BeforeLogin.png");
	this.wait(6000);//Wait a bit so page loads (there are a lot of ajax calls and that is why we are waiting 6 seconds)
    this.capture('BeforeClick.png');
}); 
 
//Now we have to populate click calculation button and submit form
casper.then(function(){
    console.log("Clicking Calculation");
    this.evaluate(function(){
  		document.getElementById("btnBerechnen").click();//#btnBerechnen
		this.wait(10000);
    });
});
 
//Wait to be redirected to the Home page, and then make a screenshot
casper.then(function(){
    console.log("Make a screenshot after Clicking Calculation");//#feedx_sprouts_container
	//this.waitForSelector('#feedx_sprouts_container')
	this.capture('AfterClick.png');
 });
 
casper.then(function(){
	var js = this.evaluate(function() {
	return document;
	});
	this.echo(js.all[0].outerHTML);
});
 
casper.run();