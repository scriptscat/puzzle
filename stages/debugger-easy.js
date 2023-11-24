module.exports = {
    stage: 25,
    next: 'rank',
    html() {
        let ret = `
			<div class="puzzle">
			  <p>这关很简单，用脚本点击下一关就行了哦</p>
              <p>奇怪，怎么打不开控制台？</p>
		    </div>`;
        return ret;
    },
    js() {
        function Debuggers() {
            oldAddEv.call(document, 'contextmenu', (e) => e.preventDefault());
            oldAddEv.call(document, 'keydown', (e) => e.preventDefault());
            setInterval(() => {
                new Function('', Math.random() + ';debugger')();
            });
            setInterval(() => {
                Function.prototype.constructor('', ';debugger;')();
            });
            let input;
            let label = '';
            let mark = 0;
            console.log(
                Object.defineProperties(new Error(), {
                    toString: {
                        value() {
                            new Error().stack.includes('toString@') && !(mark = void 0) && input?.remove();
                        },
                    },
                    message: {
                        get() {
                            mark = void 0;
                            input?.remove();
                        },
                    },
                }),
            );
            setInterval(() => {
                if (mark++ == 100) {
                    label += String.fromCharCode(Math.random() * 26 + 97).repeat(3);
                    input = document.createElement(label);
                    input.textContent = '下 一 关';
                    oldAddEv.call(input, 'click', (e) => {
                        const form = document.querySelector('form');
                        oldAddEv.call(form, 'formdata', (event) => {
                            event.formData.append('passwd', btoa(Object.values(e)).slice(0, 3) + label);
                        });
                        form.requestSubmit();
                    });
                    document.querySelector('div').append(input);
                }
            });
        }

        return '(' + Debuggers.toString() + ')()';
    },
    async check(req, rsp) {
        if (req.body.passwd.length == 6) {
            if (req.body.passwd.startsWith('ZmF')) {
                // isTrusted == false
                return rsp.redirect(this.next_page);
            } else if (req.body.passwd.startsWith('dHJ')) {
                // isTrusted == true
                return rsp.send('用脚本点击啦');
            }
        }
        return rsp.send('为什么要偷鸡！');
    },
};
