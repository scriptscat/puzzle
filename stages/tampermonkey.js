module.exports = {
	stage: 7,
	next: 'md5',
	passwd:"lhdnb!",
	html() {
		return `
    <div class="puzzle">
        <p>休息够了?来输入这个密码:lhdnb!</p>
    </div>
    <div class="passwd">
		<p>没有输入框?可能程序员偷懒了吧</p>
    </div>
    `}
}