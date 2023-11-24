module.exports = {
	stage: 7,
	next: 'hidden',
	passwd:"lhdnb!",
	html() {
		return `
    <div class="puzzle">
        <p>休息够了?来输入这个密码:lhdnb!</p>
    </div>
    <div class="passwd">
		<p>没有输入框?可能程序员偷懒了吧</p>
		<p>对比前面的关卡少了什么呢？</p>
    </div>
    `}
}