module.exports = {
	stage: 9,
	next: 'md5-1-100',
	passwd:"9",
	html() {
		return `
    <div class="puzzle">
        <p>密码是:45c48cce2e2d7fbdea1afc51c7c6ad26</p>
    </div>
    <div class="passwd">
        <input type="text" name="passwd" id="passwd"/>
        <input type="submit" name="Submit" value="确认密码">
    </div>
    `}
}