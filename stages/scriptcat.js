module.exports = {
    stage: 5,
    next: 'ggnb',
    passwd: 'nb',
    html() {
        return `
    <div class="puzzle">
        <p>来个单选题,gg??</p>
    </div>
    <div class="passwd">
	A.<input type="radio" name="passwd" value="cj"/>
	B.<input type="radio" name="passwd" value="bx"/>
	C.<input type="radio" name="passwd" value="nb"/>
	D.<input type="radio" name="passwd" value="tql"/>
		<br/>
        <input type="submit" name="Submit" value="确认">
    </div>
    `},
}