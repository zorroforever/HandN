class hn_core {
    uid = null
    email = null
    email_notification = null
    tg_notification = null
    tg_bind = null;
    user_position = 0
    user_point = 0
    user_rpoint = 0
    user_charge = 0
    token = null
    ready = false
    api_chart = 'https://hn.link/api/chart'
    api_hntrans = 'https://hn.link/openapi/v1/hntrans'
    api_dbs = 'https://hn.link/openapi/v1/dbs'
    api_hndns = 'https://hn.link/openapi/v1/hndns'
    api_hnping = 'https://hn.link/openapi/v1/hnping'
    // api_user = 'https://127.0.0.1:5555/openapi/v1/user'
    api_user = 'http://127.0.0.1:4523/m1/2369771-0-default/openapi/v1/user'
    api_hnserver = 'https://hn.link/openapi/v1/hnserver'
    // api_token = 'https://hn.link/openapi/v1/token'
    api_token = 'http://127.0.0.1:4523/m1/2369771-0-default/openapi/v1/token'
    api_prophet = 'https://hn.link/openapi/v1/prophet'
    clipboard = null

    op_user = null

    init() {

        if (getQueryVariable('rel') !== false) {
            localStorage.setItem('rel', getQueryVariable('rel'));
        }
        this.initGetToken(() => {
            this.userInit();
        });

        //绑定粘贴
        // this.bindCopyBtn();
        //issue -> https://github.com/zenorocha/clipboard.js/issues/155#issuecomment-217372642
        // $.fn.modal.Constructor.prototype._enforceFocus = function () { };
    }

    refreshUserInfo() {
        $.post(this.api_user, { token: this.token, action: 'get_user' }, (rsp) => {
            if (rsp.status) {
                this.uid = rsp.data.uid;
                this.email = rsp.data.email;
                this.email_notification = rsp.data.subscribe;
                this.tg_notification = rsp.data.tg_notification;
                this.tg_bind = rsp.data.tg_binded;
                this.user_position = rsp.data.position;
                this.user_point = rsp.data.point;
                this.user_rpoint = rsp.data.rpoint;
                this.user_coin = rsp.data.coin;
                this.user_charge = rsp.data.charge;

                //更新界面
                $('.user_rpoint').html(hnCore.user_rpoint);
                $('.user_point').html(hnCore.user_point);
                $('.user_coins').html(hnCore.user_coin);
                $('.user_charge').html(hnCore.user_charge);
            }
        }, 'json');

    }

    bindCopyBtn() {
        $.fn.modal.Constructor.prototype._enforceFocus = function () { };
        this.clipboard = new ClipboardJS('.btncp');
        this.clipboard.on('success', (e) => {
            let tmp = $(e.trigger).html();
            $(e.trigger).html('<i class="fas fa-check-circle fa-fw text-success"></i>');
            setTimeout(() => {
                $(e.trigger).html(tmp);
            }, 3000);
        });
    }

    bind(op, ops) {
        this[op] = ops;
    }

    userInit(cb) {
        $.post(this.api_user, { token: this.token, action: 'get_user' }, (rsp) => {
            if (rsp.status) {
                this.uid = rsp.data.uid;
                this.email = rsp.data.email;
                this.email_notification = rsp.data.subscribe;
                this.tg_notification = rsp.data.tg_notification;
                this.tg_bind = rsp.data.tg_binded;
                this.user_position = rsp.data.position;
                this.user_point = rsp.data.point;
                this.user_rpoint = rsp.data.rpoint;
                this.user_coin = rsp.data.coin;
                this.user_charge = rsp.data.charge;
            }
            this.ready = true;
            if (typeof (cb) === 'function') {
                app.log("@@@start to do function after");
                cb();
            }
        }, 'json');
    }

    initExec(cb) {
        if (this.ready === false) {
            setTimeout(() => {
                console.log('Not ready,wating');
                this.initExec(cb);
            }, 1000);
        } else {
            cb();
        }
    }

    initGetToken(cb) {
        let token = localStorage.getItem('app_token');
        if (token !== null && token.length === 32) {
            this.token = token;
            if (typeof (cb) === 'function') {
                cb();
            }
        } else {
            $.post(this.api_token, (rsp) => {
                if (rsp.length === 32) {
                    this.token = rsp;
                    localStorage.setItem('app_token', rsp);
                    if (typeof (cb) === 'function') {
                        cb();
                    }
                }else{
                    setTimeout(()=>{
                        this.initGetToken(cb);
                    },3000);
                }
            });
        }
    }
}