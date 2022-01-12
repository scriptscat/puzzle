module.exports = {
	stage: 8,
	next: 'yhbbs',
	passwd:"c9f0f895fb98ab9159f51fd0297e236d",
	html() {
		return `
    <div class="puzzle">
        <p>密码是:c9f0f895fb98ab9159f51fd0297e236d</p>
    </div>
    <div class="passwd">
        <input type="text" name="passwd" id="passwd"/>
        <input type="submit" name="Submit" value="确认密码">
    </div>
    `}
}