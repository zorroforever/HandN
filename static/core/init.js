var hnCore = new hn_core;
var hnUser = new hn_user;

//init
hnCore.init();
hnCore.bind('op_user', hnUser);
hnUser.init(hnCore);
app.languageSet('cn');