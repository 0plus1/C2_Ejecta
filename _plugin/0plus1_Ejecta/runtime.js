// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.Ejecta = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.Ejecta.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		this.progress = 0;
		this.lastError = "";
			
	};
	
	var instanceProto = pluginProto.Instance.prototype;
	var theInstance = null;
	var iapProducts = [];
	var iap_productPurchased = false;
	
	instanceProto.onCreate = function()
	{
		theInstance = this;
		
		if (typeof Ejecta === 'undefined') {
			this.BrowserMode = true;
			//this.BrowserMode = (this.properties[0]==0)?true:false;
		} else {
			this.BrowserMode = false;
		}
		
		if(this.BrowserMode===false){
			//GameCenter
			if (typeof gameCenter === 'undefined') {
				this.gameCenter = new Ejecta.GameCenter();
			} else {
				this.gameCenter = gameCenter;
			}
			//iAP
			this.iap = new Ejecta.IAPManager();
		}
	};
	//AUTH
	instanceProto.softAuthenticate = function ()
	{
		if(this.BrowserMode==true) {console.log('Ejecta::softAuthenticate'); return;};
		
		var this_instance = this;	
		this.gameCenter.softAuthenticate(function(error){
			if( error ) {
					this_instance.lastError = error;
				this_instance.runtime.trigger(cr.plugins_.Ejecta.prototype.cnds.OnSoftAuthError, this_instance);
			}
			else {
				this_instance.runtime.trigger(cr.plugins_.Ejecta.prototype.cnds.OnAuthSuccess, this_instance);
			}
		});
	};
	instanceProto.AuthenticateWithForm = function ()
	{
		if(this.BrowserMode==true) {console.log('Ejecta::AuthenticateWithForm'); return;};
		
		var this_instance = this;
		this.gameCenter.authenticate(function(error){
			if( error ) {
					this_instance.lastError = error;
				this_instance.runtime.trigger(cr.plugins_.Ejecta.prototype.cnds.OnAuthError, this_instance);
			}
			else {
				this_instance.runtime.trigger(cr.plugins_.Ejecta.prototype.cnds.OnAuthSuccess, this_instance);
			}
		});
	};
	//ACHIEVEMENTS
	instanceProto.reportAchievement = function(name, percentage)
	{
		if(this.BrowserMode==true) {console.log('Ejecta::reportAchievement'); return;};
		
		var this_instance = this;
		if( this.gameCenter.authed ) {
    
			this.gameCenter.reportAchievement( name, percentage, function( error) {
				if( error ) {
					this_instance.lastError = error;
					this_instance.runtime.trigger(cr.plugins_.Ejecta.prototype.cnds.OnAchievementError, this_instance);
				}
				else {
					this_instance.runtime.trigger(cr.plugins_.Ejecta.prototype.cnds.OnAchievementSuccess, this_instance);
				}
			});
		}
	};
	instanceProto.reportAchievementAdd = function(name, percentage)
	{
		if(this.BrowserMode==true) {console.log('Ejecta::reportAchievementAdd'); return;};
		
		var this_instance = this;
		if( this.gameCenter.authed ) {
    
			this.gameCenter.reportAchievementAdd( name, percentage, function( error) {
				if( error ) {
					this_instance.lastError = error;
					this_instance.runtime.trigger(cr.plugins_.Ejecta.prototype.cnds.OnAchievementError, this_instance);
				}
				else {
					this_instance.runtime.trigger(cr.plugins_.Ejecta.prototype.cnds.OnAchievementSuccess, this_instance);
				}
			});
		}
	};
	instanceProto.showAchievements = function()
	{
		if(this.BrowserMode==true) {console.log('Ejecta::showAchievements'); return;};
		
		var this_instance = this;
		if( this.gameCenter.authed ) {
			this.gameCenter.showAchievements();
		}
	};
	//SCORE
	instanceProto.reportScore = function(listName, score)
	{
		if(this.BrowserMode==true) {console.log('Ejecta::reportScore'); return;};
		
		var this_instance = this;
		if( this.gameCenter.authed ) {
    
			this.gameCenter.reportScore( listName, score, function( error) {
				if( error ) {
					this_instance.lastError = error;
					this_instance.runtime.trigger(cr.plugins_.Ejecta.prototype.cnds.OnScoreError, this_instance);
				}
				else {
					this_instance.runtime.trigger(cr.plugins_.Ejecta.prototype.cnds.OnScoreSuccess, this_instance);
				}
			});
		}
	};
	instanceProto.showLeaderboard = function(listName)
	{
		if(this.BrowserMode==true) {console.log('Ejecta::showLeaderboard'); return;};
		
		var this_instance = this;
		if( this.gameCenter.authed ) {
			this.gameCenter.showLeaderboard(listName);
		}
	};
	//iAP
	instanceProto.getProducts = function(listProducts)
	{
		if(this.BrowserMode==true) {console.log('Ejecta::getProducts'); return;};
		//Here we should parse a json object or something along those lines
		var arrayProduct = new Array;
		arrayProduct[0] = listProducts; //Forced only one id until I have time to test multiple products requests
				
		this.iap.getProducts( arrayProduct, function(error, products) {
			if( error ) {
				console.log( error );
			}
			else {
				for( var i = 0; i < products.length; i++ ) {
					console.log(products[i].id, products[i].title, products[i].description, products[i].price);
					if( products[i].id == arrayProduct[i] ) {
						productID = products[i].id;
						products[i].loaded = true; //Add a loaded parameter for later checking!
						iapProducts[productID] = products[i];
					}
				}
			}
		});
	};
	instanceProto.readProduct_data = function(ret,productID,type)
	{
		var returnString;
		var currentID = iapProducts[productID];
		
		if(type == "productID"){ returnString = currentID.productID; }
		if(type == "title"){ returnString = currentID.title; }
		if(type == "description"){ returnString = currentID.description; }
		if(type == "price"){ returnString = currentID.price; }
		
		ret.set_string(returnString);
		return;
	}
	instanceProto.purchaseProduct = function(productID)
	{
		var product = iapProducts[productID];
		product.purchase(1, function(error, transaction) { //Could open the door to multiple purchases, will check.
            if( error ) {
				iap_productPurchased = 0;
                console.log(error);
            }
            else {
				iap_productPurchased = 1;
                // Purchase successful; log some transaction info
                console.log( transaction.productId, transaction.id, transaction.receipt );
            }
		});
	}
	//-
	instanceProto.checkProduct_loaded = function(productID)
	{
		if (typeof iapProducts[productID] === 'undefined') { return false; } //If undefined skip
		if (iapProducts[productID].loaded==true){
			return true;
		}
		return false;
	}
	instanceProto.checkProduct_purchased = function(productID)
	{
		if (typeof iapProducts[productID] === 'undefined') { return false; } //If undefined skip
		if (iap_productPurchased === false) { return false; } //If undefined skip
		
		if (iap_productPurchased === 1) { iap_productPurchased = false; return true; } else { return false; }
	}
	instanceProto.checkProduct_purchaseFail = function(productID)
	{
		if (typeof iapProducts[productID] === 'undefined') { return false; } //If undefined skip
		if (iap_productPurchased === false) { return false; } //If undefined skip
		
		if (iap_productPurchased === 0) { iap_productPurchased = false; return true; } else { return false; }
	}
	//Ejecta
	instanceProto.openURL = function(URL,message)
	{
		if(this.BrowserMode==true) {console.log('Ejecta::openURL'); return;};
		ejecta.openURL( URL,message );
	};
		
	
	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	Cnds.prototype.OnAuthSuccess = function ()
	{
		console.log('Auth -> Success');
		return true;
	};
	Cnds.prototype.OnAuthError = function ()
	{
		console.log('Auth -> Error');
		return true;
	};
	Cnds.prototype.OnSoftAuthError = function ()
	{
		console.log('Soft Auth -> Error');
		return true;
	};
	//iAP
	Cnds.prototype.checkProduct_loaded = function (productID)
	{
		return this.checkProduct_loaded(productID);
	};
	Cnds.prototype.checkProduct_purchased = function (productID)
	{
		return this.checkProduct_purchased(productID);
	};
	Cnds.prototype.checkProduct_purchaseFail = function (productID)
	{
		return this.checkProduct_purchaseFail(productID);
	};
	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};
	//AUTH
	Acts.prototype.authenticate = function ()
	{
		this.AuthenticateWithForm();
	};
	Acts.prototype.softAuthenticate = function ()
	{
		this.softAuthenticate();
	};
	//ACHIEVEMENTS
	Acts.prototype.reportAchievement = function (name, percentage)
	{
		this.reportAchievement(name, percentage);
	};
	Acts.prototype.reportAchievementAdd = function (name, percentage)
	{
		this.reportAchievementAdd(name, percentage);
	};
	Acts.prototype.showAchievements = function ()
	{
		this.showAchievements();
	};
	//SCORE
	Acts.prototype.reportScore = function (listName, score)
	{
		this.reportScore(listName, score);
	};
	Acts.prototype.showLeaderboard = function (listName)
	{
		this.showLeaderboard(listName);
	};
	
	//IAP
	Acts.prototype.getProducts = function (productsIDs)
	{
		this.getProducts(productsIDs);
	};
	
	Acts.prototype.purchaseProduct = function (productID)
	{
		this.purchaseProduct(productID);
	};
	
	//EJECTA
	Acts.prototype.openURL = function (URL,message)
	{
		this.openURL(URL,message);
	};
	
	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	Exps.prototype.readProduct_data = function (ret,productID,type)	
	{
		this.readProduct_data(ret,productID,type);
	};
	
	pluginProto.exps = new Exps();

}());