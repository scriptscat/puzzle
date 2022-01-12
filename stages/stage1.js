
module.exports = {
    stage: 1,
    next: 'stage2',
    html() {
        return `
    <div class="puzzle">
        <a href='stage2.html'>点击进入下一关</a>
    </div>
    `},
}