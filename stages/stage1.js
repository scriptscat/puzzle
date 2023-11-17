
module.exports = {
    stage: 1,
    next: 'password',
    html() {
        return `
    <div class="puzzle">
        <a href='password.html'>点击进入下一关</a>
    </div>
    `},
}