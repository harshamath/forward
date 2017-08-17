var casper = require('casper').create({
pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});
 
//First step is to open Facebook
casper.start().thenOpen("https://facebook.com", function() {
    console.log("Facebook website opened");
});
 
 
casper.then(function(){
    console.log("Make a screenshot and save it as BeforeLogin.png");
	this.wait(6000);//Wait a bit so page loads (there are a lot of ajax calls and that is why we are waiting 6 seconds)
    this.capture('BeforeLogin.png');
}); 
 
//Now we have to populate username and password, and submit the form
casper.then(function(){
    console.log("Login using username and password");
    this.evaluate(function(){
        document.getElementById("email").value="harsha.ak19@gmail.com";
		document.getElementById("pass").value="harsha01blacky";
		document.getElementById("u_0_r").click();//#u_0_r
    });
});
 
//Wait to be redirected to the Home page, and then make a screenshot
casper.then(function(){
    console.log("Make a screenshot and save it as AfterLogin.png");//#feedx_sprouts_container
	this.waitForSelector('#feedx_sprouts_container')
	//this.wait(6000);//Wait a bit so page loads (there are a lot of ajax calls and that is why we are waiting 6 seconds)
 });//#u_0_4 > form > div > button > i //#js_26 > form > button > i //*[@id="u_0_4"]/form/div/button/i ////*[@id="js_26"]/form/button/i
 
 
 //#u_0_a
 
casper.then(function(){
	this.capture('AfterLogin.png');
	var js = this.evaluate(function() {
	return document;
	});
	this.echo(js.all[0].outerHTML);
});
 
//Get all images greater than 100x100 pixels
/*casper.then(function(){
	var images = this.evaluate(function(){
		var facebookImages = document.getElementsByTagName('img'); 
		var allSrc = [];
		for(var i = 0; i < facebookImages.length; i++) {
			if(facebookImages[i].height >= 100 && facebookImages[i].width >= 100)
				allSrc.push(facebookImages[i].src);
		}
		return JSON.stringify(allSrc);
	});
	console.log(images);
})*/
 
casper.run();