
module.exports = {
    stage: 2,
    next: 'hello',
    passwd: 'password',
    html() {
        return `
    <div class="puzzle">
        <p>填写上password就让你过</p>
    </div>
    <div class="passwd">
        <input type="text" name="passwd" id="passwd"/>
        <input type="submit" name="Submit" id="submit" value="确认密码">
    </div>
    `},
    js() {
        return `
        console.log('才不告诉你密码是password')
        document.querySelector('#passwd').addEventListener('keypress',(ev)=>{
            return false;
        });
        `
    },
}