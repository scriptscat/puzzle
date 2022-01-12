
module.exports = {
    stage: 3,
    next: 'world',
    passwd: 'password',
    html() {
        return `
    <div class="puzzle">
        <p>再输入一次密码试试?</p>
    </div>
    <div class="passwd">
        <input type="text" name="passwd" id="passwd"/>
        <input type="submit" name="Submit" value="确认密码">
    </div>
    `},
    js() {
        return `
        document.querySelector('#passwd').addEventListener('keypress',()=>{
            return false;
        });
        `
    },
}