var hnCore = new hn_core;
var hnUser = new hn_user;
// var hnTrans = new hn_hntrans;
// var hnPing = new hn_hnping;
// var hnHome = new hn_home;
// var hnSettings = new hn_settings;
// var hnBilling = new hn_billing;
// var hnAffiliate = new hn_affiliate;
// var hnDbservice = new hn_dbservice;
// var hnDns = new hn_hndns;
// var hnServer = new hn_hnserver;
// var hnProphet = new hn_prophet;

//init
hnCore.init();
hnCore.bind('op_user', hnUser);
// hnCore.bind('op_hntrans', hnTrans);
// hnCore.bind('op_hnping', hnPing);
// hnCore.bind('op_home', hnHome);
// hnCore.bind('op_home', hnSettings);
// hnCore.bind('op_billing', hnBilling);
// hnCore.bind('op_affiliate', hnAffiliate);
// hnCore.bind('op_dbservice',hnDbservice);
// hnCore.bind('op_hndns',hnDns);
// hnCore.bind('op_hnserver',hnServer);
// hnCore.bind('op_prophet',hnProphet);

hnUser.init(hnCore);
// hnTrans.init(hnCore);
// hnPing.init(hnCore);
// hnHome.init(hnCore);
// hnSettings.init(hnCore);
// hnBilling.init(hnCore);
// hnAffiliate.init(hnCore)
// hnDbservice.init(hnCore)
// hnDns.init(hnCore);
// hnServer.init(hnCore);
// hnProphet.init(hnCore);

app.languageSet('cn');