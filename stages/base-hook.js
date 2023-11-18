module.exports = {
  stage: 11,
  next: "event-emit",
  html() {
    return `
    <div class="puzzle">
      <p>让randomA函数永远为1<br/>但randomB函数永远为0</p>
    </div>
    <div class="passwd">
      <input type="submit" name="Submit" id="submit" value="确认密码" />
    </div>
    `;
  },
  js() {
    return `
    document.querySelector('input').addEventListener('click',function(evt){
        function randomA(){
            for(let index=0;index<10;index++){
                if(Math.random()!==1){
                    return false
                }
            }
            return true
        }
        function randomB(){
            for(let index=0;index<10;index++){
                if(Math.random()!==0){
                    return false
                }
            }
            return true
        }
        if(randomA()===true&&randomB()===true){
            alert('成功~');
        }else{
            evt.preventDefault();
            alert('你还没有成功哦~');
        }
        })
        `;
  },
  async check(req, rsp) {
    return rsp.redirect(this.next_page);
  },
};
