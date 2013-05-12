function GetPluginSettings()
{
	return {
		"name":			"Ejecta",
		"id":			"Ejecta",
		"version":		"1.0",
		"description":	"Allows access to Ejecta's API (GameCenter, iAP)",
		"author":		"0plus1 (original author JPT)",
		"help url":		"http://games.0plus1.com/",
		"category":		"Platform specific",
		"type":			"object",			// not in layout
		"rotatable":	false,
		"flags":		pf_singleglobal
	};
};

//////////////////////////////////////////////////////////////
// Conditions
AddCondition(0,	cf_trigger, "On Auth Success", "GameCenter", "On GameCenter Authenticated", "Triggered when the user Authenticates in GameCenter.", "OnAuthSuccess");
AddCondition(1,	cf_trigger, "On Auth Error", "GameCenter", "On GameCenter Authenticated Error", "Triggered when an error occurs while authenticating in GameCenter.", "OnAuthError");
AddCondition(2,	cf_trigger, "On Soft Auth Error", "GameCenter", "On GameCenter SOFT Authenticated Error", "Triggered when an error occurs while silintly authenticating in GameCenter.", "OnSoftAuthError");

AddStringParam("Name", "Name of the product that you need loaded.", "\"\"");
AddCondition(3,	cf_fake_trigger, "On product Loaded", "Data", "On productID <b>{0}</b> loaded", "Triggered when a productID has been loaded.", "checkProduct_loaded");

AddStringParam("Name", "Check product purchased.", "\"\"");
AddCondition(4,	cf_fake_trigger, "On product purchased", "Data", "On productID <b>{0}</b> purchased", "Triggered when a productID has been purchased.", "checkProduct_purchased");

AddStringParam("Name", "Check product purchase failed.", "\"\"");
AddCondition(5,	cf_fake_trigger, "On product purchase failed", "Data", "On productID <b>{0}</b> purchase failed", "Triggered when a productID has failed purchase.", "checkProduct_purchaseFail");

//////////////////////////////////////////////////////////////
// Actions
AddAction(0, af_none, "GameCenter Authenticate (Form)", "GameCenter", "GameCenter Authenticate", "Display GameCenter login form.", "authenticate");
AddAction(1, af_none, "GameCenter Soft Authenticate (No Form)", "GameCenter", "GameCenter Soft Authenticate", "Try to authenticate into GameCenter. This should be called once at game start.", "softAuthenticate");

AddStringParam("name", "Enter the name of Achievement.", "\"\"");
AddNumberParam("percentage", "absolute percentage", "100");
AddAction(2, af_none, "Report Achievement", "GameCenter", "Report Achievement {0} ({1})", "Report Achievement to GameCenter with given name and absolute percentage.", "reportAchievement");

AddStringParam("name", "Enter the name of Achievement.", "\"\"");
AddNumberParam("percentage", "relative percentage", "1");
AddAction(3, af_none, "Add to Achievement", "GameCenter", "Add {1} to Achievement {0}", "Report Achievement to GameCenter with given name and relative percentage.", "reportAchievementAdd");

AddStringParam("listName", "Leaderboard Name.", "\"\"");
AddNumberParam("score", "Score", "1");
AddAction(4, af_none, "Report Score", "GameCenter", "Report score of {1} to {0}", "Report Score to GameCenter to given Highscore List.", "reportScore");

AddStringParam("listName", "Leaderboard Name.", "\"\"");
AddAction(5, af_none, "Show Leaderboard", "GameCenter", "Show Leaderboard {0}", "Open Leaderboard in GameCenter.", "showLeaderboard");

AddAction(6, af_none, "Show Achievements", "GameCenter", "Show Achievements", "Open Achievements list.", "showAchievements");

//iAP
AddStringParam("productsIDs", "Products ID. (Currently only a product can be loaded)", "\"\"");
AddAction(7, af_none, "Get Product info", "iAP", "Get Product {0}", "Get product from store.", "getProducts");

AddStringParam("productID", "Enter productID");
AddAction(8, af_none, "Purchase productID", "Purchase", "Purchase {0}", "Purchase", "purchaseProduct");

//EJECTA
AddStringParam("URL", "URL to open (including protocol). NOTE: Ejecta add this string beforey your message: 'Open Browser?'", "\"\"");
AddStringParam("message", "Confirmation message to show.", "\"\"");
AddAction(9, af_none, "Open URL", "Ejecta", "Open url {0}", "Open URL in a mobile Safari window.", "openURL");

////////////////////////////////////////
// Expressions 
AddStringParam("productID", "Product id to call.", "\"\"");
AddStringParam("type", "productID | title | description | price", "\"\"");
AddExpression(0, ef_return_string, "Read parameters from appstore", "Data", "readProduct_data", "Read the returned value from the app store.");
////////////////////////////////////////

ACESDone();

// Property grid properties for this plugin
var property_list = [
	//new cr.Property(ept_combo,'Test Mode','Disabled','Allows testing outside Ejecta. All function return true and do nothing when this option is enabled.','Enabled|Disabled'),
];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
	
// Called by the IDE to draw this instance in the editor
IDEInstance.prototype.Draw = function(renderer)
{
}

// Called by the IDE when the renderer has been released (ie. editor closed)
// All handles to renderer-created resources (fonts, textures etc) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function()
{
}
